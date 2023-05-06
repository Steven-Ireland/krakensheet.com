import './DemoSignup.scss';

import { saveSheet, unloadSheet } from 'actions/sheetActions';
import userActions from 'actions/userActions';
import { Modal, message, notification } from 'antd';
import axios from 'axios';
import LoginForm from 'components/LoginForm/LoginForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DemoSignup = () => {
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const character = useSelector(state => state.sheet.character);

  useEffect(() => {
    notification.info({
      message: 'Welcome to the Demo',
      description: (
        <>
          You are in demo mode where saving is disabled.{' '}
          <a onClick={() => setShowSignup(true)}>Create an account</a> to save
          this sheet
        </>
      ),
      placement: 'bottomLeft',
      duration: null,
      closeIcon: <></>
    });
  }, []);

  const signup = async ({ email, name, password }) => {
    try {
      await dispatch(
        userActions.userSignup({
          email,
          name,
          password
        })
      );

      // create new sheet
      const newSheet = await axios.get('/api/sheet/new', {
        withCredentials: true
      });
      newSheet.data.character = character;

      // Save it
      await dispatch(saveSheet(newSheet.data));
      dispatch(unloadSheet());

      // and load it
      history.push(`/app/character/${newSheet.data._id}`);
      notification.destroy();
    } catch (e) {
      // :internal-screaming-intensifies:
      message.error('Something went wrong');
    }
  };

  return (
    <Modal
      className="DemoSignup"
      visible={showSignup}
      onCancel={() => setShowSignup(false)}
      closable={false}
      footer={null}>
      <LoginForm
        title="Sign Up!"
        showName={true}
        submitText="Register"
        onSubmit={signup}
      />
    </Modal>
  );
};

export default DemoSignup;
