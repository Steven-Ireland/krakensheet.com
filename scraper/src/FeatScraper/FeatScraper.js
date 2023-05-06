const cheerio = require('cheerio');
const request = require('request-promise');
const parseUtils = require('../util/sharedparsing');

const feedCrawlerFeats = ($, crawler) => {
  $('ul.ogn-childpages li a').each(async (index, el) => {
    console.log('Adding ' + el.attribs.href + ' to the queue.');
    crawler.queue(el.attribs.href);
  });
};

const scrape = async crawler => {
  const feats = await request('https://www.d20pfsrd.com/feats/');
  feedCrawlerFeats(cheerio.load(feats), crawler);
};

const parseFeat = (url, $) => {
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

  const featDef = {
    name: $('article h1').text(),
    href: url,
    category: urlPieces[urlPieces.length - 3],
    flavor: $('div.article-content p.description').text(),
    copyright,
    ...subCategories
  };

  return featDef;
};

module.exports = {
  parseFeat,
  scrape
};
