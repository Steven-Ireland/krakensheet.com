import './NavBar.scss';

import cx from 'classnames';
import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import userActions from '../../actions/userActions';

const NavBar = ({ margin = true }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const history = useHistory();

  const logOut = () => {
    dispatch(userActions.logOut());
    history.push('/');
  };

  const openApp = () => {
    history.push('/app');
  };

  return (
    <div className={cx('NavBar', { 'NavBar--noMargin': !margin })}>
      <div className="NavContent">
        <div className="Main">
          <div className="Brand" onClick={() => dispatch(userActions.toggleSidebar())}>
            Krakensheet
          </div>
        </div>
        <div className="MenuButtons">
          {!user.loggedIn && (
            <div onClick={() => dispatch(userActions.showLogin())}>Log In</div>
          )}
          {user.loggedIn && (
            <>
              <div onClick={openApp}>My Character Sheets</div>
              <div href="#" onClick={logOut}>
                Log Out
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
