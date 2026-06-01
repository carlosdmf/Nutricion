// tests/dieta.test.js

const request = require('supertest');
const app = require('../server');

describe('Dietas', () => {

  test('Debe obtener dieta activa', async () => {

    const res = await request(app)
      .get('/dietas/26');

    expect(res.statusCode).toBe(200);

  });

});