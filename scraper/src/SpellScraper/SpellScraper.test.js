const axios = require('axios');
const cheerio = require('cheerio');
const SpellScraper = require('./SpellScraper');

describe('Caster Levels & Tags', () => {
  test('Fireball', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/f/fireball/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.name).toBe("Fireball");
    expect(spellDef.casterLevels).toMatchObject({
      bloodrager: '3',
      magus: '3',
      sorcerer: '3',
      wizard: '3',
    });
    expect(spellDef.school).toBe("evocation");
    expect(spellDef.tags.length).toBe(1);
    expect(spellDef.tags[0]).toBe('fire');
  });

  test('Fear', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/f/fear/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.name).toBe("Fear");
    expect(spellDef.casterLevels).toMatchObject({
      antipaladin: '4', 
      bard: '3', 
      bloodrager: '4', 
      inquisitor: '4', 
      shaman: '4', 
      sorcerer: '4', 
      wizard: '4', 
      witch: '4'
    });
    expect(spellDef.school).toBe("necromancy");
    expect(spellDef.tags.length).toBe(3);
    expect(spellDef.tags).toEqual(expect.arrayContaining(['emotion', 'fear', 'mind-affecting']));
  });

  test('Adhesive Spittle', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/adhesive-spittle/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.name).toBe("Adhesive Spittle");
    expect(spellDef.casterLevels).toMatchObject({
      alchemist: '1',
      psychic: '1',
      sorcerer: '1', 
      wizard: '1', 
      witch: '1'
    });
    expect(spellDef.school).toBe("conjuration");
    expect(spellDef.tags.length).toBe(1);
    expect(spellDef.tags).toEqual(expect.arrayContaining(['creation']));
  });
});

describe('Elemental Schools', () => {
  test('Lightning Bolt should be air/metal', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/l/lightning-bolt/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.elementalSchools).toMatchObject({
      air: '3',
      metal: '3',
    });
  });
});


describe('Domains & Subdomains', () => {
  test('Planar ally', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/p/planar-ally';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.subDomains).toMatchObject({
      agathion: '6',
      archon: '6',
      azata: '6',
      psychopomp: '6',
    });
  });

  test('Remove Fear', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/r/remove-fear';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.domains).toMatchObject({
      liberation: '1',
    });

    expect(spellDef.subDomains).toMatchObject({
      loyalty: '1',
    });
  });
});

describe('Descriptions and soft sections', () => {
  test('Alacrity', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/alacrity/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.name).toBe("Alacrity");
    expect(spellDef.description).toMatch("This spell’s energy quickens your steps, allowing fancy footwork.");
    expect(spellDef.description).toMatch("You gain a +10-foot enhancement bonus to your speed and a +1 dodge bonus to your AC");
  });

  test('Fireball', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/f/fireball/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.castingInfo.casting_time).toBe('1 standard action');
    expect(spellDef.castingInfo.component).toBe('V, S, M (a ball of bat guano and sulfur)');
    expect(spellDef.castingInfo.range).toBe('long (400 ft. + 40 ft./level)');
    expect(spellDef.castingInfo.area).toBe('20-ft.-radius spread');
    expect(spellDef.castingInfo.duration).toBe('instantaneous');
    expect(spellDef.castingInfo.saving_throw).toBe('Reflex half;');
    expect(spellDef.castingInfo.spell_resistance).toBe('yes');
    expect(spellDef.description).toMatch('A fireball spell generates a searing explosion of flame that detonates');
    expect(spellDef.description).toMatch('You point your finger and determine the range (distance and height)');
    expect(spellDef.description).toMatch('The fireball sets fire to combustibles and damages objects in the area.');
    expect(spellDef.href).toBe(testUrl);
  });

  test('Remove Fear', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/r/remove-fear';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.castingInfo.casting_time).toBe('1 standard action');
    expect(spellDef.castingInfo.component).toBe('V, S');
    expect(spellDef.castingInfo.range).toBe('close (25 ft. + 5 ft./2 levels)');
    expect(spellDef.castingInfo.target).toBe('one creature plus one additional creature per four levels, no two of which can be more than 30 ft. apart');
    expect(spellDef.castingInfo.duration).toBe('10 minutes; see text');
    expect(spellDef.castingInfo.saving_throw).toBe('Will negates (harmless);');
    expect(spellDef.castingInfo.spell_resistance).toBe('yes (harmless)');
    expect(spellDef.description).toMatch('You instill courage in the subject, granting it a +4 morale bonus against ');
    expect(spellDef.description).toMatch('Remove fear counters and dispels cause fear.');
  });
})

describe('Copyright', () => {
  test('Fireball', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/f/fireball/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.copyright).toBeFalsy();
  });

  test('Remove Fear', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/r/remove-fear';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.copyright).toBe('Pathfinder Roleplaying Game Core Rulebook. © 2009, Paizo Publishing, LLC; '
      + 'Author: Jason Bulmahn, based on material by Jonathan Tweet, Monte Cook, and Skip Williams.')
  });

  test('Aspect of the wolf', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/aspect-of-the-wolf/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    )[0];

    expect(spellDef.copyright).toBe('Advanced Player’s Guide. Copyright 2010, Paizo Publishing, LLC; Author: Jason Bulmahn.');
  })
});

describe('Multi-tier spells', () => {
  test('Summon Monster', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/s/Summon-Monster/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(9);
    expect(spellDef[0].casterLevels).toMatchObject({
      antipaladin: '1',
      bard: '1',
      cleric: '1',
      oracle: '1',
      medium: '1',
      psychic: '1',
      sorcerer: '1',
      wizard: '1',
      spiritualist: '1',
      summoner: '1',
      witch: '1',
    });
    expect(spellDef[8].casterLevels).toMatchObject({
      cleric: '9',
      oracle: '9',
      psychic: '9',
      sorcerer: '9',
      wizard: '9',
      witch: '9',
    });
  });

  test('Summon Nature\'s Ally', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/s/summon-natures-ally/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(9);
    expect(spellDef[0].name).toBe('Summon Nature\'s Ally I');
    expect(spellDef[1].name).toBe('Summon Nature\'s Ally II');
    expect(spellDef[8].name).toBe('Summon Nature\'s Ally IX');

    expect(spellDef[0].casterLevels).toMatchObject({
      druid: '1',
      ranger: '1',
      shaman: '1',
    });
    expect(spellDef[8].casterLevels).toMatchObject({
      druid: '9',
      shaman: '9',
    });
    expect(spellDef[7].description).toBe(
      spellDef[0].description + ' ' 
      + 'This spell functions like summon nature’s ally I, except that you can summon ' 
      + 'one 8th-level creature, 1d3 7th-level creatures of the same kind, or 1d4+1 ' 
      + 'lower-level creatures of the same kind.');
    expect(spellDef[6].castingInfo.range).toBe('close (25 ft. + 5 ft./2 levels)');
  });

  test('Remove Fear single level only', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/r/remove-fear';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(1);
  });

  test('Fireball single level only', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/f/fireball/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(1);
  });

  test('Absorb Rune', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/absorb-rune-i/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(3);
    expect(spellDef[0].name).toBe("Absorb Rune I");
    expect(spellDef[1].name).toBe("Absorb Rune II");
    expect(spellDef[2].name).toBe("Absorb Rune III");
  });
});

describe('Alternate versioned spells', () => {
  test('Geas & Lesser Geas', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/g/geas-quest/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef.length).toBe(2);
    expect(spellDef[0].name).toBe("Geas/Quest");
    expect(spellDef[1].name).toBe("Geas, Lesser");
    expect(spellDef[0].casterLevels).toMatchObject({
      bard: '6',
      cleric: '6',
      oracle: '6',
      inquisitor: '5',
      sorcerer: '6',
      wizard: '6',
      witch: '6',
    });
    expect(spellDef[1].casterLevels).toMatchObject({
      bard: '3',
      inquisitor: '4',
      sorcerer: '4',
      wizard: '4',
      witch: '4',
    });
  });
  test('Aggressive Thundercloud/Greater', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/aggressive-thundercloud/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Aggressive Thundercloud");
    expect(spellDef[1].name).toBe("Aggressive Thundercloud, Greater");

    // Greater spell has no range attribute, test that it's copied from the lesser version
    expect(spellDef[0].castingInfo.range).toBe(spellDef[1].castingInfo.range);
    expect(Object.keys(spellDef[0].castingInfo).length).toBe(Object.keys(spellDef[1].castingInfo).length)

    /** The following expect is super difficult to parse out, because the topLevelString is in the same <p>
        tag as the casting info. Short of doing a fair bit of extra work and splitting on .contents() + <br>
        I don't think it's in the realm to correctly parse the extra casting info.
    */
    // expect(spellDef[1].castingInfo['Saving Throw']).toBe('Reflex negates and Fort negates (see text);')
  });
  test('Arcane Sight/Greater', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/arcane-sight/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Arcane Sight");
    expect(spellDef[1].name).toBe("Arcane Sight, Greater");
  });

  test('Bladed Dash/Greater', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/b/bladed-dash/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Bladed Dash");
    expect(spellDef[1].name).toBe("Bladed Dash, Greater");

    expect(spellDef[1].description).toMatch('This spell functions like bladed dash, save that you can make a single melee attack against');
  });

  test('Create Mindscape/Greater', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/c/create-mindscape/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Create Mindscape");
    expect(spellDef[1].name).toBe("Create Mindscape, Greater");

    expect(spellDef[1].description).toMatch('Greater create mindscape can be made permanent with a permanency spell');
  });

});

describe('Mythic Spells', () => {
  test('Animate Plants, Mythic', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/animate-plants/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Animate Plants");
    expect(spellDef[1].name).toBe("Mythic Animate Plants");

    expect(spellDef[1].description).toMatch('Animated plants you create with this spell get the maximum number of hit points per level');
  });

  test('Ablative Barrier, Mythic', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/a/ablative-barrier/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Ablative Barrier");
    expect(spellDef[1].name).toBe("Ablative Barrier, Mythic");
  });

})

describe('Mass spells', () => {
  test('Bear\'s endurance', async () => {
    const testUrl = 'https://www.d20pfsrd.com/magic/all-spells/b/bear-s-endurance/';
    const spellPage = await axios.get(testUrl);

    const spellDef = SpellScraper.parseSpell(
      testUrl,
      cheerio.load(spellPage.data)
    );

    expect(spellDef[0].name).toBe("Bear\'s Endurance");
    expect(spellDef[1].name).toBe("Bear\'s Endurance, Mass");

    expect(spellDef[0].castingInfo.range).toBe('touch');
    expect(spellDef[0].castingInfo.target).toBe('creature touched');
  });
});