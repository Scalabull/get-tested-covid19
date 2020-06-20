
const router = require('express').Router()
const db = require('../../db/models')
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { zipToLatLng } = require('./utils/zipToLatLng');
const METERS_PER_MILE = 1609;
const SEARCH_RADIUS = 40 * METERS_PER_MILE;
const ZIP_RE = /^[0-9]{5}$/;

const PUBLIC_ATTRIBUTES = [
  'name',
  'address',
  'latitude',
  'longitude',
  'phone_number',
  'website',  
  'appointment_required',
  'doctor_screen_required_beforehand',
  'drive_thru_site',
  'facilities_provided'
]

router.get('/', async (req, res) => {
  try {
    const openCenters = await db.VerifiedTestCenter.findAll({
      where: { public: true },
      attributes: PUBLIC_ATTRIBUTES,
    })
    res.status(200).json(openCenters)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
})

router.get('/zip/:zipStr', async (req, res)=>{
  try {

    const { zipStr } = req.params
    const zipMatchFlag = ZIP_RE.test(zipStr);

    if (!zipMatchFlag) {
      console.error('Bad user input: ', zipStr);
      return res.status(400).send()
    }

    const zipLookupRes = await zipToLatLng(zipStr);
    if(!zipLookupRes){
      return res.status(400).send('Invalid zip code.');
    }

    const {latitude, longitude} = zipLookupRes;
    let testCenters = await performLatLngLookup(latitude, longitude);

    res.status(200).json({testCenters, coords: {latitude, longitude}});

    const searchData = {
      zip_code: zipStr,
      latitude: latitude,
      longitude: longitude,
      search_timestamp: new Date().getTime()
    };

    await db.UserSearch.create(searchData);
  } catch (error) {
    console.error('zip query error: ', error);
    res.status(500).send()
  }
})

router.get('/searchByUserLatLng', async (req, res)=>{
  try {

    const { latitude, longitude } = req.query;
    const parsedLat = Number.parseFloat(latitude);
    const parsedLng = Number.parseFloat(longitude);
    if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng) 
    || parsedLng < -180 || parsedLng > 180 || parsedLat > 90 || parsedLat < -90) { 
      console.error('Bad user input: ', {latitude, longitude});
      return res.status(400).send()
    }

    let testCenters = await performLatLngLookup(latitude, longitude);

    res.status(200).json({testCenters});

    const searchData = {
      latitude: latitude,
      longitude: longitude,
      is_geolocated_query: true,
      search_timestamp: new Date().getTime()
    };

    await db.UserSearch.create(searchData);
    
  } catch (error) {
    console.error('zip query error: ', error);
    res.status(500).send()
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const openCenter = await db.VerifiedTestCenter.findOne({
      where: { id, public: true },
      attributes: PUBLIC_ATTRIBUTES,
    })
    if (!openCenter) {
      return res.status(404).send()
    }
    res.status(200).json(openCenter)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
})

async function performLatLngLookup(latitude, longitude) {
  const location = sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`);
  const distance = sequelize.fn('ST_DistanceSphere', sequelize.col('geolocation'), location)

  const ATTRS = PUBLIC_ATTRIBUTES.concat([[distance, 'distance']])
  let testCenters = await db.VerifiedTestCenter.findAll({
    attributes: ATTRS,
    order: distance,
    where: sequelize.where(distance, { [Op.lt]: SEARCH_RADIUS }),
    limit: 250
  });

  return testCenters;
}

module.exports = router
