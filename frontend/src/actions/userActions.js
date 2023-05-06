import axios from 'axios';

import {
  TOGGLE_SIDEBAR,
  USER_LOG_IN_ATTEMPT,
  USER_LOG_IN_FAILURE,
  USER_LOG_IN_FORM_HIDE,
  USER_LOG_IN_FORM_SHOW,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
  USER_REGISTER
} from './actionTypes';

export const userLogin = ({ email, password }) => {
  return async dispatch => {
    dispatch(attempt());

    try {
      await axios.post(
        '/api/user/login',
        { email, password },
        { withCredentials: true }
      );
      dispatch(success());
    } catch (e) {
      console.error(e);
      dispatch(failure());
    }
  };
};

export const userSignup = ({ email, password, name }) => {
  return async dispatch => {
    try {
      await axios.post(
        '/api/user/signup',
        { email, password, name },
        { withCredentials: true }
      );
      dispatch(register());
    } catch (e) {
      console.error(e);
    }
  };
};

export const showLogin = () => {
  return async dispatch => {
    dispatch(show());
  };
};

export const hideLogin = () => {
  return async dispatch => {
    dispatch(hide());
  };
};

export const logOut = () => {
  return async dispatch => {
    dispatch(logout());
  };
};

export const toggleSidebar = () => {
  return async dispatch => {
    dispatch({type: TOGGLE_SIDEBAR});
  };
};

const hide = () => ({
  type: USER_LOG_IN_FORM_HIDE
});

const show = () => ({
  type: USER_LOG_IN_FORM_SHOW
});

const logout = () => ({
  type: USER_LOG_OUT
});

const attempt = () => ({
  type: USER_LOG_IN_ATTEMPT
});

const success = () => ({
  type: USER_LOG_IN_SUCCESS
});

const register = () => ({
  type: USER_REGISTER
});

const failure = () => ({
  type: USER_LOG_IN_FAILURE
});

export default {
  userLogin: userLogin,
  userSignup: userSignup,
  showLogin: showLogin,
  hideLogin: hideLogin,
  logOut: logOut,
  toggleSidebar,
};
