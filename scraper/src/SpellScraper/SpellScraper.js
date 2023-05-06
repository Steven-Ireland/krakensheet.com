const cheerio = require('cheerio');
const request = require('request-promise');
const parseUtils = require('../util/sharedparsing');

const allSpellsLink = 'https://www.d20pfsrd.com/magic/all-spells/';

const feedCrawlerSpells = ($, crawler) => {
  $('ul.ogn-childpages li a').each(async (_, el) => {
    console.log('Adding ' + el.attribs.href + ' to the queue.');
    crawler.queue(el.attribs.href);
  });
};

const scrape = async crawler => {
  const allSpellsPage = await request(allSpellsLink);
  feedCrawlerSpells(cheerio.load(allSpellsPage), crawler);
};

const parseSchool = (topLevelString) => {
  const schoolBeginning = "School";
  const schoolStart = topLevelString.indexOf(schoolBeginning);
  const schoolEnd = topLevelString.indexOf(";");
  let schoolSection = topLevelString.substring(schoolStart + schoolBeginning.length, schoolEnd);
  schoolSection = parseUtils.sanitizeUnchained(schoolSection);
  schoolSection = parseUtils.sanitizeAlphaNumericDashOnly(schoolSection, ' ');
  schoolSection = parseUtils.sanitizeExtraSpaces(schoolSection);

  const [school, ...tags] = schoolSection.split(' ');

  return {
    school,
    tags
  }
}

const COMMA_NOT_IN_PARENS = /,(?![^(]*\))/;

const parseCommaSeparatedSection = (topLevelString, sectionStart) => {
  if (topLevelString.indexOf(sectionStart) < 0) {
    return {};
  }

  let sectionString = topLevelString.substring(topLevelString.indexOf(sectionStart) + sectionStart.length);
  const semiLocation = sectionString.indexOf(';');
  if (semiLocation > -1) {
    sectionString = sectionString.substring(0, semiLocation);
  }

  sectionString = sectionString.replace(/unchained /g, '');

  const sectionMap = {};
  sectionString.split(COMMA_NOT_IN_PARENS).forEach(requirementString => {
    const splitRequirements = requirementString.trim().split(' ');
    const subsection = splitRequirements[0];
    const level = splitRequirements[splitRequirements.length - 1];
    if (subsection.indexOf('/') > -1) {
      subsection.split('/').forEach(actualSubsection => {
        sectionMap[actualSubsection] = level;
      });
    } else {
      sectionMap[subsection] = level;
    }
  });

  return sectionMap;
}

const parseOtherSections = ($, container) => {
  // Other sections i.e casting time, etc
  let otherSections = {};
  let currentSectionTitle = "";
  let currentSectionText = "";
  $(container).find('p:not(.divider,.toc_title,:contains("School"),.title)').first().nextUntil('p:contains("DESCRIPTION")').addBack().each((_, section) => {
    $(section).contents().each((_, el) => {
      if ($(el).is('b')) {
        if (currentSectionText && currentSectionTitle.trim()) {
          const sectionKey = parseUtils.sanitizeKeyUnderscores(currentSectionTitle.trim());
          const sectionValue = parseUtils.sanitizeValue(currentSectionText.trim());
          otherSections[sectionKey] = sectionValue;
        }

        currentSectionTitle = $(el).text();
        currentSectionText = "";
      } else if ($(el).is('br')) {
        if (currentSectionText && currentSectionTitle) {
          const sectionKey = parseUtils.sanitizeKeyUnderscores(currentSectionTitle.trim());
          const sectionValue = parseUtils.sanitizeValue(currentSectionText.trim());
          otherSections[sectionKey] = sectionValue;
        }

        currentSectionTitle = "";
        currentSectionText = "";
      } else {
        currentSectionText += $(el).text();
      }
    });

    if (currentSectionText && currentSectionTitle) {
      const sectionKey = parseUtils.sanitizeKeyUnderscores(currentSectionTitle.trim());
      const sectionValue = parseUtils.sanitizeValue(currentSectionText.trim());
      otherSections[sectionKey] = sectionValue;
    }

    currentSectionText = "";
    currentSectionTitle = "";
  });

  // there's literally a typo in `description` on some pages. Love it.
  let description = container.find('p:contains("DESCRIPTION")').first()
    .nextUntil('p[class]:not(.description,.desciption),h1,h2,h3,h4', 'p:not(:contains("School"), :has(a[name="mass"]), :has(b))').text();
  
  // Sometimes there isn't a description divider, in which case we should take all text after school
  if (description.trim() === "") {
    description = container.find('p:contains("School")').first()
      .nextUntil('p[class]:not(.description,.desciption),h1,h2,h3,h4', 'p:not(:contains("School"), :has(a[name="mass"]), :has(b))').text();
  }

  // Last section is description
  otherSections.description = description.trim();

  return otherSections;
}

const setNonEmpty = (obj, key, val) => {
  if (Object.keys(val).length > 0) {
    obj[key] = val;
  }
}

const parseSpell = (url, $) => {
  let name = parseUtils.sanitizeSpellTitle($('article h1').text());
  const leveledName = parseUtils.sanitizeSpellTitle($('article .article-content>p.title, article .article-content>h4').first().text());
  if (leveledName.length > 0 && leveledName.indexOf(',') < 0 && leveledName.indexOf(name) > -1 && leveledName.indexOf("Mythic") < 0) {
    name = leveledName;
  }

  const infoContainer = $('article .article-content');
  const topLevelString = $(infoContainer).find('p:contains("School")').first().text();

  const school = parseSchool(topLevelString);
  const casterLevels = parseCommaSeparatedSection(topLevelString, "Level");
  const elementalSchools = parseCommaSeparatedSection(topLevelString, "Elemental School");
  const domains = parseCommaSeparatedSection(topLevelString, "Domain");
  const subDomains = parseCommaSeparatedSection(topLevelString, "Subdomain");
  let {description, ...castingInfo} = parseOtherSections($, infoContainer);

  const copyright = parseUtils.parseCopyright($);
  const firstSpellOnPage = {
    copyright,
    href: url,
    name,
    casterLevels,
    elementalSchools,
    domains,
    subDomains,
    description,
    castingInfo,
    ...school,
  };

  const spellsToReturn = [firstSpellOnPage];

  // Some spells have levels I-IX, we need to find them and grab the title, level req, & desc
  const leveledTitleSelector = 'h4,p.title';
  const leveledTitleStartingPoint = 'p:contains("DESCRIPTION")';
  let leveledTitle = $(leveledTitleStartingPoint);
  while ((leveledTitle = leveledTitle.nextAll(leveledTitleSelector).first()).text().length > 0) {
    const leveledTopLevelString = leveledTitle.next().text();
    const leveledCasterLevels = parseCommaSeparatedSection(leveledTopLevelString, "Level");
    const leveledElementalSchools = parseCommaSeparatedSection(leveledTopLevelString, "Elemental School");
    const leveledDomains = parseCommaSeparatedSection(leveledTopLevelString, "Domain");
    const leveledSubDomains = parseCommaSeparatedSection(leveledTopLevelString, "Subdomain");
    const leveledDescription = leveledTitle.nextUntil(leveledTitleSelector, 'p:not([class], :contains("School"))').text();
    let leveledTitleText = leveledTitle.text().trim();

    // Mythic spells are dumb
    if (leveledTitleText === "Mythic") {
      leveledTitleText = firstSpellOnPage.name + ', ' + leveledTitleText;
    }
    leveledTitleText = parseUtils.sanitizeSpellTitle(leveledTitleText);

    const thisLeveledSpell = {
      ...firstSpellOnPage,
      name: leveledTitleText,
      description: firstSpellOnPage.description + ' ' + leveledDescription
    };

    // Conditionally set defaults in case of mythic shenanigans
    setNonEmpty(thisLeveledSpell, "casterLevels", leveledCasterLevels);
    setNonEmpty(thisLeveledSpell, "elementalSchools", leveledElementalSchools);
    setNonEmpty(thisLeveledSpell, "domains", leveledDomains);
    setNonEmpty(thisLeveledSpell, "subDomains", leveledSubDomains);

    spellsToReturn.push(thisLeveledSpell);
  }

  // Other spells have a lesser, greater, or mythic version that we should also parse.
  const alternateVersionSelector = 'div:not(.section15):has(h4,p:contains("DESCRIPTION"))';
  $(leveledTitleStartingPoint).first().nextAll(alternateVersionSelector).each((_, alternateVersion) => {
    const alternateTitle = $(alternateVersion).find('h4');
    const alternateTopLevelString = alternateTitle.next().text();
    const school = parseSchool(topLevelString);
    const alternateCasterLevels = parseCommaSeparatedSection(alternateTopLevelString, "Level");
    const alternateElementalSchools = parseCommaSeparatedSection(alternateTopLevelString, "Elemental School");
    const alternateDomains = parseCommaSeparatedSection(alternateTopLevelString, "Domain");
    const alternateSubDomains = parseCommaSeparatedSection(alternateTopLevelString, "Subdomain");

    const {description, ...alternateCastingInfo} = parseOtherSections($, $(alternateVersion));

    // Handle mythic naming
    let alternateTitleText = alternateTitle.text().trim();
    if (alternateTitleText === 'Mythic') {
      alternateTitleText = firstSpellOnPage.name + ', ' + alternateTitleText;
    } else if (alternateTitleText.length === 0) {
      // page is probably ridiculous, we will try the parent's previous element for the title
      alternateTitleText = $(alternateVersion).prev('p,h4').text().trim();
    }
    alternateTitleText = parseUtils.sanitizeSpellTitle(alternateTitleText);

    const thisAlternateSpell = {
      ...firstSpellOnPage,
      ...school,
      name: alternateTitleText,
      castingInfo: {...firstSpellOnPage.castingInfo, ...alternateCastingInfo},
      description,
    };

    // Conditionally set defaults in case of mythic shenanigans
    setNonEmpty(thisAlternateSpell, "casterLevels", alternateCasterLevels);
    setNonEmpty(thisAlternateSpell, "elementalSchools", alternateElementalSchools);
    setNonEmpty(thisAlternateSpell, "domains", alternateDomains);
    setNonEmpty(thisAlternateSpell, "subDomains", alternateSubDomains);

    spellsToReturn.push(thisAlternateSpell);
  });

  return spellsToReturn;
};

module.exports = {
  parseSpell,
  scrape
};
