const request = require('supertest')
const app = require('../server')
const db = require('../db/models')

const initUserDatabase = async () => {
  await db.User.destroy({ where: {}, truncate: true })
  const user = await db.User.build({
    email: 'chris.jordan@test.com',
    password: 'chrisjordanpasswd',
  })
  user.save()
}

describe('User Auth API Routes', () => {
  let user
  beforeEach(() => {
    initUserDatabase()
    user = {
      email: 'test@testuser.com',
      password: 'password',
    }
  })

  test('should add a new user with valid email and password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/add')
      .send({
        email: 'test@testuser.com',
        password: 'password',
      })
      .expect(201)

    const user = await db.User.findOne({
      where: { email: 'test@testuser.com' },
    })
    expect(user).not.toBeNull()
    expect(response.body).toEqual({ message: 'success' })
  })

  test('should respond with a 400', async () => {
    await request(app).post('/api/v1/auth/add').expect(400)
  })

  test('should meet email validation requirements', async () => {
    await request(app)
      .post('/api/v1/auth/add')
      .send({
        email: 'test',
        password: 'password',
      })
      .expect(400)
  })

  test('should meet password validation requirements', async () => {
    await request(app)
      .post('/api/v1/auth/add')
      .send({
        email: 'test@testuser.com',
        password: 'pass',
      })
      .expect(400)
  })

  test('should login existing user', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'chris.jordan@test.com',
        password: 'chrisjordanpasswd',
      })
      .expect(200)
  })
})
