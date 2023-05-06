const cheerio = require('cheerio');
const request = require('request-promise');
const parseUtils = require('../util/sharedparsing');

const traitLinks = [
  'https://www.d20pfsrd.com/traits/combat-traits',
  'https://www.d20pfsrd.com/traits/equipment-traits',
  'https://www.d20pfsrd.com/traits/faith-traits',
  'https://www.d20pfsrd.com/traits/family-traits',
  'https://www.d20pfsrd.com/traits/magic-traits',
  'https://www.d20pfsrd.com/traits/mount-traits',
  'https://www.d20pfsrd.com/traits/race-traits',
  'https://www.d20pfsrd.com/traits/regional-traits',
  'https://www.d20pfsrd.com/traits/religion-traits',
  'https://www.d20pfsrd.com/traits/social-traits',
  'https://www.d20pfsrd.com/traits/campaign-traits/skull-shackles/'
];

const feedCrawlerTraits = ($, crawler) => {
  $('ul.ogn-childpages li a').each(async (index, el) => {
    console.log('Adding ' + el.attribs.href + ' to the queue.');
    crawler.queue(el.attribs.href);
  });
};

const scrape = async crawler => {
  for (traitLink of traitLinks) {
    const traits = await request(traitLink);
    feedCrawlerTraits(cheerio.load(traits), crawler);
  }
};

const parseTrait = (url, $) => {
  const urlPieces = url.split('/');

  const subCategories = $('div.article-content p:has(> b)')
    .get()
    .reduce((old, curr) => {
      const unsanitizedCategory = $('b', curr).text();
      const category = parseUtils.sanitizeKey(unsanitizedCategory);
      const content = parseUtils.sanitizeValue(
        $(curr)
          .nextUntil('p:has(> b)', 'p')
          .addBack()
          .map(function() {
            return $(this).text();
          })
          .get()
          .join('\n')
          .substring(unsanitizedCategory.length)
      );
      old[category] = content;
      return old;
    }, {});

  const copyright = parseUtils.parseCopyright($);

  const traitDef = {
    name: $('article h1').text(),
    href: url,
    category: urlPieces[urlPieces.length - 3],
    flavor: $('div.article-content p.description').text(),
    copyright,
    ...subCategories
  };

  //console.log(traitDef);

  return traitDef;
};

module.exports = {
  parseTrait,
  scrape
};
