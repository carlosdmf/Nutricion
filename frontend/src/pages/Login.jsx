import { useNavigate } from 'react-router-dom';

import CampodeEntrada from '../components/CampodeEntrada';
import BotonPrimario from '../components/BotonPrimario';

import { Formulario }
from '../utils/Formulario';

function Login() {

  const navigate = useNavigate();

  // =====================================
  // FORMULARIO
  // =====================================

  const {
    valores,
    errores,
    manejarCambio,
    validarCamposRequeridos

  } = Formulario({

    email: '',
    password: ''

  });

  // =====================================
  // LOGIN
  // =====================================

  function manejarLogin() {

    const esValido =
      validarCamposRequeridos([
        'email',
        'password'
      ]);

    if (!esValido) return;

    navigate('/dashboard');

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
        padding: '20px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          background: '#1e293b',
          padding: '35px',
          borderRadius: '18px',
          boxShadow:
            '0px 0px 20px rgba(0,0,0,0.4)',
          color: 'white'
        }}
      >

        {/* ===================================== */}
        {/* TITULO */}
        {/* ===================================== */}

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '2rem'
          }}
        >
          NutriScan AI
        </h1>

        <p
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#CBD5E1'
          }}
        >
          Iniciar sesión en el sistema
        </p>

        {/* ===================================== */}
        {/* EMAIL */}
        {/* ===================================== */}

        <CampodeEntrada
          label="Email"
          type="email"
          value={valores.email}
          onChange={manejarCambio('email')}
          placeholder="carlos@gmail.com"
          error={errores.email}
          required
        />

        {/* ===================================== */}
        {/* PASSWORD */}
        {/* ===================================== */}

        <CampodeEntrada
          label="Password"
          type="password"
          value={valores.password}
          onChange={manejarCambio('password')}
          placeholder="••••••••"
          error={errores.password}
          required
        />

        {/* ===================================== */}
        {/* BOTON */}
        {/* ===================================== */}

        <BotonPrimario
          text="Ingresar"
          onClick={manejarLogin}
        />

        {/* ===================================== */}
        {/* REGISTRO */}
        {/* ===================================== */}

        <p
          style={{
            marginTop: '25px',
            textAlign: 'center',
            color: '#CBD5E1'
          }}
        >

          ¿No tienes cuenta?{' '}

          <span
            onClick={() => navigate('/registro')}
            style={{
              color: '#22c55e',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Regístrate
          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;