const axios = require('axios');
const cheerio = require('cheerio');
const FeatScraper = require('./FeatScraper');

test('Power Attack', async () => {
  const testUrl =
    'https://www.d20pfsrd.com/feats/combat-feats/power-attack-combat/';
  const featPage = await axios.get(testUrl);

  const featDef = FeatScraper.parseFeat(testUrl, cheerio.load(featPage.data));

  expect(featDef.name).toBe('Power Attack (Combat)');
  expect(featDef.href).toBe(testUrl);
  expect(featDef.category).toBe('combat-feats');
  expect(featDef.flavor).toBe(
    'You can make exceptionally deadly melee attacks by sacrificing accuracy for strength.'
  );
  expect(featDef.prerequisite).toBe('Str 13, base attack bonus +1.');

  expect(featDef.benefit).toMatch(
    'You can choose to take a –1 penalty on all melee attack rolls and combat ' +
      'maneuver checks to gain a +2 bonus on all melee damage rolls. This bonus to ' +
      'damage is increased by half (+50%) if you are making an attack with a ' +
      'two-handed weapon, a one handed weapon using two hands, or a primary ' +
      'natural weapon that adds 1-1/2 times your Strength modifier on damage ' +
      'rolls. This bonus to damage is halved (–50%) if you are making an attack ' +
      'with an off-hand weapon or secondary natural weapon.'
  );

  expect(featDef.benefit).toMatch(
    'When your base attack bonus reaches +4, and every 4 points thereafter, ' +
      'the penalty increases by –1 and the bonus to damage increases by +2.'
  );

  expect(featDef.benefit).toMatch(
    'You must choose to use this feat before making an attack roll, and its ' +
      'effects last until your next turn. The bonus damage does not apply to ' +
      'touch attacks or effects that do not deal hit point damage.'
  );

  expect(featDef.copyright).toMatch(
    'Pathfinder RPG Core Rulebook. Copyright 2009, Paizo Publishing, ' +
      'LLC; Author: Jason Bulmahn, based on material by ' +
      'Jonathan Tweet, Monte Cook, and Skip Williams.'
  );
});
