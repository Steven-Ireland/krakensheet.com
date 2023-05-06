const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'steven.ireland@protonmail.com',
  from: 'noreply@krakensheet.com',
  template_id: 'd-fcbff40074e447639064e7157b7e8a16'
};
sgMail.send(msg);