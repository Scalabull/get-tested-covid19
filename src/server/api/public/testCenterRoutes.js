const router = require('express').Router()
const db = require('../../db/models')

const attributes = [
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
]

router.get('/', async (req, res) => {
  try {
    const openCenters = await db.TestCenter.findAll({
      where: { public: true },
      attributes,
    })
    res.status(200).json(openCenters)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
