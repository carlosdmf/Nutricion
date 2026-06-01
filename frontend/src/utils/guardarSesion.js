// =====================================
// GUARDAR SESION
// =====================================

function guardarSesion(

  usuario

) {

  localStorage.setItem(

    'usuario',

    JSON.stringify(usuario)

  );

}

export default guardarSesion;