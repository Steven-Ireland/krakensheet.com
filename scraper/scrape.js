const ClassScraper = require('./src/ClassScraper');
const FeatScraper = require('./src/FeatScraper');
const TraitScraper = require('./src/TraitScraper');
const RaceScraper = require('./src/RaceScraper');
const SpellScraper = require('./src/SpellScraper');
const Crawler = require('crawler');
const nano = require('nano')('http://localhost:5984');
const classesDB = nano.use('classes');
const featDB = nano.use('feats');
const traitDB = nano.use('traits');
const raceDB = nano.use('races');
const spellDB = nano.use('spells');

const classCrawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
      done();
    } else {
      const thisClass = ClassScraper.parseClass(res.request.uri.href, res.$);

      const existingClassQuery = {
        selector: {
          name: {
            $eq: thisClass.name
          }
        }
      };

      const existingClasses = await classesDB.find(existingClassQuery);
      const existingClass = existingClasses.docs[0];

      if (existingClass) {
        classesDB.insert({
          _id: existingClass._id,
          _rev: existingClass._rev,
          ...thisClass
        });
      } else {
        classesDB.insert(thisClass);
      }

      done();
    }
  }
});

const featCrawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const feat = FeatScraper.parseFeat(res.request.uri.href, res.$);

      const existingFeatQuery = {
        selector: {
          name: {
            $eq: feat.name
          },
          category: {
            $eq: feat.category
          }
        }
      };

      const existingFeats = await featDB.find(existingFeatQuery);
      const existingFeat = existingFeats.docs[0];

      if (existingFeat) {
        featDB.insert({
          _id: existingFeat._id,
          _rev: existingFeat._rev,
          ...feat
        });
      } else {
        featDB.insert(feat);
      }
    }
    done();
  }
});

const traitCrawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const trait = TraitScraper.parseTrait(res.request.uri.href, res.$);

      const existingTraitQuery = {
        selector: {
          name: {
            $eq: trait.name
          },
          category: {
            $eq: trait.category
          }
        }
      };

      const existingTraits = await traitDB.find(existingTraitQuery);
      const existingTrait = existingTraits.docs[0];

      if (existingTrait) {
        traitDB.insert({
          _id: existingTrait._id,
          _rev: existingTrait._rev,
          ...trait
        });
      } else {
        traitDB.insert(trait);
      }
    }
    done();
  }
});

const raceCrawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const race = RaceScraper.parseRace(res.request.uri.href, res.$);

      const existingRaceQuery = {
        selector: {
          name: {
            $eq: race.name
          },
          category: {
            $eq: race.category
          }
        }
      };

      const existingRaces = await raceDB.find(existingRaceQuery);
      const existingRace = existingRaces.docs[0];

      if (existingRace) {
        raceDB.insert({
          _id: existingRace._id,
          _rev: existingRace._rev,
          ...race
        });
      } else {
        raceDB.insert(race);
      }
    }
    done();
  }
});

const spellCrawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: async function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const spells = SpellScraper.parseSpell(res.request.uri.href, res.$);

      const existingSpellQueryFn = ({name, href}) => ({
        selector: {
          name: {
            $eq: name
          },
          href: {
            $eq: href
          }
        }
      });

      for (let spell of spells) {
        const spellQuery = existingSpellQueryFn(spell);
        const existingSpells = await spellDB.find(spellQuery);
        const existingSpell = existingSpells.docs[0];

        if (existingSpell) {
          spellDB.insert({
            _id: existingSpell._id,
            _rev: existingSpell._rev,
            ...spell,
          });
        } else {
          spellDB.insert(spell);
        }
      }
    }
    done();
  }
});

const args = process.argv.slice(2);
const shouldScrapeClasses = args.indexOf('--class') > -1;
const shouldScrapeFeats = args.indexOf('--feat') > -1;
const shouldScrapeTraits = args.indexOf('--trait') > -1;
const shouldScrapeRaces = args.indexOf('--race') > -1;
const shouldScrapeSpells = args.indexOf('--spell') > -1;

if (shouldScrapeClasses) {
  ClassScraper.scrape(classCrawler);
}

if (shouldScrapeFeats) {
  FeatScraper.scrape(featCrawler);
}

if (shouldScrapeTraits) {
  TraitScraper.scrape(traitCrawler);
}

if (shouldScrapeRaces) {
  RaceScraper.scrape(raceCrawler);
}

if (shouldScrapeSpells) {
  SpellScraper.scrape(spellCrawler);
}
