describe('Usuario', () => {

  test('Debe tener nombre', () => {

    const usuario = {

      nombre: 'Carlos',
      edad: 22

    };

    expect(usuario.nombre)
      .toBe('Carlos');

  });

});