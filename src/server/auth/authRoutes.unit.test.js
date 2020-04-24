const request = require('supertest')
const app = require('../server')
const db = require('../db/models')

describe('User API Routes', () => {
  beforeEach(() => {})

  test('should respond with a 400', async () => {
    await request(app).post('/api/v1/auth/signup').expect(400)
  })
})
