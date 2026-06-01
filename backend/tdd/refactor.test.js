class GeneradorDieta {

  generar(tipo) {

    const planes = {

      vegetariana:
        "Plan de dieta vegetariana",

      muscular:
        "Plan para ganar músculo",

      perderpeso:
        "Plan para bajar peso"

    };

    return planes[tipo];

  }

}

describe('TDD - Refactor', () => {

  test('plan vegetariano', () => {

    const dieta =
      new GeneradorDieta();

    expect(
      dieta.generar('vegetariana')
    )
    .toBe(
      'Plan de dieta vegetariana'
    );

  });

});