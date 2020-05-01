const jwt = require('jsonwebtoken')
const db = require('../db/models')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.User.findOne({
      where: { id: decoded.user_id, token },
    })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'authentication_required' })
  }
}

module.exports = auth
