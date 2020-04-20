const request = require('supertest');
const app = require('../server');

describe('/auth route', () => {
    test('should respond not implemented', async () => {
        const response = await request(app).get('/auth').expect(200);
        expect(response.text).toBe('not implemented');
    });
});
