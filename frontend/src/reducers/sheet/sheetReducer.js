import * as actionTypes from 'actions/actionTypes';
import { actionTypes as spellActionTypes } from 'actions/spellcastingActions';
import { actionTypes as inventoryActionTypes } from 'actions/inventoryActions';
import { message } from 'antd';

import characterReducer from './characterReducer';

const initialSheet = {
  character: null,
  user: null,
  _rev: null
};

export default (state = initialSheet, action) => {
  switch (action.type) {
    case actionTypes.RESET:
    case actionTypes.UPDATE_CHARACTER:
    case actionTypes.ADD_TO_CHARACTER:
    case actionTypes.REMOVE_FROM_CHARACTER:
    case actionTypes.UPDATE_STAT:
    case actionTypes.SELECT_CLASS:
    case actionTypes.UPDATE_CLASS:
    case actionTypes.UPDATE_CLASS_LEVEL:
    case actionTypes.UPDATE_SAVE:
    case actionTypes.UPDATE_SKILL:
    case actionTypes.UPDATE_INITIATIVE:
    case actionTypes.UPDATE_HEALTH:
    case actionTypes.UPDATE_SPEED:
    case actionTypes.UPDATE_DEFENSE:
    case actionTypes.UPDATE_ATTACK:
    case actionTypes.UPDATE_ATTACK_META:
    case actionTypes.UPDATE_EFFECT:
    case actionTypes.UPDATE_MANEUVER:
    case actionTypes.ADD_ATTACK:
    case actionTypes.REMOVE_ATTACK:
    case actionTypes.ADD_CHARGE:
    case actionTypes.UPDATE_CHARGE:
    case actionTypes.REMOVE_CHARGE:
    case actionTypes.RESET_CHARGES:
    case actionTypes.RESET_HEALTH:
    case actionTypes.ADD_SKILL:
    case actionTypes.REMOVE_SKILL:
    case actionTypes.REORDER_CHARACTER_PROPERTY:
    case actionTypes.TOGGLE_CLASS_SKILL_OVERRIDE:
    case actionTypes.SELECT_RACE:
    case actionTypes.UPDATE_RACE:
    case spellActionTypes.UPDATE_SPELL_SAVES:
    case spellActionTypes.UPDATE_SPELL_STAT:
    case spellActionTypes.UPDATE_BONUS_SPELLS_PER_DAY:
    case spellActionTypes.UPDATE_CONCENTRATION:
    case spellActionTypes.ADD_SPELL:
    case spellActionTypes.REMOVE_SPELL:
    case spellActionTypes.CAST_SPELL:
    case spellActionTypes.PREPARE_SPELL:
    case spellActionTypes.RESET_SPELLS:
    case inventoryActionTypes.ADD_INVENTORY_SECTION:
    case inventoryActionTypes.EDIT_INVENTORY_SECTION:
    case inventoryActionTypes.REMOVE_INVENTORY_SECTION:
    case inventoryActionTypes.ADD_INVENTORY_ITEM:
    case inventoryActionTypes.EDIT_INVENTORY_ITEM:
    case inventoryActionTypes.REMOVE_INVENTORY_ITEM:
      return { ...state, character: characterReducer(state.character, action) };

    case actionTypes.SAVE_SHEET_SUCCESS:
      message.success('Saved sheet!', 0.75);
      return { ...state, _rev: action._rev };

    case actionTypes.LOAD_SHEET_SUCCESS:
      return { ...action.sheet };

    case actionTypes.RESET_SHEET:
      return { ...initialSheet };

    case actionTypes.NEW_SHEET_FAIL:
      message.error('Problem creating new sheet :(');
      return state;

    default:
      return state;
  }
};
