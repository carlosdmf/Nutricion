const request = require('supertest');
const app = require('../server');

describe('Prueba Stress', () => {

  test('50 peticiones simultáneas al servidor', async () => {

    const peticiones = [];

    for (let i = 0; i < 50; i++) {

      peticiones.push(

        request(app)
          .get('/')

      );

    }

    const resultados =
      await Promise.all(peticiones);

    resultados.forEach((respuesta) => {

      expect(respuesta.statusCode)
        .toBe(200);

    });

  });

});