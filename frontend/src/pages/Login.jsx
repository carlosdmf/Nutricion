import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CampodeEntrada from '../components/CampodeEntrada';
import BotonPrimario from '../components/BotonPrimario';
import { Formulario } from '../utils/Formulario';
import guardarSesion from '../utils/guardarSesion';
import { Leaf, ArrowRight, Zap } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .login-root {
    min-height: 100vh;
    background: #080c14;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .login-root::before {
    content: '';
    position: fixed;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%);
    pointer-events: none;
  }

  .login-root::after {
    content: '';
    position: fixed;
    bottom: -180px; right: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .login-card {
    width: 100%;
    max-width: 440px;
    background: #0e1420;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 44px 40px 40px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    animation: fadeUp 0.55s ease both;
  }

  .login-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
  }

  .login-logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
  }

  .login-logo {
    width: 62px; height: 62px;
    border-radius: 18px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px rgba(34,197,94,0.1);
    position: relative;
  }

  .login-logo-ring {
    position: absolute;
    inset: -6px;
    border-radius: 24px;
    border: 1.5px solid rgba(34,197,94,0.15);
    animation: spin 10s linear infinite;
    border-top-color: rgba(34,197,94,0.4);
  }

  .login-titulo {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    color: #f1f5f9;
    text-align: center;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
    line-height: 1.15;
  }

  .login-subtitulo {
    color: #475569;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    margin: 0 0 36px 0;
  }

  .login-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    margin-bottom: 28px;
  }

  .login-field { margin-bottom: 18px; }

  .login-field label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #475569;
    margin-bottom: 8px;
  }

  .login-field input {
    width: 100%;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    color: #f1f5f9;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .login-field input::placeholder { color: #334155; }

  .login-field input:focus {
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 0 0 3px rgba(34,197,94,0.05);
  }

  .login-field-error {
    color: #f87171;
    font-size: 12px;
    margin-top: 6px;
    font-weight: 400;
  }

  .login-btn {
    width: 100%;
    padding: 15px;
    margin-top: 8px;
    border-radius: 13px;
    border: 1px solid rgba(34,197,94,0.28);
    background: rgba(34,197,94,0.12);
    color: #22c55e;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .login-btn:hover {
    background: rgba(34,197,94,0.18);
    border-color: rgba(34,197,94,0.5);
    box-shadow: 0 0 28px rgba(34,197,94,0.12);
    transform: translateY(-1px);
  }

  .login-btn:hover .login-btn-arrow {
    transform: translateX(3px);
  }

  .login-btn-arrow {
    transition: transform 0.2s ease;
  }

  .login-btn:active { transform: translateY(0); }

  .login-footer {
    margin-top: 28px;
    text-align: center;
    color: #334155;
    font-size: 13.5px;
    font-weight: 300;
  }

  .login-footer-link {
    color: #22c55e;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s ease;
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .login-footer-link:hover { color: #4ade80; }

  .login-badge-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .login-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(34,197,94,0.07);
    border: 1px solid rgba(34,197,94,0.15);
    color: #22c55e;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 13px;
    border-radius: 999px;
  }

  .login-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @media (max-width: 480px) {
    .login-card { padding: 36px 24px 32px; }
    .login-titulo { font-size: 1.5rem; }
  }
`;

function Login() {
  const navigate = useNavigate();

  const { valores, errores, manejarCambio, validarCamposRequeridos } = Formulario({
    email: '',
    password: '',
  });

  async function manejarLogin() {
    const esValido = validarCamposRequeridos(['email', 'password']);
    if (!esValido) return;

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: valores.email,
        password: valores.password,
      });

      if (!response.data.usuario) {
        alert('Usuario no encontrado');
        return;
      }

      guardarSesion({
        id:     response.data.usuario.id,
        nombre: response.data.usuario.nombre,
        email:  response.data.usuario.email,
      });

      navigate('/dashboard');

    } catch (error) {
      console.log('ERROR LOGIN:', error);
      alert('Email o password incorrectos');
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-card">

          {/* LOGO */}
          <div className="login-logo-wrap">
            <div className="login-logo">
              <Leaf size={26} color="#22c55e" strokeWidth={1.75} />
              <div className="login-logo-ring" />
            </div>
          </div>

          {/* BADGE */}
          <div className="login-badge-wrap">
            <div className="login-badge">
              <span className="login-badge-dot" />
              <Zap size={10} strokeWidth={2} style={{ flexShrink: 0 }} />
              NutriScan AI
            </div>
          </div>

          {/* TÍTULOS */}
          <h1 className="login-titulo">Bienvenido de vuelta</h1>
          <p className="login-subtitulo">Inicia sesión para continuar con tu plan</p>

          <div className="login-divider" />

          {/* EMAIL */}
          <div className="login-field">
            <CampodeEntrada
              label="Email"
              type="email"
              value={valores.email}
              onChange={manejarCambio('email')}
              placeholder="carlos@gmail.com"
              error={errores.email}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="login-field">
            <CampodeEntrada
              label="Contraseña"
              type="password"
              value={valores.password}
              onChange={manejarCambio('password')}
              placeholder="••••••••"
              error={errores.password}
              required
            />
          </div>

          {/* BOTÓN */}
          <button className="login-btn" onClick={manejarLogin}>
            Ingresar
            <ArrowRight size={16} strokeWidth={2} className="login-btn-arrow" />
          </button>

          {/* REGISTRO */}
          <p className="login-footer">
            ¿No tienes cuenta?{' '}
            <button className="login-footer-link" onClick={() => navigate('/registro')}>
              Regístrate aquí
            </button>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;