import {
  ADD_CHARGE,
  REMOVE_CHARGE,
  RESET_CHARGES,
  RESET_HEALTH,
  SELECT_RACE,
  UPDATE_CHARGE,
  UPDATE_HEALTH,
  UPDATE_INITIATIVE,
  UPDATE_MANEUVER,
  UPDATE_RACE,
  UPDATE_SAVE,
  UPDATE_STAT
} from './actionTypes';

export const updateCharacter = (key, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_CHARACTER',
      update: key,
      value: value
    });
  };
};

export const updateCharacterInteger = (key, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: 'UPDATE_CHARACTER',
        update: key,
        value: parseInt(value)
      });
    }
  };
};

export const removeFromCharacter = (removeFrom, idx) => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_FROM_CHARACTER',
      removeFrom: removeFrom,
      index: idx
    });
  };
};

export const toggleClassSkillOverride = skillName => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CLASS_SKILL_OVERRIDE',
      skillName: skillName
    });
  };
};

export const reorderCharacterProperty = (
  characterProperty,
  fromIndex,
  toIndex
) => {
  return dispatch => {
    dispatch({
      type: 'REORDER_CHARACTER_PROPERTY',
      characterProperty: characterProperty,
      fromIndex: fromIndex,
      toIndex: toIndex
    });
  };
};

export const updateSpeed = (type, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SPEED',
      update: type,
      value: value
    });
  };
};

export const updateDefenseInteger = (type, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: 'UPDATE_DEFENSE',
        update: type,
        value: parseInt(value)
      });
    }
  };
};

export const updateAttack = (index, key, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_ATTACK',
      index: index,
      update: key,
      value: value
    });
  };
};

export const updateAttackMeta = (index, key, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_ATTACK_META',
      index,
      update: key,
      value
    });
  };
};

export const addAttack = () => {
  return dispatch => {
    dispatch({
      type: 'ADD_ATTACK'
    });
  };
};

export const removeAttack = index => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_ATTACK',
      index: index
    });
  };
};

export const addSkill = () => {
  return dispatch => {
    dispatch({
      type: 'ADD_SKILL'
    });
  };
};

export const removeSkill = index => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_SKILL',
      index: index
    });
  };
};

export const updateSkill = (index, field, value) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SKILL',
      index: index,
      update: field,
      value: value
    });
  };
};

export const updateSkillInteger = (index, field, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: 'UPDATE_SKILL',
        index: index,
        update: field,
        value: parseInt(value)
      });
    }
  };
};

export const updateHealthInteger = (section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_HEALTH,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateHealth = (section, value) => {
  return dispatch => {
    dispatch({
      type: UPDATE_HEALTH,
      section,
      value
    });
  };
};

export const resetHealth = () => {
  return dispatch => {
    dispatch({
      type: RESET_HEALTH
    });
  };
};

export const updateEffect = (effect, isActive) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_EFFECT',
      effect,
      value: isActive
    });
  };
};

// NOTE: Won't update if value is not a number
export const updateStat = (attribute, section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_STAT,
        attribute,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateInitiativeSafely = (section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_INITIATIVE,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateSaveSafely = (save, section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_SAVE,
        save,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateManeuverInteger = (maneuver, section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_MANEUVER,
        maneuver,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateChargeInteger = (index, section, value) => {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: UPDATE_CHARGE,
        index,
        section,
        value: parseInt(value)
      });
    }
  };
};

export const updateCharge = (index, section, value) => {
  return dispatch => {
    dispatch({
      type: UPDATE_CHARGE,
      index,
      section,
      value
    });
  };
};

export const addCharge = () => {
  return dispatch => {
    dispatch({
      type: ADD_CHARGE
    });
  };
};

export const removeCharge = index => {
  return dispatch => {
    dispatch({
      type: REMOVE_CHARGE,
      index
    });
  };
};

export const resetCharges = () => {
  return dispatch => {
    dispatch({
      type: RESET_CHARGES
    });
  };
};

export const selectRace = raceData => {
  return dispatch => {
    dispatch({
      type: SELECT_RACE,
      race: raceData
    });
  };
};

export const updateRace = (section, value) => {
  return dispatch => {
    dispatch({
      type: UPDATE_RACE,
      section,
      value
    });
  };
};
