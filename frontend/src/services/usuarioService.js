// =====================================
// USUARIO SERVICE
// =====================================

import axios from 'axios';

const API =
  'http://localhost:5000';

// =====================================
// OBTENER PERFIL
// =====================================

export async function obtenerPerfil(

  id

) {

  const response =
    await axios.get(

      `${API}/usuarios/${id}`

    );

  return response.data;

}