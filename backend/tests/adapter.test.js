const OpenRouterAdapter =
require('../adapters/OpenRouterAdapter');

describe('Adapter', () => {

  test('Debe crear instancia', () => {

    const adapter =
      new OpenRouterAdapter();

    expect(adapter)
      .toBeDefined();

  });

});