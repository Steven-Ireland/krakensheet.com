const nano = require('nano')('http://localhost:5984')
const usersDB = nano.use('users');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const emailValidator = require('email-validator');
const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const ADMIN_EMAIL='steven@krakensheet.com';

const sendWelcomeEmail = ({email}) => {
    if (!process.env.SENDGRID_API_KEY) {
        return;
    }

    const msg = {
        to: email,
        from: 'noreply@krakensheet.com',
        template_id: 'd-fcbff40074e447639064e7157b7e8a16'
    };
    sgMail.send(msg);

    const adminMessage = {
        to: ADMIN_EMAIL,
        from: 'noreply@krakensheet.com',
        subject: `New Subscriber <${email}>`,
        text: `${email} just signed up!`,
    }
    sgMail.send(adminMessage);
};

router.post('/signup', async (req, res) => {
    const {email, password, name} = req.body;

    if (!emailValidator.validate(email)) {
        res.sendStatus(400);
        return;
    }

    const findUserQuery = {
        selector: {
            email: {
                "$eq": email.toLowerCase()
            }
        }
    };

    const existingUsers = await usersDB.find(findUserQuery);
    if (existingUsers.docs.length > 0) {
        res.sendStatus(403);
    } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const newUser = {
                email: email.toLowerCase(),
                name,
                hash,
                created: new Date().toISOString(),
            };
            await usersDB.insert(newUser);
            sendWelcomeEmail({email});
            
            const insertedUserDocs = await usersDB.find(findUserQuery);
            const insertedUser = insertedUserDocs.docs[0];
            req.session.user = insertedUser;
            res.send({
                id: insertedUser._id,
                email: insertedUser.email,
                expires: req.session.cookie.maxAge, 
            });
        });
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const findUserQuery = {
        selector: {
            email: {
                "$eq": email.toLowerCase()
            }
        }
    };

    const existingUsers = await usersDB.find(findUserQuery);
    console.log(existingUsers);
    if (existingUsers.docs.length == 1) {
        const existingUser = existingUsers.docs[0];
        bcrypt.compare(password, existingUser.hash, async (err, matches) => {
            if (matches) {
                await usersDB.insert({
                    ...existingUser,
                    accessed: new Date().toISOString(),
                });

                req.session.user = existingUser;
                res.send({
                    id: existingUser._id,
                    email: existingUser.email,
                    expires: req.session.cookie.maxAge, 
                });
            } else {
                res.sendStatus(401)
            }
        });    
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;