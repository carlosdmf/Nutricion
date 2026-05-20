const express = require('express');

const cors = require('cors');

const db = require('./db');

const axios = require('axios');

require('dotenv').config();

// =====================================
// EXPRESS
// =====================================

const app = express();

app.use(cors());

app.use(express.json());

// =====================================
// RUTA PRINCIPAL
// =====================================

app.get('/', (req, res) => {

  res.send(
    'Servidor funcionando correctamente'
  );

});

// =====================================
// REGISTRO DE USUARIO
// =====================================

app.post(
  '/usuarios/registro',
  (req, res) => {

    const {
      nombre,
      email,
      password,
      edad,
      peso,
      altura,
      objetivo
    } = req.body;

    const sql = `
      INSERT INTO usuarios
      (
        nombre,
        email,
        password,
        edad,
        peso,
        altura,
        objetivo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        nombre,
        email,
        password,
        edad,
        peso,
        altura,
        objetivo
      ],
      (err, result) => {

        if (err) {

          console.log(
            'ERROR MYSQL:',
            err
          );

          return res.status(500).json({

            mensaje:
              'Error al registrar usuario'

          });

        }

        res.status(201).json({

          mensaje:
            'Usuario registrado correctamente',

          id:
            result.insertId

        });

      }
    );

  }
);

// =====================================
// IA NUTRICIONAL
// =====================================

app.post(
  '/plan-nutricional',
  async (req, res) => {

    try {

      console.log(
        'DATOS RECIBIDOS:',
        req.body
      );

      const {
        nombre,
        edad,
        peso,
        altura,
        objetivo
      } = req.body;

      // =====================================
      // PROMPT IA
      // =====================================

      const prompt = `
      Genera un plan nutricional personalizado.

      DATOS DEL USUARIO:

      Nombre: ${nombre}
      Edad: ${edad}
      Peso: ${peso} kg
      Altura: ${altura} cm
      Objetivo: ${objetivo}

      El resultado debe incluir:

      1. Desayuno
      2. Almuerzo
      3. Cena
      4. Snacks saludables
      5. Recomendaciones saludables

      Responde completamente en español.
      `;

      // =====================================
      // OPENROUTER IA
      // =====================================

      const respuestaIA =
        await axios.post(

          'https://openrouter.ai/api/v1/chat/completions',

          {

            model:
              'openai/gpt-3.5-turbo',

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

      // =====================================
      // RESPUESTA IA
      // =====================================

      const textoGenerado =
        respuestaIA.data
          .choices[0]
          .message
          .content;

      res.json({

        mensaje:
          'Plan nutricional generado correctamente',

        plan:
          textoGenerado

      });

    } catch (error) {

      console.log(
        'ERROR IA:',
        error.response?.data || error
      );

      res.status(500).json({

        mensaje:
          'Error al generar plan nutricional'

      });

    }

  }
);

// =====================================
// SERVIDOR
// =====================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );

});