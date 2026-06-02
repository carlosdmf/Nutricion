const request = require('supertest');
const app = require('../server');

describe('Pruebas Smoke', () => {

  test('Servidor responde correctamente', async () => {

    const response = await request(app)
      .get('/');

    expect(response.statusCode)
      .toBe(200);

  });

  test('Login responde', async () => {

    const response = await request(app)
      .post('/login')
      .send({

        email: 'carlos@gmail.com',
        password: '12345'

      });

    expect(response.statusCode)
      .not.toBe(500);

  });

});