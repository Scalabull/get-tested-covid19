const router = require('express').Router()
const db = require('../../db/models')
const { Op } = require('sequelize');
const TS_RE = /^[0-9]{13}$/;

//const auth = require('../../middleware/auth')

router.post('/', async (req, res) => {
  try {
    const { scrapedRows } = req.body

    if(!Array.isArray(scrapedRows) || scrapedRows.length === 0){
      return res.status(400).send('scrapedRows must be an array with at least one object.');
    }

    await db.Inbound.bulkCreate([{full_address: "abc 123"}]);

    res.status(201).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/fresh', async (req, res) => {
  try {
    const { since } = req.query;
    const sinceTs = parseInt(since);

    if (!TS_RE.test(since) && !isNaN(sinceTs)){
      return res.status(400).send('Bad timestamp.');
    }

    let freshRows = await db.Inbound.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(sinceTs)
        }
      }
    });
    res.status(200).json(freshRows)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/', async (req, res) => {
  try {
    let scrapedRows = await db.Inbound.findAll({});
    res.status(200).json(scrapedRows);
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
