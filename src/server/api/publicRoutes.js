const router = require('express').Router()

router.use('/test-centers', require('./public/testCenterRoutes'))
router.use('/verified-test-centers', require('./public/verifiedTestCenterRoutes'))

module.exports = router
