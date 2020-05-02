const router = require('express').Router()
const auth = require('../../middleware/auth')
const db = require('../../db/models')

router.get('/', auth, async (req, res) => {
  try {
    const allTestCenters = await db.TestCenter.findAll()
    res.status(200).json(allTestCenters)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/:zipStr', auth, async (req, res)=>{
  try {
    //geo coding api
    //get lat & lng
    const { zipStr } = req.params
    await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+zipStr+'&key=AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg')
    .then(response => response.json())
    .then(data => {
      const latitude = data.results[0].geometry.location.lat;
      const longitude = data.results[0].geometry.location.lng;
      console.log({latitude, longitude})
    })
    //get the textcenters from database using lat and lng
    const testCenters = await db.TestCenter.findAll({
      attributes: [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(latitude)) * cos(radians("+lng+") - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance']], //Haversine Formula for more accuracy
    order: sequelize.col('distance'),
    limit: 250
    })
    res.status(200).json(testCenters)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const testCenter = await db.TestCenter.create(req.body)
    res.status(201).json(testCenter)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const testCenter = await db.TestCenter.findOne({ where: { id } })
    if (!testCenter) {
      return res.status(404).send()
    }
    res.status(200).json(testCenter)
  } catch (error) {
    res.status(500).send()
  }
})

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
    await db.TestCenter.update(req.body, { where: { id } })
    res.status(204).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await db.TestCenter.destroy({ where: { id } })
    res.status(204).end()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
