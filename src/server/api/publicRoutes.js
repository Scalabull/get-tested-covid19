const router = require('express').Router()

router.use('/test-centers', require('./public/testCenterRoutes'))
router.use('/public-test-centers', require('./public/publicTestCenterRoutes'))

module.exports = router
