import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CampodeEntrada from '../components/CampodeEntrada';
import BotonPrimario from '../components/BotonPrimario';

function Registro() {

  const navigate = useNavigate();

  // =====================================
  // ESTADOS
  // =====================================

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    peso: '',
    altura: '',
    objetivo: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [resultadoIA, setResultadoIA] = useState('');
  const [cargando, setCargando] = useState(false);

  // =====================================
  // MANEJAR INPUTS
  // =====================================

  function manejarCambio(campo) {

    return (e) => {

      setForm((prev) => ({
        ...prev,
        [campo]: e.target.value
      }));

    };

  }

  // =====================================
  // REGISTRO + IA
  // =====================================

  async function manejarRegistro() {

    if (
      !form.nombre ||
      !form.email ||
      !form.password
    ) {

      setMensaje(
        'Nombre, email y password son obligatorios'
      );

      return;

    }

    try {

      setCargando(true);

      // =====================================
      // REGISTRAR USUARIO
      // =====================================

      const response = await axios.post(

        'http://localhost:5000/usuarios/registro',

        form

      );

      setMensaje(response.data.mensaje);

      // =====================================
      // GENERAR PLAN IA
      // =====================================

      const respuestaIA = await axios.post(

        'http://localhost:5000/plan-nutricional',

        {
          nombre: form.nombre,
          edad: form.edad,
          peso: form.peso,
          altura: form.altura,
          objetivo: form.objetivo
        }

      );

      setResultadoIA(
        respuestaIA.data.plan
      );

    } catch (error) {

      console.log(
        'Error completo:',
        error
      );

      setMensaje(
        'Error: ' +
        (
          error.response?.data?.mensaje ||
          error.message
        )
      );

    } finally {

      setCargando(false);

    }

  }

  // =====================================
  // VISTA
  // =====================================

  return (

    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to right, #0f172a, #1e293b)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: 'white'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#1e293b',
          padding: '35px',
          borderRadius: '18px',
          boxShadow:
            '0px 0px 20px rgba(0,0,0,0.4)'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Registro — NutriScan AI
        </h1>

        {/* ===================================== */}
        {/* FORMULARIO */}
        {/* ===================================== */}

        <CampodeEntrada
          label="Nombre"
          type="text"
          value={form.nombre}
          onChange={manejarCambio('nombre')}
          placeholder="Carlos"
          required
        />

        <CampodeEntrada
          label="Email"
          type="email"
          value={form.email}
          onChange={manejarCambio('email')}
          placeholder="carlos@gmail.com"
          required
        />

        <CampodeEntrada
          label="Password"
          type="password"
          value={form.password}
          onChange={manejarCambio('password')}
          placeholder="••••••••"
          required
        />

        <CampodeEntrada
          label="Edad"
          type="number"
          value={form.edad}
          onChange={manejarCambio('edad')}
          placeholder="25"
        />

        <CampodeEntrada
          label="Peso (kg)"
          type="number"
          value={form.peso}
          onChange={manejarCambio('peso')}
          placeholder="70"
        />

        <CampodeEntrada
          label="Altura (cm)"
          type="number"
          value={form.altura}
          onChange={manejarCambio('altura')}
          placeholder="170"
        />

        {/* ===================================== */}
        {/* OBJETIVO */}
        {/* ===================================== */}

        <div style={{ marginBottom: '18px' }}>

          <label
            style={{
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            Objetivo
          </label>

          <select
            value={form.objetivo}
            onChange={manejarCambio('objetivo')}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: 'white',
              fontSize: '1rem'
            }}
          >

            <option value="">
              Seleccionar...
            </option>

            <option value="Bajar de peso">
              Bajar de peso
            </option>

            <option value="Mantener peso">
              Mantener peso
            </option>

            <option value="Ganar músculo">
              Ganar músculo
            </option>

          </select>

        </div>

        {/* ===================================== */}
        {/* BOTON */}
        {/* ===================================== */}

        <BotonPrimario
          text={
            cargando
              ? 'Procesando...'
              : 'Registrarme y Generar Plan'
          }
          onClick={manejarRegistro}
        />

        {/* ===================================== */}
        {/* MENSAJE */}
        {/* ===================================== */}

        {

          mensaje && (

            <p
              style={{
                marginTop: '18px',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                backgroundColor:
                  mensaje.includes('Error')
                    ? '#7f1d1d'
                    : '#14532d'
              }}
            >
              {mensaje}
            </p>

          )

        }

        {/* ===================================== */}
        {/* RESULTADO IA */}
        {/* ===================================== */}

        {

          resultadoIA && (

            <div
              style={{
                marginTop: '30px',
                background: '#0f172a',
                padding: '25px',
                borderRadius: '14px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.8',
                border: '1px solid #334155'
              }}
            >

              <h2
                style={{
                  marginBottom: '20px',
                  color: '#22c55e',
                  textAlign: 'center'
                }}
              >
                Plan Nutricional Generado por IA
              </h2>

              {resultadoIA}

            </div>

          )

        }

      </div>

    </div>

  );

}

export default Registro;