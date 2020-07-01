const router = require('express').Router()
const auth = require('../../middleware/auth')
const db = require('../../db/models')
const { Op } = require('sequelize')

router.get('/', auth, async (req, res) => {
  try {
    const allTestCenters = await db.PublicTestCenter.findAll()
    res.status(200).json(allTestCenters)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.get('/sourceDiffKey/:diffKeyStr', async (req, res)=>{
  try {
    const { diffKeyStr } = req.params
    const allTestCenters = await db.PublicTestCenter.findAll({where: {source_unver_diff_key: diffKeyStr}})
    res.status(200).json(allTestCenters)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.get('/addressTextSearch/:searchStr', async (req, res)=>{
  try {
    const { searchStr } = req.params
    const decodedSearchStr = decodeURI(searchStr);

    const matchedTestCenters = await db.PublicTestCenter.findAll({
      where: {
        address: {
          [Op.like]: '%' + decodedSearchStr + '%'
        }
      }
    });

    let resObj = {
      matchedTestCenters
    };
    if(matchedTestCenters && matchedTestCenters.length > 0){
      resObj.numRows = matchedTestCenters.length;
    }

    res.status(200).json(resObj)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { staging_row_id, google_place_id } = req.body

    if (!((staging_row_id === 0 || staging_row_id) && google_place_id)) {
      return res.status(400).send('staging_row_id and google_place_id must both be provided.');
    }

    const testCenterMatch = await db.PublicTestCenter.findOne(
    { where: 
        {
          [Op.or]: [
            { staging_row_id },
            { google_place_id }
          ]
        } 
    });

    if(testCenterMatch) {
      return res.status(400).send('This row is a duplicate of an existing Public test center row');
    }

    const testCenter = await db.PublicTestCenter.create(req.body)
    res.status(201).json(testCenter)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const testCenter = await db.PublicTestCenter.findOne({ where: { id } })
    if (!testCenter) {
      return res.status(404).send()
    }
    res.status(200).json(testCenter)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
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
    await db.PublicTestCenter.update(req.body, { where: { id } })
    res.status(204).send()
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await db.PublicTestCenter.update({public: false}, { where: { id } })
    res.status(204).end()
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
})

module.exports = router
