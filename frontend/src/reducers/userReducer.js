import { message } from 'antd';
import Cookies from 'js-cookie';

import * as actionTypes from '../actions/actionTypes';

let initialUserState = {
  loggedIn: false,
  showLogin: false,
  showSidebar: true,
};

const sessionCookie = Cookies.get('connect.sid');
if (sessionCookie) {
  initialUserState = { loggedIn: true };
}

export default (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.RESET:
      return initialUserState;
    case actionTypes.USER_LOG_IN_SUCCESS:
      message.success('Successfully logged in');

      const newState = {
        ...state,
        loggedIn: true
      };

      return newState;
    case actionTypes.USER_LOG_IN_FAILURE:
      message.error('Login failed');
      return {
        ...state
      };
    case actionTypes.USER_LOG_IN_ATTEMPT:
      return {
        ...state
      };
    case actionTypes.USER_LOG_OUT:
      Cookies.remove('connect.sid');
      return {
        ...state,
        loggedIn: false
      };
    case actionTypes.USER_REGISTER:
      message.success('Successfully Registered! Thanks!');

      return {
        ...state,
        loggedIn: true
      };
    case actionTypes.USER_LOG_IN_FORM_SHOW:
      return {
        ...state,
        showLogin: true
      };
    case actionTypes.USER_LOG_IN_FORM_HIDE:
      return {
        ...state,
        showLogin: false
      };
    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    default:
      return state;
  }
};
