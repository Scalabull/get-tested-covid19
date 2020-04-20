const request = require('supertest');
const app = require('../server');

describe('/v1/public route', () => {
    test('should respond not implemented', async () => {
        const response = await request(app).get('/v1/public').expect(200);
        expect(response.text).toBe('not implemented');
    });
});
