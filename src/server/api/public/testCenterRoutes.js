const router = require('express').Router()
const db = require('../../db/models')
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { zipToLatLng } = require('./utils/zipToLatLng');
const METERS_PER_MILE = 1609;
const SEARCH_RADIUS = 40 * METERS_PER_MILE;

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

router.get('/zip/:zipStr', async (req, res)=>{
  try {

    const { zipStr } = req.params
    const {latitude, longitude} = await zipToLatLng(zipStr);
    const location = sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`);
    const distance = sequelize.fn('ST_DistanceSphere', sequelize.col('geolocation'), location)

    //get the textcenters from database using lat and lng
    let testCenters = await db.TestCenter.findAll({
      attributes: {
        include: [
          [distance, 'distance']
        ]
      },
      order: distance,
      where: sequelize.where(distance, { [Op.lt]: SEARCH_RADIUS }),
      limit: 250
    });
    /*
    attributes: {
        include: [
          [sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(latitude)) * cos(radians("+longitude+") - radians(longitude)) + sin(radians("+latitude+")) * sin(radians(latitude)))"),'distance']
        ]
      },
      order: sequelize.col('distance'),
    */
/*
    testCenters = testCenters.filter(testCenter => {
      return testCenter.get('distance') <= 40;
    });*/

    res.status(200).json({testCenters});
  } catch (error) {
    console.error('error ', error);
    res.status(500).send()
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const openCenter = await db.TestCenter.findOne({
      where: { id, public: true },
      attributes,
    })
    if (!openCenter) {
      return res.status(404).send()
    }
    res.status(200).json(openCenter)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
