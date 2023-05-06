import { combineReducers } from 'redux';

import sheetReducer from './sheet/sheetReducer';
import userReducer from './userReducer';

export default combineReducers({
  sheet: sheetReducer,
  user: userReducer
});
