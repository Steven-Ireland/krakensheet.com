require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sessionstore = require('sessionstore');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('blah'));
app.use(express.json());

//         host: 'http://admin:admin@localhost',


app.use(session({
    store: sessionstore.createSessionStore({
        type: 'couchdb',
        dbName: 'sessions',
    }),
    secret: 'blah',
    proxy: true,
    
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    },
}));

app.use('/api/trait', require('./routes/trait'));
app.use('/api/user', require('./routes/user'));
app.use('/api/feat', require('./routes/feat'));
app.use('/api/spell', require('./routes/spell'));
app.use('/api/race', require('./routes/race'));
app.use('/api/sheet', require('./routes/sheet'));
app.use('/api/class', require('./routes/class'));
app.use('/api/feedback', require('./routes/feedback'));

app.listen(process.argv[process.argv.length - 1]);