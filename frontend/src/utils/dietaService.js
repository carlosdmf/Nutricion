// =====================================
// DIETA SERVICE
// =====================================

import axios from 'axios';

const API =
  'http://localhost:5000';

// =====================================
// GENERAR DIETA
// =====================================

export async function generarDieta(

  datos

) {

  const response =
    await axios.post(

      `${API}/plan-nutricional`,

      datos

    );

  return response.data;

}