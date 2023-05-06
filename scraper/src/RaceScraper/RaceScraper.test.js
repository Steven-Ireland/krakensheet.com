const axios = require('axios');
const cheerio = require('cheerio');
const RaceScraper = require('./RaceScraper');

test('Dwarf parsing', async () => {
  const testUrl = 'https://www.d20pfsrd.com/races/core-races/dwarf/';
  const racePage = await axios.get(testUrl);

  const raceDef = RaceScraper.parseRace(
    testUrl,
    cheerio.load(racePage.data)
  );

  expect(raceDef.name).toBe('Dwarf');
  expect(raceDef.category).toBe('core-races');
});

test('Ratfolk parsing', async () => {
  const testUrl = 'https://www.d20pfsrd.com/races/other-races/featured-races/arg-ratfolk/';
  const racePage = await axios.get(testUrl);

  const raceDef = RaceScraper.parseRace(
    testUrl,
    cheerio.load(racePage.data)
  );

  expect(raceDef.name).toBe('Ratfolk');
  expect(raceDef.category).toBe('featured-races');
});

test('Half Orc parsing', async () => {
  const testUrl = 'https://www.d20pfsrd.com/races/core-races/half-orc/';
  const racePage = await axios.get(testUrl);

  const raceDef = RaceScraper.parseRace(
    testUrl,
    cheerio.load(racePage.data)
  );

  expect(raceDef.name).toBe('Half orc');
  expect(raceDef.category).toBe('core-races');
});

test('Tengu parsing', async () => {
  const testUrl = 'https://www.d20pfsrd.com/races/other-races/featured-races/arg-tengu/';
  const racePage = await axios.get(testUrl);

  const raceDef = RaceScraper.parseRace(
    testUrl,
    cheerio.load(racePage.data)
  );

  expect(raceDef.name).toBe('Tengu');
  expect(raceDef.category).toBe('featured-races');
  expect(raceDef.features).toMatch('<h3>Ability Score Racial Traits</h3>')
  expect(raceDef.features).toMatch('Tengus are fast and observant, but relatively fragile and delicate. They gain +2 Dexterity, +2 Wisdom, –2 Constitution.')
});
