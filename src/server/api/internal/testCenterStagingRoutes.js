const router = require('express').Router()
const auth = require('../../middleware/auth')
const db = require('../../db/models')
const { Op } = require('sequelize');
const TS_RE = /^[0-9]{13}$/;

router.get('/', auth, async (req, res) => {
  try {
    const allTestCenters = await db.TestCenterStaging.findAll()
    res.status(200).json(allTestCenters)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    if((req.body.inbounds_id || req.body.inbounds_id === 0) && !isNaN(parseInt(req.body.inbounds_id))){
      const existingTestCenter = await db.TestCenterStaging.findOne({ where: {inbounds_id: parseInt(req.body.inbounds_id)}});
      if(existingTestCenter){
        return res.status(201).json({status: 'Row with this inbounds_id already exists, skipping.'});
      } 
      else {
        const testCenter = await db.TestCenterStaging.create(req.body)
        res.status(201).json(testCenter)
      }
    } else {
      return res.status(400).send('Must include inbounds_id in request.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const testCenter = await db.TestCenterStaging.findOne({ where: { id } })
    if (!testCenter) {
      return res.status(404).send()
    }
    res.status(200).json(testCenter)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

//NOTE: It's not currently recommended to use this endpoint, but we are leaving this in place just in case it becomes relevant
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'public',
    'name',
    'location',
    'address',
    'city',
    'state',
    'zipcode',
    'latitude',
    'longitude',
    'phone_number',
    'hours_of_operation',
    'days_of_operation',
    'operation_period',
    'website',
    'appointment_required',
    'doctor_screen_required_beforehand',
    'drive_thru_site',
    'walk_in_site',
    'facilities_provided',
    'estimated_daily_test_capacity',
    'comments',
    'address_freetext_blob',
    'closed',
    'date_closed',
  ]

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'invalid_updates' })
  }

  try {
    const { id } = req.params
    await db.TestCenterStaging.update(req.body, { where: { id } })
    res.status(204).send()
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await db.TestCenterStaging.destroy({ where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.get('/fresh', auth, async (req, res) => {
  try {
    const { since } = req.query;
    const sinceTs = parseInt(since);

    if (!TS_RE.test(since) && !isNaN(sinceTs)){
      return res.status(400).send('Bad timestamp.');
    }

    let freshRows = await db.TestCenterStaging.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(sinceTs)
        }
      }
    });
    res.status(200).json(freshRows)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

module.exports = router
