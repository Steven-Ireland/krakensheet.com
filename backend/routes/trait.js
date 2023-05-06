const lucene = require('../util/lucene')("http://localhost:5985/local/traits");
const router = require('express').Router();

router.get('/search/:trait', async (req, res) => {

    const query = req.params.trait
        .split(' ')
        .map(f => 'name:' + f + "*")
        .join(' AND ');

    const traits = await lucene.query('_design/trait', 'search', query);

    res.send(traits);
});

module.exports = router;