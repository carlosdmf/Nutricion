// =====================================
// OBTENER SESION
// =====================================

function obtenerSesion() {

  return JSON.parse(

    localStorage.getItem(

      'usuario'

    )

  );

}

export default obtenerSesion;