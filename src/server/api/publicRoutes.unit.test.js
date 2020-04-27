const request = require('supertest')
const app = require('../server')

describe('/api/v1/public route', () => {
  test('should respond not implemented', async () => {
    const response = await request(app).get('/api/v1/public').expect(200)
    expect(response.text).toBe('not implemented')
  })
})
