const axios = require('axios');
const cheerio = require('cheerio');
const ClassScraper = require('./ClassScraper');

test('Wizard progression', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/wizard/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(Object.keys(classDef.progression).length).toBe(20);
  expect(classDef.hitDie).toBe('d6');
  expect(classDef.skillPointsPerLevel).toBe(2);
});

test('Brawler progression', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/hybrid-classes/brawler/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(Object.keys(classDef.progression).length).toBe(20);
  expect(classDef.hitDie).toBe('d10');
  expect(classDef.skillPointsPerLevel).toBe(4);
});

test('Druid progression', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/druid/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(Object.keys(classDef.progression).length).toBe(20);
  expect(classDef.hitDie).toBe('d8');
});

test('Druid class skills', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/druid/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(Object.keys(classDef.skills).length).toBe(13);
  expect(classDef.skills.indexOf('Craft (all)')).toBeGreaterThan(-1);
  expect(classDef.skillPointsPerLevel).toBe(4);
});

test('Alchemist class skills', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/base-classes/alchemist/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(Object.keys(classDef.skills).length).toBe(13);
  expect(classDef.skills.indexOf('Craft (all)')).toBeGreaterThan(-1);
  expect(classDef.hitDie).toBe('d8');
});

test('Copyright Notice Ranger', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/ranger/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(classDef.copyright).toBeTruthy();
  expect(classDef.copyright).toMatch(
    'Pathfinder RPG Core Rulebook. © 2009, Paizo Publishing, ' +
      'LLC; Author: Jason Bulmahn, based on material by Jonathan Tweet, ' +
      'Monte Cook, and Skip Williams.'
  );
});

test('Copyright Notice Cavalier', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/base-classes/cavalier/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  expect(classDef.copyright).toBeTruthy();
  expect(classDef.copyright).toMatch(
    'Advanced Player’s Guide. © 2010, ' +
      'Paizo Publishing, LLC; Author: Jason Bulmahn.'
  );
});

test('Class Features Cleric', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/cleric/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  // exclude sidebar and faq
  expect(classDef.features).not.toMatch('Converting NPCs and Cohorts to Your Faith');
  expect(classDef.features).not.toMatch('If I have the channel energy ability from more than one class, do they stack?');

});

test('Class Features Bard', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/bard/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  // exclude sidebar and faq
  expect(classDef.features).not.toMatch('<h3>Table: Bard Spells Known</h3>');
  expect(classDef.features).not.toMatch('Section 15');
  expect(classDef.features).not.toMatch('If I have the channel energy ability from more than one class, do they stack?');
  expect(classDef.features).toMatch(
    '<em>Dirge of Doom (Su)</em>: A bard of 8th level or higher can use his performance to foster a'
    + ' sense of growing dread in his enemies, causing them to take become shaken. To be affected, '
  );
});

test('Class Features Unchained Barbarian', async () => {
  const testUrl = 'https://www.d20pfsrd.com/classes/unchained-classes/barbarian-unchained/';
  const classPage = await axios.get(testUrl);

  const classDef = ClassScraper.parseClass(
    testUrl,
    cheerio.load(classPage.data)
  );

  // exclude sidebar and faq
  expect(classDef.features).not.toMatch('Section 15');
  expect(classDef.features).toMatch(
    '<em>Terrifying Howl (Ex)</em>: The barbarian unleashes a terrifying howl as a standard action. ' 
    + 'All enemies that have been shaken by the barbarian'
  );
});

describe('Spell Progression', () => {
  test('Druid', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/druid/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1'].spells_per_day).toMatchObject({
      '0th': '3',
      '1st': '1',
    });
    expect(classDef.progression['20'].spells_per_day).toMatchObject({
      '0th': '4',
      '1st': '4',
      '2nd': '4',
      '3rd': '4',
      '4th': '4',
      '5th': '4',
      '6th': '4',
      '7th': '4',
      '8th': '4',
      '9th': '4',
    });
  });

  test('Sorcerer', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/sorcerer/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1'].spells_per_day).toMatchObject({
      '1st': '3',
    });
    expect(classDef.progression['20'].spells_per_day).toMatchObject({
      '1st': '6',
      '2nd': '6',
      '3rd': '6',
      '4th': '6',
      '5th': '6',
      '6th': '6',
      '7th': '6',
      '8th': '6',
      '9th': '6',
    });
  });
  
  test('Cleric', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/cleric/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1'].spells_per_day).toMatchObject({
      '0th': '3',
      '1st': '1',
      '2nd': '0',
    });
    expect(classDef.progression['20'].spells_per_day).toMatchObject({
      '0th': '4',
      '1st': '4',
      '2nd': '4',
      '3rd': '4',
      '4th': '4',
      '5th': '4',
      '6th': '4',
      '7th': '4',
      '8th': '4',
      '9th': '4',
    });
  });

  test('Paladin', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/core-classes/paladin/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1'].spells_per_day).toMatchObject({
      '1st': '0',
      '2nd': '0',
      '3rd': '0',
      '4th': '0',
    });
    expect(classDef.progression['20'].spells_per_day).toMatchObject({
      '1st': '4',
      '2nd': '4',
      '3rd': '3',
      '4th': '3',
    });
  })
});

describe('Unchained Classes', () => {
  test('Rogue', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/unchained-classes/rogue-unchained/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1']).toMatchObject({
      base_attack_bonus: '0',
      will_save: '0',
      fort_save: '0',
      ref_save: '2',
    });
  });
});

describe('Alternate Classes', () => {
  test('Antipaladin', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/alternate-classes/antipaladin/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.progression['1'].spells_per_day).toMatchObject({
      '1st': '0',
      '2nd': '0',
      '3rd': '0',
      '4th': '0',
    });
    expect(classDef.progression['20'].spells_per_day).toMatchObject({
      '1st': '4',
      '2nd': '4',
      '3rd': '3',
      '4th': '3',
    });

    expect(classDef.features).toMatch('<h3>Weapon and Armor Proficiency</h3>');
    expect(classDef.features).toMatch('<h3>Aura of Evil (Ex)</h3>');
  });

  test('Ninja', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/alternate-classes/ninja/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );

    expect(classDef.features).toMatch('<h3>Weapon and Armor Proficiency</h3>');
  });

  test('Samurai', async () => {
    const testUrl = 'https://www.d20pfsrd.com/classes/alternate-classes/samurai/';
    const classPage = await axios.get(testUrl);

    const classDef = ClassScraper.parseClass(
      testUrl,
      cheerio.load(classPage.data)
    );
    expect(classDef.features).toMatch('At 1st level, a samurai must pledge himself to a specific order');
  });
})
