const router = require('express').Router()

router.use('/inbound', require('./internal/inboundRoutes'))
router.use('/test-centers', require('./internal/testCenterRoutes'))
router.use(
  '/test-centers-staging',
  require('./internal/testCenterStagingRoutes')
)
router.use('/user-searches', require('./internal/userSearchesRoutes'))
router.use('/verified-test-centers', require('./internal/verifiedTestCenterRoutes'))
router.use('/unverified-test-centers', require('./internal/unverifiedTestCenterRoutes'))

module.exports = router
