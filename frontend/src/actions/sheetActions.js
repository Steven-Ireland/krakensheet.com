import * as axios from 'axios';

import {
  LOAD_SHEET_SUCCESS,
  NEW_SHEET_FAIL,
  RESET_SHEET,
  SAVE_SHEET_FAILURE,
  SAVE_SHEET_SUCCESS
} from './actionTypes';

axios.defaults.withCredentials = true;

export const saveSheet = sheet => {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      const results = await axios.put('/api/sheet/', sheet, {
        withCredentials: true
      });
      dispatch(saveSheetSuccess(results.data.rev));
    } catch (e) {
      console.error(e);
      dispatch(saveSheetFailure());
    }
  };
};

export const unloadSheet = () => {
  return dispatch => {
    dispatch({
      type: RESET_SHEET
    });
  };
};

export const loadSheet = sheet => {
  return dispatch => {
    dispatch(loadSheetSuccess(sheet));
  };
};

const loadSheetSuccess = sheet => ({
  type: LOAD_SHEET_SUCCESS,
  sheet: sheet
});

const loadSheetFailure = () => ({
  type: NEW_SHEET_FAIL
});

const saveSheetSuccess = _rev => ({
  type: SAVE_SHEET_SUCCESS,
  _rev
});

const saveSheetFailure = () => ({
  type: SAVE_SHEET_FAILURE
});
