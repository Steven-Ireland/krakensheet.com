const cheerio = require('cheerio');
const request = require('request-promise');
const parseUtils = require('../util/sharedparsing');

const raceLinks = [
  'https://www.d20pfsrd.com/races/core-races/',
  'https://www.d20pfsrd.com/races/other-races/featured-races/',
  'https://www.d20pfsrd.com/races/other-races/uncommon-races/'
];

const feedCrawlerRaces = ($, crawler) => {
  $('ul.ogn-childpages li a').each(async (_, el) => {
    console.log('Adding ' + el.attribs.href + ' to the queue.');
    crawler.queue(el.attribs.href);
  });
};

const scrape = async crawler => {
  for (raceLink of raceLinks) {
    const thisRace = await request(raceLink);
    feedCrawlerRaces(cheerio.load(thisRace), crawler);
  }
};

const formattedRaceFeatures = (raceFeatures) =>
  raceFeatures
  .map(raceFeature => {
    return (
      '<h3>' +
      raceFeature.feature +
      '</h3>' +
      '<p>' +
      raceFeature.text +
      '</p>'
    );
  })
  .join('');

const sanitizeUrlName = name => {
  name = name
    .replace(/arg\-/g, '')
    .replace(/\-/g, ' ');
  
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

const parseRace = (url, $) => {
  const urlPieces = url.split('/');

  const name = sanitizeUrlName(urlPieces[urlPieces.length - 2]);
  
  const category = urlPieces[urlPieces.length - 3];

  const raceFeatures = [];
  $('#Standard_Racial_Traits')
    .parent()
    .nextUntil('h3:has("#Alternate_Racial_Traits")', 'ul')
    .each((_, ul) => {
      $(ul)
        .find('li')
        .each((_, li) => {
          const label = $(li).children('b').text();
          const content = $(li).text().substring(label.length);
          raceFeatures.push({feature: parseUtils.sanitizeValue(label), text: parseUtils.sanitizeValue(content)});
        });
  });
  
  const copyright = parseUtils.parseCopyright($);

  return {
    copyright,
    name,
    category,
    features: formattedRaceFeatures(raceFeatures),
  }
};

module.exports = {
  parseRace,
  scrape
};
