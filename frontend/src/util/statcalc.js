import { fmtModifier } from './formatter';

export function calcMod(num) {
  return Math.floor((num - 10) / 2);
}

export function calcStatMod(stat) {
  return calcMod(calcTotalStat(stat));
}

export function calcTotalStat(stat) {
  return Object.values(stat).reduce((total, current) => total + current, 0);
}

export function calcFeatBonus(to, character) {
  // return character.feats
  //  .map((feat) => feats[feat])
  //  .map((feat) => {
  //      if (feat.to === to) { // apply this bonus
  //          return feat.bonus;
  //      } else {
  //          return 0;
  //      }
  //  })
  //  .reduce((accumulator, curr) => accumulator + curr);
  return 0;
}

export function calcHalfRoundUpHealth({ conBonus, level, hitDie, bonus }) {
  return (
    hitDie +
    conBonus + // level 1
    bonus + // flat bonus
    (Math.ceil(hitDie / 2) + conBonus + 1) * (level - 1)
  ); // half round up
}

export function getCombatEffectStatModifiers({ stats, effects }) {
  const effectDefinitions = {
    Bless() {
      return 0;
    },
    Haste() {
      return 0;
    },
    Enlarged(stat) {
      const enlargeEffects = {
        STR: 2,
        DEX: -2
      };
      return enlargeEffects[stat] || 0;
    },
    Reduced(stat) {
      const reduceEffects = {
        STR: -2,
        DEX: 2
      };
      return reduceEffects[stat] || 0;
    }
  };

  let statMods = {};
  for (const statKey of Object.keys(stats)) {
    const mod = Object.keys(effects)
      .filter(effectKey => effects[effectKey]) // get effects toggled on
      .map(effectKey => effectDefinitions[effectKey](statKey))
      .reduce((prev, current) => prev + current, 0);
    statMods[statKey] = mod;
  }

  return statMods;
}

export function calculateDamageBonus({ statBonuses, attack, baseAttackBonus }) {
  const weaponDamageBonus = attack.name
    .split(' ')
    .map(bonusName => {
      const numberedBonus = bonusName.match(/\+(\d+)/);
      if (numberedBonus) {
        return parseInt(numberedBonus);
      } else {
        return 0;
      }
    })
    .reduce((acc, current) => acc + current, 0);

  const statBonus = statBonuses[attack.stat];

  const integerBaseAttackBonus = baseAttackBonus
    .split('/')
    .map(s => s.replace(/\D/g, ''))
    .map(s => parseInt(s));

  const maxBaseAttackBonus = integerBaseAttackBonus[0];
  const powerAttackBonus = attack.powerAttack
    ? Math.floor(maxBaseAttackBonus / 4) * 2 + 2
    : 0;

  const weaponSpecializationBonus = 
    (attack.weaponSpecialization ? 2 : 0) + 
    (attack.greaterWeaponSpecialization ? 2 : 0);

  const isNegative = statBonus < 0;

  return (
    (isNegative ? '- ' : '+ ') +
    (Math.abs(statBonus) + weaponDamageBonus + powerAttackBonus + weaponSpecializationBonus)
  );
}

export function calculateHit({
  baseAttackBonus,
  statBonuses,
  attack,
  character,
  effects
}) {
  const weaponAttackBonus = attack.name
    .split(' ')
    .map(bonusName => {
      const numberedBonus = bonusName.match(/\+(\d+)/);
      if (numberedBonus) {
        return parseInt(numberedBonus);
      } else if (bonusName.toLowerCase() === 'masterwork') {
        return 1;
      } else {
        return 0;
      }
    })
    .reduce((acc, current) => acc + current, 0);

  const statBonus = statBonuses[attack.stat] || 0;

  const integerBaseAttackBonus = baseAttackBonus
    .split('/')
    .map(s => s.replace(/\D/g, ''))
    .map(s => parseInt(s));

  const maxBaseAttackBonus = integerBaseAttackBonus[0];
  const unmodifiedAttacks = integerBaseAttackBonus.map(
    attack => attack + statBonus + weaponAttackBonus
  );

  let modifiedAttacks = unmodifiedAttacks;

  if (effects.Haste) {
    modifiedAttacks.unshift(modifiedAttacks[0]);
    modifiedAttacks = modifiedAttacks.map(attack => attack + 1);
  }

  if (effects.Bless) {
    modifiedAttacks = modifiedAttacks.map(attack => attack + 1);
  }

  if (effects.Enlarged) {
    modifiedAttacks = modifiedAttacks.map(attack => attack - 1);
  }

  if (effects.Reduced) {
    modifiedAttacks = modifiedAttacks.map(attack => attack + 1);
  }

  if (character.size === 'Small') {
    modifiedAttacks = modifiedAttacks.map(attack => attack + 1);
  }

  if (attack.throwAnything) {
    modifiedAttacks = modifiedAttacks.map(attack => attack + 1);
  }

  if (attack.extraAttack) {
    modifiedAttacks.unshift(modifiedAttacks[0]);
  }

  if (attack.powerAttack) {
    modifiedAttacks = modifiedAttacks.map(
      attack => attack - Math.floor(maxBaseAttackBonus / 4) - 1
    );
  }

  if (attack.twf) {
    const attackPenalty = attack.light ? 2 : 4;
    modifiedAttacks = modifiedAttacks.map(attack => attack - attackPenalty);

    if (attack.offHand) {
      const totalOffHandAttacks = attack.twf + attack.itwf + attack.gtwf;
      const fullBaBAttack = modifiedAttacks[0];
      const offHandAttacks = [];

      for (
        let numOffHandAttack = 0;
        numOffHandAttack < totalOffHandAttacks;
        numOffHandAttack++
      ) {
        offHandAttacks.push(fullBaBAttack - 5 * numOffHandAttack);
      }

      if (attack.mainHand) {
        modifiedAttacks = [...modifiedAttacks, ...offHandAttacks];
      } else {
        modifiedAttacks = offHandAttacks;
      }
    }
  }

  return modifiedAttacks.map(fmtModifier).join(' / ');
}

export function calculateAbilityScoreBonusSpells({
  abilityScoreBonus,
  spellLevel
}) {
  const spellDifference = abilityScoreBonus - spellLevel;
  if (spellDifference < 0 || spellLevel === 0) {
    return 0;
  } else {
    return (spellDifference >= 0) + Math.floor(spellDifference / 4);
  }
}

export function calculateTotalSkill({ isClassSkill, skill, statBonus }) {
  return (
    ((isClassSkill && skill.ranks) > 0 ? 3 : 0) +
    statBonus +
    skill.ranks +
    skill.bonus
  );
}

export function calculateTotalSkillPoints({
  skillPointsPerLevel,
  level,
  intBonus,
  bonusSkillPoints
}) {
  return (intBonus + skillPointsPerLevel) * level + bonusSkillPoints;
}
