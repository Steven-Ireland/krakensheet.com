import './ContactUs.scss';

import { Button, Input, Result } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const ContactUs = () => {
  const [confirming, setConfirming] = useState(false);
  const [formData, setFormData] = useState({});

  const handleForm = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.subject && formData.message) {
      axios.post('/api/feedback', formData);
      setConfirming(true);

      setTimeout(() => {
        setConfirming(false);
        setFormData({});
      }, 6000);
    }
  };

  return (
    <div className="ContactUs">
      <div className="ContactUs-container Section">
        {confirming && (
          <Result
            status="success"
            title="Feedback Received"
            subTitle="We'll get back to you asap, check your email for a response soon!"
          />
        )}
        {!confirming && (
          <>
            <h2>Contact Us</h2>
            <p>
              Talk to us about anything. We'll do our best to respond or help as
              soon as possible
            </p>
            <Input name="subject" placeholder="Subject" onChange={handleForm} />
            <Input.TextArea
              name="message"
              placeholder="Message"
              onChange={handleForm}
            />
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
