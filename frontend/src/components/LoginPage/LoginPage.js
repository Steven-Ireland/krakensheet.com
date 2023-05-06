import './LoginPage.scss';

import userActions from 'actions/userActions';
import LoginForm from 'components/LoginForm';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const login = async loginInfo => {
    await dispatch(userActions.userLogin(loginInfo));
    const nextPage = location.state ? location.state.from : '/app';
    history.push(nextPage);
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage-container">
        <h1>Krakensheet Login</h1>
        <div className="LoginPage-loginContainer">
          <LoginForm title="Login" onSubmit={login} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
