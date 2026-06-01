const axios = require('axios');

const IAAdapter =
require('./IAAdapter');

class OpenRouterAdapter
extends IAAdapter {

  // =====================================
  // TEXTO NORMAL
  // =====================================

  async generarRespuesta(prompt) {

    return await this.generarRespuestaTexto(
      prompt
    );

  }

  async generarRespuestaTexto(prompt) {

    try {

      const respuesta =
        await axios.post(

          'https://openrouter.ai/api/v1/chat/completions',

          {

            model:
              'openai/gpt-4o-mini',

            messages: [

              {

                role: 'user',

                content: prompt

              }

            ]

          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              'Content-Type':
                'application/json'

            }

          }

        );

      return respuesta.data
        .choices[0]
        .message
        .content;

    }

    catch (error) {

      console.log(error);

      return 'Error con OpenRouter';

    }

  }

  // =====================================
  // ANALISIS DE IMAGEN
  // =====================================

  async generarRespuestaImagen(base64) {

    try {

      const respuesta =
        await axios.post(

          'https://openrouter.ai/api/v1/chat/completions',

          {

            model:
              'openai/gpt-4o-mini',

            messages: [

              {

                role: 'user',

                content: [

                  {

                    type: 'text',

                    text: `Eres un nutricionista experto. Describe detalladamente los alimentos que ves en esta imagen e indica: nombre del alimento, calorías aproximadas, proteínas, carbohidratos, grasas y una recomendación nutricional. Responde en español.`

                  },

                  {

                    type: 'image_url',

                    image_url: {

                      url:
                        `data:image/jpeg;base64,${base64}`

                    }

                  }

                ]

              }

            ]

          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              'Content-Type':
                'application/json'

            }

          }

        );

      return respuesta.data
        .choices[0]
        .message
        .content;

    }

    catch (error) {

      console.log(error.response?.data || error);

      return 'Error analizando imagen';

    }

  }

}

module.exports =
  OpenRouterAdapter;