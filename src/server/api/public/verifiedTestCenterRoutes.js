const router = require('express').Router()
const db = require('../../db/models')

// TODO: add zip queries, remove /all query.
router.get('/', async (req, res) => {
  try {
    const allTestCenters = await db.VerifiedTestCenter.findAll()
    res.status(200).json(allTestCenters)
  } catch (error) {
    res.status(500).send()
  }
});

module.exports = router
