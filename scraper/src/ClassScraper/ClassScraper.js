const cheerio = require('cheerio');
const request = require('request-promise');
const parseUtils = require('../util/sharedparsing');

const classLinks = [
  'https://www.d20pfsrd.com/classes/core-classes/',
  'https://www.d20pfsrd.com/classes/base-classes/',
  'https://www.d20pfsrd.com/classes/hybrid-classes/',
  'https://www.d20pfsrd.com/classes/unchained-classes/',
];

const additionalClasses = [
  'https://www.d20pfsrd.com/classes/alternate-classes/antipaladin/',
  'https://www.d20pfsrd.com/classes/alternate-classes/ninja/',
  'https://www.d20pfsrd.com/classes/alternate-classes/samurai/',
]

const sanitizeKey = text => {
  const lowerCaseUnderscored = text.replace(/[\s]+/g, '_').toLowerCase();
  let alphanumericOnly = lowerCaseUnderscored.replace(/[\W]+/g, '');

  if (alphanumericOnly === 'bab') {
    alphanumericOnly = 'base_attack_bonus';
  }

  return alphanumericOnly;
};

const sanitizeValue = text => {
  const startsAtLetter = text.replace(/st$|th$|nd$|rd$|\+/g, '');

  return startsAtLetter;
};

const sanitizeSubskill = text => {
  const noTrailingParen = text.replace(/\($/, '');
  const lowerCaseNoSpace = noTrailingParen.replace(/[\s_]+/g, '').toLowerCase();

  return lowerCaseNoSpace;
};

const feedCrawlerClasses = ($, crawler) => {
  $('ul.ogn-childpages > li > a').each(async (index, el) => {
    console.log('Adding ' + el.attribs.href + ' to the queue.');
    crawler.queue(el.attribs.href);
  });
};

const scrape = async crawler => {
  for (classLink of classLinks) {
    const thisClass = await request(classLink);
    feedCrawlerClasses(cheerio.load(thisClass), crawler);
  }
  
  for (let additionalClassLink of additionalClasses) {
    console.log('Adding ' + additionalClassLink + ' to the queue.');
    crawler.queue(additionalClassLink);
  }
};

const parseClass = (url, $) => {
  const urlPieces = url.split('/');

  const className = $('article>h1').text();
  const flavor = $('article .article-content p')
    .first()
    .text();

  let hitDie = parseUtils.sanitizeAlphaNumericOnly(
    $('b:contains("Hit Di")')[0].nextSibling.nodeValue
  );

  // Class progression
  const classProgression = $('article .article-content table[border]').first();
  const headerMap = {};
  let hasSpells = false;

  const rows = $(classProgression)
    .find('tr');

  // first row is always headers
  // second row could be headers if it's a spellcasting class

  let currentHeaderIndex = 0;
  $(rows.eq(0))
    .find('th,td')
    .each((_, el) => {
      const headerValue = sanitizeKey($(el).text());
      if (headerValue !== 'spells_per_day' && headerValue !== 'extracts_per_day') {
        headerMap[currentHeaderIndex] = headerValue;
        currentHeaderIndex++;
      } else {
        hasSpells = true;
      }
    });
  
  let spellHeaders = [];
  if (hasSpells) {
    spellHeaders = $(rows.eq(1))
      .find('th,td')
      .map((_, el) => {
        return $(el).text();
      }).get();
  }

  const startingIndex = hasSpells ? 2 : 1;

  const levelRows = rows.splice(startingIndex);
  const levels = {};
  // JS Map, not a jquery map
  levelRows.map((levelRow) => {
    const levelValues = $(levelRow).find('td');
    levelHolder = {};
    levelValues.each((i, levelValue) => {
      const header = headerMap[i];
      if (header) {
        levelHolder[header] = sanitizeValue($(levelValue).text());
      }
    });
    const { level, ...rest } = levelHolder;

    // Spell Parsing
    // Find all td's that are after our spell header index
    if (hasSpells) {
      const spellsPerLevel = {};
      const levelValues = $(levelRow).find('td').eq(currentHeaderIndex).nextAll().addBack();
      // spell fields only
      levelValues.each((i, el) => {
        const spellHeader = spellHeaders[i];
        const spellValues = parseUtils.sanitizeSpellsPerDayValue($(el).text());
        spellsPerLevel[spellHeader] = spellValues.trim() || '0'; // use 0 as default where class page has --
      });

      rest.spells_per_day = spellsPerLevel;
    }

    levels[parseInt(level)] = rest;
  });



  // classFeatures
  const classFeaturesStart = $('article h3:nth-child(1),h3:has(#Class_Features)').first(); // the second h3 is class features most of the time, with exceptions of the antipaladin :|
  const classFeatures = [];
  let currentFeature = $(classFeaturesStart)
    .next()
    .next();
  do {
    const currentFeatureName = $(currentFeature).text();
    const featureDescriptions = $(currentFeature).nextUntil(
      'h1,h2,h3,h4',
      'p,ul,div:not(.content-sidebar,.faq,.table-right,.flexbox,.info-sidebar,.ogn-childpages,.ed-note-outer,.section15)'
    );

    if ($(featureDescriptions).length === 0 || currentFeatureName === 'Subpages') {
      continue;
    }

    const featureText = featureDescriptions
      .map((_, feature) => {
        if ($(feature).is('div:has(>p)') || $(feature).is('ul:has(>li)')) {
          return $(feature).find('p,li').map((_, block) => {
            const sectionTitle = $(block).find('>i,>em,>b');
            if ($(sectionTitle).length === 0) {
              return `<p>${$(block).text()}</p>`;
            } else {
              const sectionDescription = $(block).text();
              const sectionTitleLength = $(sectionTitle).text().length;
              const sectionDescriptionAfterTitle = sectionDescription.substring(sectionTitleLength);
              return `<p><em>${sectionTitle.text()}</em>${sectionDescriptionAfterTitle}</p>`;
            }
          })
          .get()
          .join('');
        }

        // default if it's a <p> already
        return `<p>${$(feature).text()}</p>`;
      })
      .get()
      .join('');



    classFeatures.push({
      feature: currentFeatureName,
      html: featureText
    });
  } while (
    $(
      (currentFeature = $(currentFeature)
        .nextAll('h4')
        .first())
    ).text().length > 0
  );

  // format classFeatures into <h3>title</h3><p>desc</p>

  const formattedClassFeatures = classFeatures
    .map(classFeature => {
      return (
        '<h3>' +
        classFeature.feature +
        '</h3>' +
        classFeature.html
      );
    })
    .join('');

  // Class skills

  const multiSkills = ['Knowledge', 'Profession', 'Craft'];

  const classSkillsStart = $('article h3')
    .eq(0)
    .next(); // the first h3 is class skills
  const classSkills = $(classSkillsStart)
    .find('a[href*="/skills/"]')
    .map((_, el) => {
      const skill = $(el).text();

      if (multiSkills.includes(skill)) {
        const subSkill = sanitizeSubskill(el.nextSibling.nodeValue);

        if (subSkill && subSkill !== '(any)') {
          return skill + ' ' + subSkill;
        } else {
          return skill + ' (all)';
        }
      } else {
        return skill;
      }
    })
    .get();

  // Skill points / level
  const skillNode = $('a[name="TOC-Skill-Ranks-per-Level"], b:contains("Skill Ranks")').parent();
  const skillPointsPerLevel = parseInt(skillNode.text().replace(/[^\d]/g, ''));

  // Copyright Notice
  const copyright = parseUtils.parseCopyright($);

  const classDef = {
    name: className,
    href: url,
    hitDie,
    category: urlPieces[urlPieces.length - 3],
    flavor: flavor,
    skills: classSkills,
    skillPointsPerLevel,
    features: formattedClassFeatures,
    progression: levels,
    copyright
  };

  return classDef;
};

module.exports = {
  parseClass,
  scrape
};
