const parseUtils = require('./sharedparsing');
const axios = require('axios');
const cheerio = require('cheerio');

test('Copyright is parsed successfully', async () => {
  const page = await axios.get(
    'https://www.d20pfsrd.com/traits/regional-traits/anuli-engineer-regional/'
  );
  const $ = cheerio.load(page.data);

  expect(parseUtils.parseCopyright($)).toBe(
    'Pathfinder Campaign Setting: Distant Shores © 2015, Paizo Inc.; ' +
      'Authors: John Compton, Adam Daigle, Crystal Frasier, Amanda Hamon Kunz, ' +
      'Rob McCreary, Mark Moreland, James L. Sutter, and Owen K.C. Stephens.'
  );
});
