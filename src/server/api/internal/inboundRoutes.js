const router = require('express').Router()
const db = require('../../db/models')

router.post('/', async (req, res) => {
  try {
    const testCenters = req.body
    db.Inbound.bulkCreate(testCenters)
    res.status(201).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/', async (req, res) => {
  res.send('inbound')
})

module.exports = router
