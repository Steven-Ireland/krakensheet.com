const nano = require('nano')('http://localhost:5984')
const sheetDB = nano.use('sheets');
const defaultChar = require('../blanksheet');
const uuid = require('uuid/v4');

const router = require('express').Router();

// const isLoggedIn = (req, res, next) => {
//     console.log(req.session);
//     if (req.session.user) {
//         return next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// router.use(isLoggedIn);

router.get('/', async (req, res) => {
    const { user } = req.session;
    if (!user) {
        res.sendStatus(401);
        return;
    }

    const sheetListQuery = {
        selector: {
            user: {
                "$eq": user._id
            }
        }
    };

    const sheets = await sheetDB.find(sheetListQuery);

    res.send(sheets.docs);       
});

router.get('/load/:sheetId', async (req, res) => {
    const { user } = req.session;
    if (!user) {
        res.sendStatus(401);
        return;
    }

    const {sheetId} = req.params;
    const sheetQuery = {
        selector: {
            user: {
                "$eq": user._id
            },
            _id: {
                "$eq": sheetId
            }
        }
    };

    const sheet = await sheetDB.find(sheetQuery);
    res.send(sheet.docs[0]);
});

router.get('/new', async (req, res) => {
    const { user } = req.session;
    if (!user) {
        res.sendStatus(401);
        return;
    }

    const newChar = { ...defaultChar };
    const id = uuid();

    await sheetDB.insert({
        character: newChar,
        user: user._id,
        _id: id,
    });

    const savedChar = await sheetDB.find({
        selector: {
            _id: {
                '$eq': id
            }
        }
    });

    res.send(savedChar.docs[0]);
});

router.get('/demo', async (req, res) => {
    res.send(defaultChar);
});

router.put('/', async (req, res) => {
    try {
        const { user } = req.session;
        const sheet = req.body;

        const response = await sheetDB.insert({
            ...sheet,
            updated: new Date().toISOString(),
        });
        res.send(response);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;