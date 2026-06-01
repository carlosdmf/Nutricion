describe('TDD - Fase Verde', () => {

  function generarPlan() {

    return "Plan de dieta vegetariana";

  }

  test('debería generar plan vegetariano', () => {

    expect(generarPlan())
      .toBe("Plan de dieta vegetariana");

  });

});