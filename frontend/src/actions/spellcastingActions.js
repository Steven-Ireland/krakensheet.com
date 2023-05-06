export const actionTypes = {
  UPDATE_SPELL_STAT: 'UPDATE_SPELL_STAT',
  UPDATE_SPELL_SAVES: 'UPDATE_SPELL_SAVES',
  UPDATE_BONUS_SPELLS_PER_DAY: 'UPDATE_BONUS_SPELLS_PER_DAY',
  UPDATE_CONCENTRATION: 'UPDATE_CONCENTRATION',
  ADD_SPELL: 'ADD_SPELL',
  REMOVE_SPELL: 'REMOVE_SPELL',
  CAST_SPELL: 'CAST_SPELL',
  PREPARE_SPELL: 'PREPARE_SPELL',
  RESET_SPELLS: 'RESET_SPELLS'
};

export function updateSpellSavesInteger(section, value) {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: actionTypes.UPDATE_SPELL_SAVES,
        section,
        value: parseInt(value)
      });
    }
  };
}

export function updateBonusSpellsPerDayInteger(spellLevel, value) {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: actionTypes.UPDATE_BONUS_SPELLS_PER_DAY,
        spellLevel,
        value: parseInt(value)
      });
    }
  };
}

export function updateSpellcastingStat(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_SPELL_STAT,
      value
    });
  };
}

export function updateConcentrationInteger(section, value) {
  return dispatch => {
    if (value.length > 0 && !isNaN(value)) {
      dispatch({
        type: actionTypes.UPDATE_CONCENTRATION,
        section,
        value: parseInt(value)
      });
    }
  };
}

export function addSpell(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_SPELL,
      value
    });
  };
}

export function removeSpell(id) {
  return dispatch => {
    dispatch({
      type: actionTypes.REMOVE_SPELL,
      id
    });
  };
}

export function prepareSpell(id) {
  return dispatch => {
    dispatch({
      type: actionTypes.PREPARE_SPELL,
      id,
      value: 1
    });
  };
}

export function unPrepareSpell(id) {
  return dispatch => {
    dispatch({
      type: actionTypes.PREPARE_SPELL,
      id,
      value: -1
    });
  };
}

export function castSpell(id) {
  return dispatch => {
    dispatch({
      type: actionTypes.CAST_SPELL,
      id,
      value: 1
    });
  };
}

export function restResetSpells() {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_SPELLS
    });
  };
}
