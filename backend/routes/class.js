const nano = require('nano')('http://localhost:5984')
const classesDB = nano.use('classes');

const router = require('express').Router();

router.get('/search/:className', async (req, res) => {
    const query = {
        selector: {
            name: {
                "$regex": `(?i)${req.params.className}`
            }
        },
        fields: ['name', 'href', 'hitDie', 'skillPointsPerLevel', 'copyright', 'category', 'flavor', 'features', 'skills', 'progression']
    };

    const results = await classesDB.find(query);
    res.send(results.docs);
});

router.get('/', async (req, res) => {
    const query = {
        selector: {
            name: {
                "$exists": true,
            }
        },
        fields: ['name', 'href', 'hitDie', 'skillPointsPerLevel', 'copyright', 'category', 'flavor', 'features', 'skills', 'progression'],
        limit: 100
    };

    const results = await classesDB.find(query);
    res.send(results.docs);
});

module.exports = router;