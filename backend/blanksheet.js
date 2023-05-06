module.exports = {
    name: "Champion",
    bio: "",
    stats: {
        "STR": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        },
        "DEX": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        },
        "CON": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        },
        "INT": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        },
        "WIS": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        },
        "CHA": {
            base: 10,
            racial: 0,
            enhancement: 0,
            other: 0,
        }
    },
    spellcasting: {
        stat: 'INT',
        bonusSpellsPerDay: {
            '0th': 0,
            '1st': 0,
            '2nd': 0,
            '3rd': 0,
            '4th': 0,
            '5th': 0,
            '6th': 0,
            '7th': 0,
            '8th': 0,
            '9th': 0,
        },
        spellSaves: {
            feat: 0,
            other: 0,
        },
        spells: [],
        concentration: {
            feat: 0,
            other: 0,
        }
    },
    defenses: {
        armor: 0,
        shield: 0,
        natural: 0,
        maximum_dex: 0,
        dodge: 0,
        deflect: 0,
        size: 0,
    },
    attacks: [
        {
            stat: 'STR',
            name: 'Fists',
            damage: '1d3',
            threat: '20-20',
            crit: 'x2',
            type: 'B',
            range: '5ft',
            twf: false,
            itwf: false,
            gtwf: false,
            extraAttack: false,
            mainHand: true,
            offHand: true,
            light: true,
            powerAttack: false,
        },
    ],
    saves: {
        fort_save: {
            other: 0
        },
        ref_save: {
            other: 0
        },
        will_save: {
            other: 0
        },
    },
    maneuvers: {
        cmb: {
            feat: 0,
            other: 0
        },
        cmd: {
            feat: 0,
            other: 0
        },
    },
    initiative: {
        other: 0,
    },
    health: {
        lethal_damage: 0,
        nonlethal_damage: 0,
        calculation: 'halfRoundUp',
        bonus: 0,
        maximum: 10,
    },
    race: null,
    classes: [
            {
                level: 1,
                classDef: null,
            }
        ],
    speed: {
        base: 30,
        swim: 0,
        climb: 0,
        fly: 0,
        burrow: 0,
    },
    alignment: 'NG',
    classSkillOverrides: {},
    notes: '',
    effects: {
        Haste: false,
        Enlarged: false,
        Reduced: false,
        Bless: false
    },
    charges: [
        {
            name: "Ki",
            maximum: 6,
            current: 4
        },
        {
            name: "rage",
            current: 3,
            maximum: 3
        }
    ],
    bonusSkillPoints: 0,
    skills: [
        {
            name:'Acrobatics',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Appraise',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Bluff',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Climb',
            ranks: 0,
            stat: 'STR',
            bonus: 0
        },
        {
            name:'Craft',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Diplomacy',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Disable Device',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Disguise',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Escape Artist',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Fly',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Handle Animal',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Heal',
            ranks: 0,
            stat: 'WIS',
            bonus: 0
        },
        {
            name:'Intimidate',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Knowledge (arcana)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (dungeoneering)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (engineering)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (geography)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (history)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (local)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (nature)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (nobility)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (planes)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Knowledge (religion)',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Linguistics',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Perception',
            ranks: 0,
            stat: 'WIS',
            bonus: 0
        },
        {
            name:'Perform',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        },
        {
            name:'Profession',
            ranks: 0,
            stat: 'WIS',
            bonus: 0
        },
        {
            name:'Ride',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Sense Motive',
            ranks: 0,
            stat: 'WIS',
            bonus: 0
        },
        {
            name:'Sleight of Hand',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Spellcraft',
            ranks: 0,
            stat: 'INT',
            bonus: 0
        },
        {
            name:'Stealth',
            ranks: 0,
            stat: 'DEX',
            bonus: 0
        },
        {
            name:'Survival',
            ranks: 0,
            stat: 'WIS',
            bonus: 0
        },
        {
            name:'Swim',
            ranks: 0,
            stat: 'STR',
            bonus: 0
        },
        {
            name:'Use Magic Device',
            ranks: 0,
            stat: 'CHA',
            bonus: 0
        }
    ],
    feats: [],
    traits: []
}
