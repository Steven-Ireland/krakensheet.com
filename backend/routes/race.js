const nano = require('nano')('http://localhost:5984')
const raceDB = nano.use('races');

const router = require('express').Router();

router.get('/search/:raceName', async (req, res) => {
    const query = {
        selector: {
            name: {
                "$regex": `(?i)${req.params.raceName}`
            }
        },
        fields: ['name', 'copyright', 'category', 'features'],
    };

    const results = await raceDB.find(query);
    res.send(results.docs);
});

router.get('/', async (req, res) => {
    const query = {
        selector: {
            name: {
                "$exists": true,
            }
        },
        fields: ['name', 'copyright', 'category', 'features'],
        limit: 100
    };

    const results = await raceDB.find(query);
    res.send(results.docs);
});

module.exports = router;