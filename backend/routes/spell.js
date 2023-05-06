const lucene = require('../util/lucene')("http://localhost:5985/local/spells");
const router = require('express').Router();

router.get('/search', async (req, res) => {
    let query = req.query.spellName
        .split(' ')
        .map(spellNamePiece => 'name:' + spellNamePiece + "*")
        .join(' AND ');

    if (req.query.className) {
        query += ' AND ' + req.query.className + ":" + (req.query.casterLevel || "*");
    }
    
    const spells = await lucene.query('_design/spell', 'search', query);
    res.send(spells);
});

module.exports = router;