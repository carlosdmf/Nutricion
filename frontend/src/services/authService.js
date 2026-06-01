// =====================================
// AUTH SERVICE
// =====================================
//
// Maneja:
//
// ✅ Login
// ✅ Registro
// ✅ Usuarios

import axios from 'axios';

// =====================================
// URL BASE
// =====================================

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

// =====================================
// LOGIN
// =====================================

export async function loginUsuario(

  datos

) {

  const response =
    await axios.post(

      `${API}/login`,

      datos

    );

  return response.data;

}