const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const ADMIN_EMAIL='steven@krakensheet.com';

const sendFeedback = ({user, feedback}) => {
    if (!process.env.SENDGRID_API_KEY) {
        return;
    }

    const userMessage = {
        to: user.email,
        from: 'contact@krakensheet.com',
        template_id: 'd-87452366d9294481b47b645cbd380fe8'
    };
    sgMail.send(userMessage);

    const adminMessage = {
        to: ADMIN_EMAIL,
        from: 'noreply@krakensheet.com',
        subject: `Feedback Received from <${user.email}>`,
        text: `Subject: ${feedback.subject}\n\nMessage: ${feedback.message}`,
    }
    sgMail.send(adminMessage);
};

router.post('/', (req, res) => {
    const feedback = req.body;
    const {user} = req.session;

    if (user) {
        sendFeedback({user, feedback});
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;