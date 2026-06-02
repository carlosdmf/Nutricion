const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const db = require('./db');

// =====================================
// STRATEGY PATTERN
// =====================================

const DietaStrategy =
require('./strategies/DietaStrategy');

const BajarPesoStrategy =
require('./strategies/BajarPesoStrategy');

const GanarMusculoStrategy =
require('./strategies/GanarMusculoStrategy');

const MantenerPesoStrategy =
require('./strategies/MantenerPesoStrategy');

// =====================================
// ADAPTER PATTERN
// =====================================

const OpenRouterAdapter =
require('./adapters/OpenRouterAdapter');

require('dotenv').config();

const app = express();

// =====================================
// MIDDLEWARES
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// MULTER
// =====================================

const upload = multer({

  dest: 'uploads/'

});

// =====================================
// RUTA PRINCIPAL
// =====================================

app.get('/', (req, res) => {

  res.send(
    'Servidor funcionando correctamente'
  );

});

// =====================================
// REGISTRO USUARIO + STRATEGY + IA
// =====================================

app.post('/usuarios/registro', async (req, res) => {

  const {

    nombre,
    email,
    password,
    edad,
    peso,
    altura,
    objetivo,
    enfermedad

  } = req.body;

  const sql = `

    INSERT INTO usuarios (

      nombre,
      email,
      password,
      edad,
      peso,
      altura,
      objetivo,
      enfermedad

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

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
      objetivo,
      enfermedad

    ],

    async (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al registrar usuario'

        });

      }

      const usuario_id =
        result.insertId;

      try {

        // =====================================
        // STRATEGY PATTERN
        // =====================================

        let estrategia;

        if (
          objetivo === 'bajar_peso'
        ) {

          estrategia =
            new BajarPesoStrategy();

        }

        else if (
          objetivo === 'ganar_musculo'
        ) {

          estrategia =
            new GanarMusculoStrategy();

        }

        else {

          estrategia =
            new MantenerPesoStrategy();

        }

        const contexto =
          new DietaStrategy(
            estrategia
          );

        const recomendacionBase =
          contexto.generarPlan();

        // =====================================
        // IA OPENROUTER
        // =====================================

        const prompt = `

        Eres un nutricionista profesional.

        Genera un plan nutricional COMPLETO,
        detallado y explicativo.

        Datos del usuario:

        Nombre: ${nombre}
        Edad: ${edad}
        Peso: ${peso} kg
        Altura: ${altura} cm
        Objetivo: ${objetivo}
        Enfermedad: ${enfermedad}

        Si el usuario tiene una enfermedad
        o condición médica, adapta el plan
        nutricional para esa condición.

        Evita alimentos perjudiciales y
        recomienda alimentos adecuados.

        Recomendación inicial:

        ${recomendacionBase}

        El plan debe incluir:

        - desayuno
        - almuerzo
        - cena
        - snacks saludables
        - calorías aproximadas
        - consejos nutricionales
        - alimentos recomendados
        - alimentos que debe evitar
        - explicación del por qué

        Responde en español.
        Hazlo largo, claro y profesional.

        `;

        // =====================================
        // ADAPTER PATTERN
        // =====================================

        const ia =
          new OpenRouterAdapter();

        const textoGenerado =
          await ia.generarRespuesta(prompt);

        // =====================================
        // GUARDAR DIETA
        // =====================================

        const sqlDieta = `

          INSERT INTO dietas (

            usuario_id,
            titulo,
            contenido,
            calorias_diarias,
            objetivo

          )

          VALUES (?, ?, ?, ?, ?)

        `;

        db.query(

          sqlDieta,

          [

            usuario_id,
            `Plan nutricional para ${objetivo}`,
            textoGenerado,
            2000,
            objetivo

          ],

          (errDieta, resultDieta) => {

            if (errDieta) {

              console.log(errDieta);

              return res.status(500).json({

                mensaje:
                  'Usuario registrado pero error al guardar dieta'

              });

            }

            res.status(201).json({

              mensaje:
                'Usuario registrado correctamente',

              usuario_id,

              dieta_id:
                resultDieta.insertId,

              plan:
                textoGenerado

            });

          }

        );

      }

      catch (error) {

        console.log(error);

        res.status(500).json({

          mensaje:
            'Error generando dieta con IA'

        });

      }

    }

  );

});

// =====================================
// LOGIN
// =====================================

app.post('/login', (req, res) => {

  const {

    email,
    password

  } = req.body;

  const sql = `

    SELECT *

    FROM usuarios

    WHERE email = ?
    AND password = ?

  `;

  db.query(

    sql,

    [

      email,
      password

    ],

    (err, result) => {

      if (err) {

        return res.status(500).json({

          mensaje:
            'Error del servidor'

        });

      }

      if (result.length === 0) {

        return res.status(401).json({

          mensaje:
            'Credenciales incorrectas'

        });

      }

      res.json({

        mensaje:
          'Login correcto',

        usuario:
          result[0]

      });

    }

  );

});

// =====================================
// OBTENER PERFIL USUARIO
// =====================================

app.get('/usuarios/:id', (req, res) => {

  const { id } = req.params;

  const sql = `

    SELECT *

    FROM usuarios

    WHERE id = ?

  `;

  db.query(

    sql,

    [id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al obtener usuario'

        });

      }

      res.json(

        result[0]

      );

    }

  );

});

// =====================================
// DASHBOARD PROGRESO
// =====================================

app.get('/dashboard/:usuario_id', (req, res) => {

  const { usuario_id } =
    req.params;

  const sql = `

    SELECT *

    FROM progreso

    WHERE usuario_id = ?

    ORDER BY fecha ASC

  `;

  db.query(

    sql,

    [usuario_id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al obtener dashboard'

        });

      }

      res.json(result);

    }

  );

});

// =====================================
// GUARDAR PROGRESO
// =====================================

app.post('/progreso', (req, res) => {

  const {

    usuario_id,
    peso,
    altura

  } = req.body;

  const sql = `

    INSERT INTO progreso (

      usuario_id,
      peso,
      altura

    )

    VALUES (?, ?, ?)

  `;

  db.query(

    sql,

    [

      usuario_id,
      peso,
      altura

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al guardar progreso'

        });

      }

      res.json({

        mensaje:
          'Progreso guardado correctamente'

      });

    }

  );

});

// =====================================
// OBTENER DIETA
// =====================================

app.get('/dietas/:usuario_id', (req, res) => {

  const { usuario_id } =
    req.params;

  const sql = `

    SELECT *

    FROM dietas

    WHERE usuario_id = ?

    ORDER BY fecha_creacion DESC

    LIMIT 1

  `;

  db.query(

    sql,

    [usuario_id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al obtener dieta'

        });

      }

      res.json(result);

    }

  );

});

// =====================================
// CHAT IA
// =====================================

app.post('/chat-nutricional', async (req, res) => {

  try {

    const { mensaje } =
      req.body;

    const prompt = `

    Eres un nutricionista profesional.

    Pregunta:

    ${mensaje}

    Responde de manera no muy detallada en español.

    `;

    const ia =
      new OpenRouterAdapter();

    const respuesta =
      await ia.generarRespuesta(prompt);

    res.json({

      respuesta

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      mensaje:
        'Error en chatbot IA'

    });

  }

});

// =====================================
// ESCANEAR COMIDA
// =====================================

app.post('/escanear-comida', async (req, res) => {

  try {

    const {

      comida,
      usuario_id

    } = req.body;

    const prompt = `

    Analiza esta comida:

    ${comida}

    Dame:

    - calorías aproximadas
    - proteínas
    - carbohidratos
    - grasas
    - recomendación nutricional

    Responde en español y detallado.

    `;

    const ia =
      new OpenRouterAdapter();

    const respuesta =
      await ia.generarRespuesta(prompt);

    // =====================================
    // GUARDAR HISTORIAL
    // =====================================

    if (usuario_id) {

      const sqlHistorial = `

        INSERT INTO historial (

          usuario_id,
          tipo,
          consulta,
          resultado

        )

        VALUES (?, ?, ?, ?)

      `;

      db.query(

        sqlHistorial,

        [

          usuario_id,
          'texto',
          comida,
          respuesta

        ],

        (err) => {

          if (err) {

            console.log(
              'Error historial:',
              err
            );

          }

        }

      );

    }

    res.json({

      resultado: respuesta

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      mensaje:
        'Error al analizar comida'

    });

  }

});

// =====================================
// ESCANEAR IMAGEN
// =====================================

app.post(

  '/escanear-imagen',

  upload.single('imagen'),

  async (req, res) => {

    try {

      const { usuario_id } =
        req.body;

      const ia =
        new OpenRouterAdapter();

      // convertir imagen a Base64

      const imagenBase64 =
        fs.readFileSync(
          req.file.path,
          { encoding: 'base64' }
        );

      // enviar imagen real a la IA

      const respuesta =
        await ia.generarRespuestaImagen(
          imagenBase64
        );

      // =====================================
      // GUARDAR HISTORIAL
      // =====================================

      if (usuario_id) {

        const sqlHistorial = `

          INSERT INTO historial (

            usuario_id,
            tipo,
            consulta,
            resultado

          )

          VALUES (?, ?, ?, ?)

        `;

        db.query(

          sqlHistorial,

          [

            usuario_id,
            'imagen',
            'Imagen escaneada',
            respuesta

          ],

          (err) => {

            if (err) {

              console.log(
                'Error historial:',
                err
              );

            }

          }

        );

      }

      // eliminar imagen
      fs.unlinkSync(req.file.path);

      res.json({

        resultado: respuesta

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        mensaje:
          'Error al analizar imagen'

      });

    }

  }

);

// =====================================
// OBTENER HISTORIAL
// =====================================

app.get('/historial/:usuario_id', (req, res) => {

  const { usuario_id } =
    req.params;

  const sql = `

    SELECT *

    FROM historial

    WHERE usuario_id = ?

    ORDER BY fecha DESC

  `;

  db.query(

    sql,

    [usuario_id],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({

          mensaje:
            'Error al obtener historial'

        });

      }

      res.json(result);

    }

  );

});

// =====================================
// SERVIDOR
// =====================================

const PORT =
  process.env.PORT || 5000;

if (require.main === module) {

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });

}

module.exports = app;