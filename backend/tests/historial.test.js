// tests/historial.test.js

const request = require('supertest');
const app = require('../server');

describe('Historial', () => {

  test('Debe obtener historial', async () => {

    const res = await request(app)
      .get('/historial/26');

    expect(res.statusCode).toBe(200);

  });

});