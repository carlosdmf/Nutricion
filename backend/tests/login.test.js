// tests/login.test.js

const request = require('supertest');
const app = require('../server');

describe('Login', () => {

  test('Debe devolver error con datos falsos', async () => {

    const res = await request(app)
      .post('/login')
      .send({

        email: 'fake@test.com',
        password: '123'

      });

    expect(res.statusCode).toBe(401);

  });

});