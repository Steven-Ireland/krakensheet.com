const axios = require('axios');
const cheerio = require('cheerio');
const TraitScraper = require('./TraitScraper');

test('Addict', async () => {
  const testUrl =
    'https://www.d20pfsrd.com/traits/regional-traits/addict-regional/';
  const traitPage = await axios.get(testUrl);

  const traitDef = TraitScraper.parseTrait(
    testUrl,
    cheerio.load(traitPage.data)
  );

  expect(traitDef.name).toBe('Addict');
  expect(traitDef.href).toBe(testUrl);
  expect(traitDef.category).toBe('regional-traits');
  expect(traitDef.flavor).toBe(
    'You spent several years addicted to a drug that you may or may not have kicked.'
  );

  expect(traitDef.benefit).toMatch(
    'You start with only half of the normal starting cash, but your knowledge of ' +
      'the addicts lifestyle grants you a +1 trait bonus on Bluff, Knowledge (local), ' +
      'and Sense Motive checks.'
  );

  expect(traitDef.benefit).toMatch(
    'One of these skills (your choice) is always a class skill for you.'
  );

  expect(traitDef.copyright).toMatch(
    'Pathfinder Player Companion: Inner Sea Primer '
  );
  expect(traitDef.copyright).toMatch(
    'Pathfinder Player Companion: Inner Sea Primer. Copyright 2010, ' +
      'Paizo Publishing, LLC; Author: Colin McComb.'
  );
});
