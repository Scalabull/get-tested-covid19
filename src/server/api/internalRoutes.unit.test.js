const request = require('supertest');
const app = require('../server');

describe('/v1/internal route', () => {
    test('should respond not implemented', async () => {
        const response = await request(app).get('/v1/internal').expect(200);
        expect(response.text).toBe('not implemented');
    });
});
