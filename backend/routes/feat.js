const lucene = require('../util/lucene')("http://localhost:5985/local/feats");
const router = require('express').Router();

router.get('/search/:feat', async (req, res) => {

    const query = req.params.feat
        .split(' ')
        .map(f => 'name:' + f + "*")
        .join(' AND ');

    const feats = await lucene.query('_design/feat', 'search', query);

    res.send(feats);
});

module.exports = router;