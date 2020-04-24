const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const compression = require('compression')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const db = require('./db/models/index')
require('dotenv').config(process.cwd(), '.env')

const port = process.env.API_PORT

const authRouter = require('./auth/authRoutes')
const internalRouter = require('./api/internalRoutes')
const publicRouter = require('./api/publicRoutes')

const app = express()

// in the event we use nginx
// app.set('trust proxy', true);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'))

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)

app.use(compression())
app.use(helmet())

app.get('/ping', (req, res) => res.status(200).send('pong'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/internal', internalRouter)
app.use('/api/v1/public', publicRouter)
app.use('*', (req, res) => res.send('v1'))

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

async function syncDatabase() {
  try {
    await db.sequelize.sync()
    console.log(`Connected to database ${db.sequelize.config.database} ...`)
  } catch (error) {
    console.error('Unable to connect to databae:', error)
  }
}

function startListening() {
  syncDatabase()
  const server = app.listen(port, () => {
    console.log(`Server listening port ${port}...`)
  })

  const io = socketio(server)
  require('./socket/socket')(io)
}

if (require.main === module) {
  startListening()
}

module.exports = app
