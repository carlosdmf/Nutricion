// =====================================
// AUTH SERVICE
// =====================================

import axios from 'axios';

const API =
  'http://localhost:5000';

// =====================================
// REGISTRO
// =====================================

export async function registrarUsuario(

  datos

) {

  const response =
    await axios.post(

      `${API}/usuarios/registro`,

      datos

    );

  return response.data;

}