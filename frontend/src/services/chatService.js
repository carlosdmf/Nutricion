// =====================================
// CHAT IA SERVICE
// =====================================

import axios from 'axios';

const API =
  'http://localhost:5000';

// =====================================
// ENVIAR MENSAJE IA
// =====================================

export async function enviarPregunta(

  mensaje

) {

  const response =
    await axios.post(

      `${API}/chat-nutricional`,

      {

        mensaje

      }

    );

  return response.data;

}