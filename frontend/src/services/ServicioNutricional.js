import axios from 'axios';

const API = 'http://localhost:5000';

export const ServicioNutricional = {

  obtenerRecetas: async (datos) => {

    const respuesta = await axios.post(
      `${API}/recetas`,
      datos
    );

    return respuesta.data;
  }

};