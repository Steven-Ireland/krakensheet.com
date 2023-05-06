import './UserManager.css';

import { Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import userActions from '../../actions/userActions';
import LoginForm from '../LoginForm';

class UserManager extends Component {
  render() {
    return (
      <div className="UserManager Floaty">
        <Modal
          className="LogInModal"
          visible={!this.props.user.loggedIn && this.props.user.showLogin}
          onCancel={this.closeLoginForm}
          closable={false}
          footer={null}>
          <LoginForm
            title="Log In"
            submitText="Log In"
            onSubmit={this.login}
            showRememberMe={true}
          />
        </Modal>
      </div>
    );
  }

  showLoginForm = () => {
    const { dispatch } = this.props;
    dispatch(userActions.showLogin());
  };

  closeLoginForm = () => {
    const { dispatch } = this.props;
    dispatch(userActions.hideLogin());
  };

  login = async loginInfo => {
    const { dispatch } = this.props;
    await dispatch(userActions.userLogin(loginInfo));
    this.props.history.push(`/app`);
  };
}

export default withRouter(
  connect(state => ({ user: state.user }))(UserManager)
);
