import { HEALTH_HALF_ROUND_UP, HEALTH_MANUAL } from 'components/Health/Health';
import { useSelector } from 'react-redux';
import {
  calcHalfRoundUpHealth,
  calcMod,
  calcTotalStat,
  calculateAbilityScoreBonusSpells,
  calculateTotalSkillPoints,
  getCombatEffectStatModifiers
} from 'util/statcalc';

export const useStat = stat => {
  return useSelector(state => state.sheet.character.stats[stat]);
};

export const useStats = () => {
  return useSelector(state => state.sheet.character.stats);
};

export const useCombatEffects = () => {
  return useSelector(state => state.sheet.character.effects);
};

export const useStatTotal = stat => {
  const statDetails = useStat(stat);
  const effects = useCombatEffects();

  const effectModifier = getCombatEffectStatModifiers({
    stats: { [stat]: statDetails },
    effects
  });

  return calcTotalStat(statDetails) + effectModifier[stat];
};

export const useStatTotals = () => {
  const stats = useStats();
  const effects = useCombatEffects();

  const effectModifiers = getCombatEffectStatModifiers({ stats, effects });
  return Object.keys(stats).reduce((modifedStats, statKey) => {
    modifedStats[statKey] =
      calcTotalStat(stats[statKey]) + effectModifiers[statKey];
    return modifedStats;
  }, {});
};

export const useStatBonus = stat => {
  const statTotal = useStatTotal(stat);
  return calcMod(statTotal);
};

export const useStatBonuses = () => {
  const statTotals = useStatTotals();
  return Object.keys(statTotals).reduce((statMods, statKey) => {
    statMods[statKey] = calcMod(statTotals[statKey]);
    return statMods;
  }, {});
};

export const useHealth = () => {
  return useSelector(state => state.sheet.character.health);
};

export const useLevel = () => {
  // TODO: Multiple classes
  const classes = useSelector(state => state.sheet.character.classes);
  const currentClass = classes[0];

  return currentClass.level;
};

export const useHitDie = () => {
  // TODO: Multiple classes
  const classes = useSelector(state => state.sheet.character.classes);
  const currentClass = classes[0];

  return currentClass.classDef ? currentClass.classDef.hitDie : 'd8';
};

export const useMaxHealth = () => {
  const health = useHealth();
  const conBonus = useStatBonus('CON');
  const level = useLevel();
  const hitDie = useHitDie();

  if (health.calculation === HEALTH_HALF_ROUND_UP) {
    return calcHalfRoundUpHealth({
      conBonus,
      level: parseInt(level),
      hitDie: parseInt(hitDie.substring(1)),
      bonus: health.bonus
    });
  } else if (health.calculation === HEALTH_MANUAL) {
    return health.maximum;
  }
};

export const useCurrentCharacterProgression = defaultProgression => {
  // TODO: Multiple classes
  const classes = useSelector(state => state.sheet.character.classes);
  const currentClass = classes[0];

  if (currentClass.classDef) {
    return currentClass.classDef.progression[currentClass.level];
  } else {
    return defaultProgression;
  }
};

export const useBaseAttackBonus = () => {
  // TODO: Multiple classes
  const classes = useSelector(state => state.sheet.character.classes);
  const currentClass = classes[0];
  if (currentClass.classDef) {
    return currentClass.classDef.progression[currentClass.level]
      .base_attack_bonus;
  } else {
    return '0';
  }
};

export const useBaseAttackBonusInteger = () => {
  const stringValue = useBaseAttackBonus();

  return parseInt(stringValue.split('/')[0]);
};

export const useSaves = () => {
  return useSelector(state => state.sheet.character.saves);
};

export const useDefenses = () => {
  return useSelector(state => state.sheet.character.defenses);
};

export const useSkills = () => {
  return useSelector(state => state.sheet.character.skills);
};

export const useClassSkills = () => {
  const overrides = useSelector(
    state => state.sheet.character.classSkillOverrides
  );
  const classes = useSelector(state => state.sheet.character.classes);
  let classSkills = [];

  // TODO: Multi-class
  const currentClass = classes[0];
  if (currentClass.classDef) {
    classSkills = currentClass.classDef.skills;
  }

  const returnedClassSkills = { ...overrides };
  for (const classSkill of classSkills) {
    if (overrides[classSkill]) {
      returnedClassSkills[classSkill] = false;
    } else {
      returnedClassSkills[classSkill] = true;
    }
  }

  return returnedClassSkills;
};

export const useBonusSkillPoints = () => {
  return useSelector(state => state.sheet.character.bonusSkillPoints);
};

export const useNumSkillPoints = () => {
  const intBonus = useStatBonus('INT');
  const bonusSkillPoints = useBonusSkillPoints();
  // TODO: Multiple classes
  const classes = useSelector(state => state.sheet.character.classes);
  const currentClass = classes[0];

  if (currentClass.classDef) {
    const { skillPointsPerLevel } = currentClass.classDef;
    return calculateTotalSkillPoints({
      skillPointsPerLevel,
      level: currentClass.level,
      intBonus,
      bonusSkillPoints
    });
  } else {
    return 0;
  }
};

export const useManeuvers = () => {
  return useSelector(state => state.sheet.character.maneuvers);
};

export const useCharges = () => {
  return useSelector(state => state.sheet.character.charges);
};

export const useSpellSaves = () => {
  return useSelector(state => state.sheet.character.spellcasting.spellSaves);
};

export const useCastingStatBonus = () => {
  const ability = useSelector(state => state.sheet.character.spellcasting.stat);
  return useStatBonus(ability);
};

export const useBonusSpellsPerDay = () => {
  return useSelector(
    state => state.sheet.character.spellcasting.bonusSpellsPerDay
  );
};

export const useTotalSpellsPerDay = () => {
  const abilityScoreBonus = useCastingStatBonus();
  const bonusSpellsPerDay = useBonusSpellsPerDay();
  const { spells_per_day } = useCurrentCharacterProgression({
    spells_per_day: false
  });

  if (!spells_per_day) {
    return {};
  }

  const total = {};
  for (let spellLevel of Object.keys(spells_per_day)) {
    total[spellLevel] =
      parseInt(spells_per_day[spellLevel]) +
      bonusSpellsPerDay[spellLevel] +
      calculateAbilityScoreBonusSpells({
        abilityScoreBonus,
        spellLevel: parseInt(spellLevel)
      });
  }

  return total;
};

export const useKnownSpellLevels = () => {
  const { spells_per_day } = useCurrentCharacterProgression({
    spells_per_day: false
  });

  if (!spells_per_day) {
    return [];
  }

  return Object.keys(spells_per_day).filter(
    spellLevel => parseInt(spells_per_day[spellLevel]) > 0
  );
};

export const useSpells = () => {
  return useSelector(state => state.sheet.character.spellcasting.spells);
};

export const useConcentration = () => {
  return useSelector(state => state.sheet.character.spellcasting.concentration);
};

export const useClassName = def => {
  const classes = useSelector(state => state.sheet.character.classes);
  if (classes[0].classDef) {
    return classes[0].classDef.name.toLowerCase();
  } else {
    return def;
  }
};

export const useInventory = () => {
  return useSelector(state => state.sheet.character.inventory);
}

export const useInventoryItem = (sectionIndex, itemIndex) => {
  const sections = useSelector(state => state.sheet.character.inventory.sections);
  
  if (sectionIndex >= sections.length || itemIndex >= sections[sectionIndex].contents.length) {
    return null;
  }

  return sections[sectionIndex].contents[itemIndex];
};