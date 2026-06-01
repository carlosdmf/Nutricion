const BajarPesoStrategy =
require('../strategies/BajarPesoStrategy');

const GanarMusculoStrategy =
require('../strategies/GanarMusculoStrategy');

const MantenerPesoStrategy =
require('../strategies/MantenerPesoStrategy');

describe('Strategies', () => {

  test('BajarPesoStrategy genera plan', () => {

    const estrategia =
      new BajarPesoStrategy();

    expect(
      estrategia.generar()
    ).toContain('BAJAR DE PESO');

  });

  test('GanarMusculoStrategy genera plan', () => {

    const estrategia =
      new GanarMusculoStrategy();

    expect(
      estrategia.generar()
    ).toContain('GANAR MÚSCULO');

  });

  test('MantenerPesoStrategy genera plan', () => {

    const estrategia =
      new MantenerPesoStrategy();

    expect(
      estrategia.generar()
    ).toContain('MANTENER PESO');

  });

});