const router = require('express').Router()
const auth = require('../middleware/auth')

router.use('/inbound', require('./internal/inboundRoutes'))
router.use('/test-centers', require('./internal/testCenterRoutes'))
router.use(
  '/test-center-staging',
  require('./internal/testCenterStagingRoutes')
)
router.use('/user-searches', require('./internal/userSearchesRoutes'))

module.exports = router
