import { useState } from 'react';
import axios from 'axios';
import CampodeEntrada from '../components/CampodeEntrada';
import BotonPrimario from '../components/BotonPrimario';
import { UserCircle } from 'lucide-react';
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .reg-root {
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

  .reg-root::before {
    content: '';
    position: fixed;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%);
    pointer-events: none;
  }

  .reg-root::after {
    content: '';
    position: fixed;
    bottom: -180px; right: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .reg-card {
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

  .reg-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
  }

  .reg-logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
  }

 .reg-logo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f2d1f 0%, #14532d 100%);
  border: 1.5px solid rgba(34,197,94,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    0 0 0 6px rgba(34,197,94,0.05),
    0 0 40px rgba(34,197,94,0.12);
}
  .reg-logo-ring {
    position: absolute;
    inset: -6px;
    border-radius: 24px;
    border: 1.5px solid rgba(34,197,94,0.15);
    animation: spin 10s linear infinite;
    border-top-color: rgba(34,197,94,0.4);
  }

  .reg-badge-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .reg-badge {
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

  .reg-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .reg-titulo {
    font-family: 'Syne', sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    color: #f1f5f9;
    text-align: center;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
    line-height: 1.15;
  }

  .reg-subtitulo {
    color: #475569;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    margin: 0 0 36px 0;
  }

  .reg-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    margin-bottom: 28px;
  }

  .reg-section-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 8px 0;
  }

  .reg-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  .reg-section-label {
    color: #334155;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .reg-field {
    margin-bottom: 18px;
  }

  .reg-field label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #475569;
    margin-bottom: 8px;
  }

  .reg-field input,
  .reg-field select {
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

  .reg-field input::placeholder { color: #334155; }

  .reg-field input:focus,
  .reg-field select:focus {
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 0 0 3px rgba(34,197,94,0.05);
  }

  .reg-field select {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-color: rgba(255,255,255,0.02);
    padding-right: 40px;
  }

  .reg-field select option {
    background: #0e1420;
    color: #f1f5f9;
  }

  .reg-field select option:disabled {
    color: #475569;
  }

  .reg-field-error {
    color: #f87171;
    font-size: 12px;
    margin-top: 6px;
    font-weight: 400;
  }

  .reg-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .reg-btn {
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

  .reg-btn:hover {
    background: rgba(34,197,94,0.18);
    border-color: rgba(34,197,94,0.5);
    box-shadow: 0 0 28px rgba(34,197,94,0.12);
    transform: translateY(-1px);
  }

  .reg-btn:active { transform: translateY(0); }

  .reg-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .reg-msg {
    margin-top: 20px;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 13.5px;
    text-align: center;
    font-weight: 400;
  }

  .reg-msg.error {
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.2);
    color: #f87171;
  }

  .reg-msg.success {
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.2);
    color: #4ade80;
  }

  .reg-footer {
    margin-top: 28px;
    text-align: center;
    color: #334155;
    font-size: 13.5px;
    font-weight: 300;
  }

  .reg-footer-link {
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

  .reg-footer-link:hover { color: #4ade80; }

  /* Panel IA */
  .reg-ia-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    max-height: 88vh;
    overflow-y: auto;
    background: #0e1420;
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 24px;
    padding: 28px 24px;
    color: #e2e8f0;
    white-space: pre-wrap;
    line-height: 1.75;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    z-index: 100;
    animation: fadeUp 0.4s ease both;
  }

  .reg-ia-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
  }

  .reg-ia-title {
    font-family: 'Syne', sans-serif;
    color: #22c55e;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .reg-ia-dot {
    width: 6px; height: 6px;
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
    .reg-card { padding: 36px 24px 32px; }
    .reg-titulo { font-size: 1.5rem; }
    .reg-ia-panel { display: none; }
  }
`;

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    peso: '',
    altura: '',
    objetivo: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [resultadoIA, setResultadoIA] = useState('');
  const [cargando, setCargando] = useState(false);

  function manejarCambio(campo) {
    return (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  }

  async function manejarRegistro() {
    if (!form.nombre || !form.email || !form.password) {
      setMensaje('Completa los campos obligatorios.');
      return;
    }

    try {
      setCargando(true);
      const response = await axios.post('http://localhost:5000/usuarios/registro', form);
      setMensaje(response.data.mensaje);
      setResultadoIA(response.data.plan);
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        <div className="reg-card">

          {/* LOGO */}
        {/* LOGO */}
<div className="reg-logo-wrap">
  <div className="reg-logo">
    <UserCircle
      size={42}
      color="#22c55e"
      strokeWidth={1.25}
    />
    <div className="reg-logo-ring" />
  </div>
</div>

          {/* BADGE */}
          <div className="reg-badge-wrap">
            <div className="reg-badge">
              <span className="reg-badge-dot" />
              NutriScan AI
            </div>
          </div>

          {/* TÍTULOS */}
          <h1 className="reg-titulo">Crea tu cuenta</h1>
          <p className="reg-subtitulo">Completa tu perfil para generar tu plan</p>

          <div className="reg-divider" />

          {/* Nombre */}
          <div className="reg-field">
            <label>Nombre</label>
            <CampodeEntrada
              type="text"
              value={form.nombre}
              onChange={manejarCambio('nombre')}
              placeholder="Carlos"
            />
          </div>

          {/* Email */}
          <div className="reg-field">
            <label>Correo electrónico</label>
            <CampodeEntrada
              type="email"
              value={form.email}
              onChange={manejarCambio('email')}
              placeholder="carlos@gmail.com"
            />
          </div>

          {/* Contraseña */}
          <div className="reg-field">
            <label>Contraseña</label>
            <CampodeEntrada
              type="password"
              value={form.password}
              onChange={manejarCambio('password')}
              placeholder="••••••••"
            />
          </div>

          {/* DIVISOR DATOS FÍSICOS */}
          <div className="reg-section-divider">
            <div className="reg-section-line" />
            <span className="reg-section-label">Datos físicos</span>
            <div className="reg-section-line" />
          </div>

          {/* Edad + Peso */}
          <div className="reg-grid" style={{ marginBottom: '18px' }}>
            <div className="reg-field" style={{ marginBottom: 0 }}>
              <label>Edad</label>
              <CampodeEntrada
                type="number"
                value={form.edad}
                onChange={manejarCambio('edad')}
                placeholder="20"
              />
            </div>
            <div className="reg-field" style={{ marginBottom: 0 }}>
              <label>Peso (kg)</label>
              <CampodeEntrada
                type="number"
                value={form.peso}
                onChange={manejarCambio('peso')}
                placeholder="70"
              />
            </div>
          </div>

          {/* Altura */}
          <div className="reg-field">
            <label>Altura (cm)</label>
            <CampodeEntrada
              type="number"
              value={form.altura}
              onChange={manejarCambio('altura')}
              placeholder="170"
            />
          </div>

          {/* Objetivo */}
          <div className="reg-field">
            <label>Objetivo</label>
            <select value={form.objetivo} onChange={manejarCambio('objetivo')}>
              <option value="" disabled>Seleccionar objetivo</option>
              <option value="bajar_peso">🔥 Bajar peso</option>
              <option value="mantener">⚖️ Mantener</option>
              <option value="ganar_musculo">💪 Ganar músculo</option>
            </select>
          </div>

          {/* BOTÓN */}
          <button className="reg-btn" onClick={manejarRegistro} disabled={cargando}>
            <span>✦</span> {cargando ? 'Procesando...' : 'Crear cuenta'}
          </button>

          {/* MENSAJE */}
          {mensaje && (
            <div className={`reg-msg ${mensaje.toLowerCase().includes('error') ? 'error' : 'success'}`}>
              {mensaje}
            </div>
          )}

          {/* FOOTER */}
          <p className="reg-footer">
            ¿Ya tienes cuenta?{' '}
            <button className="reg-footer-link" onClick={() => window.history.back()}>
              Inicia sesión
            </button>
          </p>

        </div>
      </div>

      {/* Panel IA */}
      {resultadoIA && (
        <div className="reg-ia-panel">
          <p className="reg-ia-title">
            <span className="reg-ia-dot" />
            Plan IA generado
          </p>
          {resultadoIA}
        </div>
      )}
    </>
  );
}

export default Registro;