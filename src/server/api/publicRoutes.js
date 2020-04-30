const router = require('express').Router()

router.use('/test-centers', require('./public/testCenterRoutes'))

module.exports = router
