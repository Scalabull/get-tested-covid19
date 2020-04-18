const request = require('supertest');
const app = require('./server');

describe('Base routes', () => {
    test('should respond to status ping', async () => {
        const response = await request(app).get('/ping').expect(200);
        expect(response.text).toBe('pong');
    });

    test('should respond with http status code 200 on wildcards', async () => {
        const response = await request(app).get('/asdf').expect(200);
        expect(response.text).toBe('v1');
    });
});
