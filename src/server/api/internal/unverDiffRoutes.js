const router = require('express').Router()
const db = require('../../db/models')
const { Op } = require('sequelize');
const TS_RE = /^[0-9]{13}$/;

const auth = require('../../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    let unverDiffRecords = await db.UnverDiff.findAll({});
    res.status(200).json(unverDiffRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

module.exports = router
