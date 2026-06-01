// =====================================
// USUARIO SERVICE
// =====================================

import axios from 'axios';

// =====================================
// API
// =====================================

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

// =====================================
// ACTUALIZAR PERFIL
// =====================================

export async function actualizarPerfil(

  id,
  datos

) {

  const response =
    await axios.put(

      `${API}/usuarios/${id}`,

      datos

    );

  return response.data;

}