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

    db.Inbound.bulkCreate(scrapedRows)
    res.status(201).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/fresh', async (req, res) => {
  try {
    const { since } = req.query;

    if (!TS_RE.test(since)){
      return res.status(400).send('Bad timestamp.');
    }

    let freshRows = db.Inbound.findAll({
      createdAt: {
        [Op.gt]: new Date(since)
      }
    });
    res.status(200).json(freshRows)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
