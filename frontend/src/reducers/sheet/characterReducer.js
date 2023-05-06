import * as actionTypes from 'actions/actionTypes';
import {
  actionTypes as spellActionTypes
} from 'actions/spellcastingActions';
import { actionTypes as inventoryActionTypes } from 'actions/inventoryActions';


import classReducer from './classReducer';

const initialAttack = {
  stat: 'STR',
  name: 'Fists',
  damage: '1d3',
  threat: '20',
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
  powerAttack: false
};

const initialSkill = {
  ranks: 0,
  stat: 'INT',
  bonus: 0
};

const initialCharge = {
  name: 'Channel Energy',
  current: 5,
  maximum: 5
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RESET:
      return {};
    case actionTypes.UPDATE_CHARACTER:
      return {
        ...state,
        [action.update]: action.value
      };
    case actionTypes.ADD_TO_CHARACTER:
      return {
        ...state,
        [action.insertInto]: [...state[action.insertInto], action.value]
      };
    case actionTypes.REMOVE_FROM_CHARACTER:
      return {
        ...state,
        [action.removeFrom]: [
          ...state[action.removeFrom].slice(0, action.index),
          ...state[action.removeFrom].slice(action.index + 1)
        ]
      };
    case actionTypes.UPDATE_STAT:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.attribute]: {
            ...state['stats'][action.attribute],
            [action.section]: action.value
          }
        }
      };
    case actionTypes.UPDATE_SAVE:
      return {
        ...state,
        saves: {
          ...state.saves,
          [action.save]: {
            ...state.saves[action.save],
            [action.section]: action.value
          }
        }
      };
    case actionTypes.UPDATE_INITIATIVE:
      return {
        ...state,
        initiative: {
          ...state.initiative,
          [action.section]: action.value
        }
      };
    case actionTypes.UPDATE_HEALTH:
      return {
        ...state,
        health: {
          ...state.health,
          [action.section]: action.value
        }
      };
    case actionTypes.RESET_HEALTH:
      return {
        ...state,
        health: {
          ...state.health,
          lethal_damage: 0,
          nonlethal_damage: 0
        }
      };
    case actionTypes.UPDATE_SPEED:
      return {
        ...state,
        speed: {
          ...state.speed,
          [action.update]: action.value
        }
      };
    case actionTypes.UPDATE_DEFENSE:
      return {
        ...state,
        defenses: {
          ...state.defenses,
          [action.update]: action.value
        }
      };
    case actionTypes.UPDATE_ATTACK:
      return {
        ...state,
        attacks: state.attacks.map((attack, idx) => {
          if (idx === action.index) {
            return {
              ...attack,
              [action.update]: action.value
            };
          } else {
            return attack;
          }
        })
      };
    case actionTypes.UPDATE_ATTACK_META:
      const modifiedAttack = state.attacks[action.index];
      return {
        ...state,
        attacks: [
          ...state.attacks.slice(0, action.index),
          {
            ...modifiedAttack,
            meta: {
              ...modifiedAttack.meta,
              [action.update]: {
                ...modifiedAttack.meta[action.update],
                value: action.value
              }
            }
          },
          ...state.attacks.slice(action.index + 1)
        ]
      };
    case actionTypes.ADD_ATTACK:
      return {
        ...state,
        attacks: [
          ...state.attacks,
          {
            ...initialAttack
          }
        ]
      };
    case actionTypes.REMOVE_ATTACK:
      return {
        ...state,
        attacks: [
          ...state.attacks.slice(0, action.index),
          ...state.attacks.slice(action.index + 1)
        ]
      };
    case actionTypes.ADD_SKILL:
      let newSkillName = 'New Skill';
      let newSkillCounter = 1;

      const nameMatcherFn = s => s.name === newSkillName;

      while (state.skills.filter(nameMatcherFn).length > 0) {
        newSkillName = 'New Skill ' + newSkillCounter;
        newSkillCounter++;
      }

      return {
        ...state,
        skills: [...state.skills, { ...initialSkill, name: newSkillName }]
      };
    case actionTypes.REMOVE_SKILL:
      return {
        ...state,
        skills: [
          ...state.skills.slice(0, action.index),
          ...state.skills.slice(action.index + 1)
        ]
      };
    case actionTypes.UPDATE_SKILL:
      return {
        ...state,
        skills: state.skills.map((skill, idx) => {
          if (idx === action.index) {
            return {
              ...skill,
              [action.update]: action.value
            };
          } else {
            return skill;
          }
        })
      };
    case actionTypes.UPDATE_EFFECT:
      return {
        ...state,
        effects: {
          ...state.effects,
          [action.effect]: action.value
        }
      };
    case actionTypes.UPDATE_MANEUVER:
      return {
        ...state,
        maneuvers: {
          ...state.maneuvers,
          [action.maneuver]: {
            ...state.maneuvers[action.maneuver],
            [action.section]: action.value
          }
        }
      };
    case actionTypes.ADD_CHARGE:
      return {
        ...state,
        charges: [...state.charges, { ...initialCharge }]
      };
    case actionTypes.UPDATE_CHARGE:
      return {
        ...state,
        charges: [
          ...state.charges.slice(0, action.index),
          {
            ...state.charges[action.index],
            [action.section]: action.value
          },
          ...state.charges.slice(action.index + 1)
        ]
      };
    case actionTypes.REMOVE_CHARGE:
      return {
        ...state,
        charges: [
          ...state.charges.slice(0, action.index),
          ...state.charges.slice(action.index + 1)
        ]
      };
    case actionTypes.RESET_CHARGES:
      return {
        ...state,
        charges: state.charges.map(charge => ({
          ...charge,
          current: charge.maximum
        }))
      };
    case actionTypes.REORDER_CHARACTER_PROPERTY:
      const fromItem = state[action.characterProperty][action.fromIndex];

      // if we remove an item at position 10, and are supposed to insert at index 12,
      // index 12 becomes index 11 after we remove position 10. Thus, we need to
      // reduce the index by 1. If we remove at position 10 and add at position 4,
      // indices are unaffected. It's only when from < to
      const modifiedToIndex =
        action.fromIndex < action.toIndex ? action.toIndex - 1 : action.toIndex;

      const reorderedProperties = [
        ...state[action.characterProperty].slice(0, action.fromIndex),
        ...state[action.characterProperty].slice(action.fromIndex + 1)
      ];

      reorderedProperties.splice(modifiedToIndex, 0, fromItem); // add it back in
      console.log(reorderedProperties);

      return {
        ...state,
        [action.characterProperty]: reorderedProperties
      };
    case actionTypes.TOGGLE_CLASS_SKILL_OVERRIDE:
      const existingValue =
        state.classSkillOverrides[action.skillName] || false;
      return {
        ...state,
        classSkillOverrides: {
          ...state.classSkillOverrides,
          [action.skillName]: !existingValue
        }
      };
    case actionTypes.SELECT_CLASS:
    case actionTypes.UPDATE_CLASS:
    case actionTypes.UPDATE_CLASS_LEVEL:
      return { ...state, classes: classReducer(state.classes, action) };
    case actionTypes.SELECT_RACE:
      return {
        ...state,
        race: action.race
      };
    case actionTypes.UPDATE_RACE:
      return {
        ...state,
        race: {
          ...state.race,
          [action.section]: action.value
        }
      };

    // SPELLCASTING
    case spellActionTypes.UPDATE_SPELL_STAT:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          stat: action.value
        }
      };
    case spellActionTypes.UPDATE_SPELL_SAVES:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spellSaves: {
            ...state.spellcasting.spellSaves,
            [action.section]: action.value
          }
        }
      };
    case spellActionTypes.UPDATE_BONUS_SPELLS_PER_DAY:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          bonusSpellsPerDay: {
            ...state.spellcasting.bonusSpellsPerDay,
            [action.spellLevel]: action.value
          }
        }
      };
    case spellActionTypes.UPDATE_CONCENTRATION:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          concentration: {
            ...state.spellcasting.concentration,
            [action.spellLevel]: action.value
          }
        }
      };
    case spellActionTypes.ADD_SPELL:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spells: [
            ...state.spellcasting.spells,
            {
              ...action.value,
              prepared: 0,
              exhausted: 0
            }
          ]
        }
      };
    case spellActionTypes.REMOVE_SPELL: {
      const position = state.spellcasting.spells.findIndex(
        ({ _id }) => _id === action.id
      );
      if (position < 0) {
        return state;
      }
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spells: [
            ...state.spellcasting.spells.slice(0, position),
            ...state.spellcasting.spells.slice(position + 1)
          ]
        }
      };
    }
    case spellActionTypes.PREPARE_SPELL: {
      const position = state.spellcasting.spells.findIndex(
        ({ _id }) => _id === action.id
      );
      if (position < 0) {
        return state;
      }
      const targetSpell = state.spellcasting.spells[position];
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spells: [
            ...state.spellcasting.spells.slice(0, position),
            {
              ...targetSpell,
              prepared: targetSpell.prepared + action.value
            },
            ...state.spellcasting.spells.slice(position + 1)
          ]
        }
      };
    }
    case spellActionTypes.CAST_SPELL: {
      const position = state.spellcasting.spells.findIndex(
        ({ _id }) => _id === action.id
      );
      if (position < 0) {
        return state;
      }
      const targetSpell = state.spellcasting.spells[position];
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spells: [
            ...state.spellcasting.spells.slice(0, position),
            {
              ...targetSpell,
              exhausted: targetSpell.exhausted + action.value
            },
            ...state.spellcasting.spells.slice(position + 1)
          ]
        }
      };
    }
    case spellActionTypes.RESET_SPELLS:
      return {
        ...state,
        spellcasting: {
          ...state.spellcasting,
          spells: state.spellcasting.spells.map(spell => ({
            ...spell,
            exhausted: 0
          }))
        }
      };
    case inventoryActionTypes.ADD_INVENTORY_SECTION:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          sections: [
            ...state.inventory.sections,
            {
              name: action.value,
              contents: []
            }
          ]
        }
      }
      case inventoryActionTypes.EDIT_INVENTORY_SECTION:
        return {
          ...state,
          inventory: {
            ...state.inventory,
            sections: [
              ...state.inventory.sections.slice(0, action.index),
              {
                ...state.inventory.sections[action.index],
                ...action.value
              },
              ...state.inventory.sections.slice(action.index + 1)
            ]
          }
        }
        case inventoryActionTypes.REMOVE_INVENTORY_SECTION:
          return {
            ...state,
            inventory: {
              ...state.inventory,
              sections: [
                ...state.inventory.sections.slice(0, action.index),
                ...state.inventory.sections.slice(action.index + 1)
              ]
            }
          }
        case inventoryActionTypes.ADD_INVENTORY_ITEM:
          return {
            ...state,
            inventory: {
              ...state.inventory,
              sections: [
                ...state.inventory.sections.map((section, idx) => {
                  if (idx === action.sectionIndex) {
                    return {
                      ...section,
                      contents: [...section.contents, action.value]
                    }
                  } else {
                    return section;
                  }
                })
              ]
            }
          }
        case inventoryActionTypes.EDIT_INVENTORY_ITEM:
          return {
            ...state,
            inventory: {
              ...state.inventory,
              sections: [
                ...state.inventory.sections.map((section, idx) => {
                  if (idx === action.sectionIndex) {
                    return {
                      ...section,
                      contents: [
                        ...section.contents.map((item, idx) => {
                          if (idx === action.itemIndex) {
                            return {...item, ...action.value};
                          } else {
                            return item;
                          }
                        })
                      ]
                    }
                  } else {
                    return section;
                  }
                })
              ]
            }
          }
        case inventoryActionTypes.REMOVE_INVENTORY_ITEM:
          return {
            ...state,
            inventory: {
              ...state.inventory,
              sections: [
                ...state.inventory.sections.map((section, idx) => {
                  if (idx === action.sectionIndex) {
                    return {
                      ...section,
                      contents: [
                        ...section.contents.slice(0, action.itemIndex),
                        ...section.contents.slice(action.itemIndex + 1)
                      ]
                    }
                  } else {
                    return section;
                  }
                })
              ]
            }
          }
    default:
      return state;
  }
};
