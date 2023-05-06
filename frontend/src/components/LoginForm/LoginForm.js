import './LoginForm.scss';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Button, Checkbox, Input } from 'antd';
import React, { useState } from 'react';

const LoginForm = ({
  title,
  showName,
  showRememberMe,
  onSubmit,
  submitText = 'Log In'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="LoginForm">
      {title && <div className="TitleBar">{title}</div>}

      <Form className="FormContainer">
        {showName && (
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Your Name"
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Input
            prefix={<MailOutlined />}
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>

        <Form.Item>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>

        {showRememberMe && (
          <Checkbox className="Remember">Remember me</Checkbox>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="loginButton"
            onClick={() => onSubmit({ name, email, password })}>
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
