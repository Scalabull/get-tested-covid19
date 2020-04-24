const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const db = require('../db/models')

router.post(
  '/add',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req, res) => {
    try {
      const errors = await validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).send()
      }

      const { email, password } = req.body
      const existinguser = await db.User.findOne({ where: { email } })
      if (existinguser) {
        return res.status(400).send()
      }

      const user = await db.User.build({ email, password })
      await user.save()
      res.status(201).send({ message: 'success' })
    } catch (error) {
      res.status(500).send()
    }
  }
)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'login_failure' })
    } else if (!user.correctPassword(password)) {
      return res.status(401).json({ error: 'login_failure' })
    }
    const token = user.generateToken()
    res.json({ token })
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.token = null
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/me', auth, (req, res) => {
  res.send({
    user: { email: req.user.email, disabled: req.user.disabled },
    token: req.user.token,
  })
})

router.patch(
  '/me',
  auth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
      'email',
      'password',
      'password_confirmation',
      'disabled',
    ]
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!isValidUpdate) {
      return res.status(400).send({ error: 'invalid_updates' })
    }

    if (
      req.body.password &&
      req.body.password !== req.body.password_confirmation
    ) {
      return res.status(400).send({ error: 'invalid_password_mismatch' })
    }

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]))
      await req.user.save()
      res.send({
        user: { email: req.user.email, disabled: req.user.disabled },
        token: req.user.token,
      })
    } catch (error) {
      res.status(500).send()
    }
  }
)

module.exports = router
