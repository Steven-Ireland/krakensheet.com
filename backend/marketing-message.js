require('dotenv').config();
const nano = require('nano')('http://localhost:5984');
const userDB = nano.use('users');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const args = process.argv.slice(2);
const template_id = args[0];

(async () => {
  const users = await userDB.find({selector: {}, fields: ['email'], limit: 5000});
  const emails = users.docs.map(user => user.email);

  const msg = {
    to: emails,
    from: 'noreply@krakensheet.com',
    template_id
  };
  sgMail.sendMultiple(msg);
})();