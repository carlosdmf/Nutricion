const DietaStrategy =
require('../strategies/DietaStrategy');

const BajarPesoStrategy =
require('../strategies/BajarPesoStrategy');

describe('DietaStrategy', () => {

  test('Debe ejecutar la estrategia', () => {

    const contexto =
      new DietaStrategy(
        new BajarPesoStrategy()
      );

    expect(
      contexto.generarPlan()
    ).toBeDefined();

  });

});