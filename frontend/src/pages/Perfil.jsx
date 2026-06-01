import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import obtenerSesion from '../utils/obtenerSesion';
import {
  UserCircle, Cake, Weight, Ruler, Target,
  Flame, Droplets, Beef, Moon, CheckCircle2,
  Activity, BarChart3,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .perfil-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .perfil-root::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .perfil-root::after {
    content: '';
    position: fixed;
    bottom: -150px; left: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .perfil-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .perfil-contenido {
    flex: 1;
    padding: 48px 56px;
    max-width: 1200px;
  }

  /* ── HEADER ── */
  .perfil-header {
    margin-bottom: 44px;
    animation: fadeUp 0.6s ease both;
  }

  .perfil-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.18);
    color: #22c55e;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 18px;
  }

  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .perfil-header h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #f1f5f9;
    line-height: 1.1;
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
  }

  .perfil-header p {
    color: #3d5068;
    font-size: 15px;
    margin: 0;
    font-weight: 300;
  }

  /* ── GRID ── */
  .perfil-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 24px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  /* ── CARD BASE ── */
  .card {
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .card:hover {
    border-color: rgba(34,197,94,0.13);
    transform: translateY(-2px);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover::before { opacity: 1; }

  /* ── AVATAR ── */
  .avatar-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .avatar {
    width: 88px; height: 88px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0f2d1f 0%, #14532d 100%);
    border: 1.5px solid rgba(34,197,94,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 0 0 6px rgba(34,197,94,0.05), 0 0 40px rgba(34,197,94,0.12);
  }

  .avatar-ring {
    position: absolute;
    inset: -7px;
    border-radius: 50%;
    border: 1.5px solid rgba(34,197,94,0.2);
    border-top-color: #22c55e;
    animation: spin 8s linear infinite;
  }

  .perfil-nombre {
    font-size: 1.2rem;
    font-weight: 700;
    color: #f1f5f9;
    text-align: center;
    margin: 0 0 4px 0;
    letter-spacing: -0.01em;
  }

  .perfil-email {
    color: #3d5068;
    font-size: 13px;
    text-align: center;
    margin: 0 0 24px 0;
    font-weight: 300;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    margin-bottom: 20px;
  }

  /* ── INFO ITEM ── */
  .info-item {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 14px;
    border-radius: 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    margin-bottom: 8px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .info-item:hover {
    background: rgba(34,197,94,0.04);
    border-color: rgba(34,197,94,0.08);
  }

  .info-item:last-child { margin-bottom: 0; }

  .info-icon-wrap {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .info-item-titulo {
    color: #2d4155;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 2px 0;
  }

  .info-item-valor {
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }

  /* ── COLUMNA DERECHA ── */
  .col-derecha {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* ── CARD TITLE ── */
  .card-title {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 22px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.04);
  }

  /* ── IMC ── */
  .imc-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .imc-label {
    color: #2d4155;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  .imc-numero {
    font-size: 4.2rem;
    font-weight: 800;
    color: #22c55e;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .imc-etiqueta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.18);
    color: #4ade80;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 999px;
    margin-top: 12px;
  }

  .imc-ring {
    width: 110px; height: 110px;
    transform: rotate(-90deg);
    flex-shrink: 0;
  }

  .imc-ring-bg {
    fill: none;
    stroke: rgba(34,197,94,0.08);
    stroke-width: 7;
  }

  .imc-ring-fg {
    fill: none;
    stroke: url(#ringGradient);
    stroke-width: 7;
    stroke-linecap: round;
    stroke-dasharray: 282;
    transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── STATS ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .stat-caja {
    border-radius: 16px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.02);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .stat-caja:hover {
    transform: scale(1.02);
    border-color: rgba(255,255,255,0.07);
  }

  .stat-caja-glow {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 0 0 16px 16px;
  }

  .stat-icon-wrap {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }

  .stat-caja-titulo {
    color: #2d4155;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 5px 0;
  }

  .stat-caja-valor {
    font-size: 1.55rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0;
  }

  /* ── LOADING ── */
  .loading-screen {
    min-height: 100vh;
    background: #080c14;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  }

  .loading-spinner {
    width: 36px; height: 36px;
    border: 2px solid rgba(34,197,94,0.1);
    border-top-color: #22c55e;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-text {
    color: #2d4155;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @media (max-width: 1024px) {
    .perfil-grid { grid-template-columns: 1fr; }
    .perfil-contenido { padding: 32px 24px; }
  }
`;

const STAT_CONFIG = {
  orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.15)',  glow: '#f97316', text: '#fb923c' },
  cyan:   { bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.15)',   glow: '#06b6d4', text: '#22d3ee' },
  green:  { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.15)',   glow: '#22c55e', text: '#4ade80' },
  purple: { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.15)',  glow: '#a855f7', text: '#c084fc' },
};

function Perfil() {
  const sesion = obtenerSesion();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerPerfil() {
      try {
        const response = await axios.get(`http://localhost:5000/usuarios/${sesion.id}`);
        setUsuario(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    }
    obtenerPerfil();
  }, []);

  if (cargando) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p className="loading-text">Cargando perfil</p>
        </div>
      </>
    );
  }

  const imc = usuario?.peso && usuario?.altura
    ? (usuario.peso / ((usuario.altura / 100) ** 2)).toFixed(1)
    : '—';

  const circunferencia = 282;
  const offset = circunferencia - Math.min(parseFloat(imc) / 40, 1) * circunferencia;

  return (
    <>
      <style>{styles}</style>
      <div className="perfil-root">
        <Navbar usuario={usuario?.nombre} />
        <div className="perfil-layout">
          <Sidebar />
          <div className="perfil-contenido">

            {/* HEADER */}
            <div className="perfil-header">
              <div className="perfil-header-badge">
                <span className="badge-dot" />
                Panel de salud
              </div>
              <h1>Mi Perfil</h1>
              <p>Información personal y métricas nutricionales</p>
            </div>

            {/* GRID */}
            <div className="perfil-grid">

              {/* COLUMNA IZQUIERDA */}
              <div className="card card-perfil">
                <div className="avatar-wrap">
                  <div className="avatar">
                    <UserCircle size={42} color="#22c55e" strokeWidth={1.25} />
                    <div className="avatar-ring" />
                  </div>
                </div>
                <p className="perfil-nombre">{usuario?.nombre}</p>
                <p className="perfil-email">{usuario?.email}</p>
                <div className="divider" />
                <InfoItem titulo="Edad"     valor={`${usuario?.edad} años`} Icon={Cake}   />
                <InfoItem titulo="Peso"     valor={`${usuario?.peso} kg`}   Icon={Weight} />
                <InfoItem titulo="Altura"   valor={`${usuario?.altura} cm`} Icon={Ruler}  />
                <InfoItem titulo="Objetivo" valor={usuario?.objetivo}       Icon={Target} />
              </div>

              {/* COLUMNA DERECHA */}
              <div className="col-derecha">

                {/* IMC */}
                <div className="card">
                  <p className="card-title">
                    <Activity size={14} strokeWidth={2} />
                    Índice de Masa Corporal
                    <span className="card-title-line" />
                  </p>
                  <div className="imc-row">
                    <div>
                      <p className="imc-label">IMC calculado</p>
                      <div className="imc-numero">{imc}</div>
                      <div className="imc-etiqueta">
                        <CheckCircle2 size={12} strokeWidth={2} />
                        Peso saludable
                      </div>
                    </div>
                    <svg className="imc-ring" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%"   stopColor="#16a34a" />
                          <stop offset="100%" stopColor="#4ade80" />
                        </linearGradient>
                      </defs>
                      <circle className="imc-ring-bg" cx="50" cy="50" r="45" />
                      <circle
                        className="imc-ring-fg"
                        cx="50" cy="50" r="45"
                        style={{ strokeDashoffset: offset }}
                      />
                    </svg>
                  </div>
                </div>

                {/* ESTADÍSTICAS */}
                <div className="card">
                  <p className="card-title">
                    <BarChart3 size={14} strokeWidth={2} />
                    Estadísticas diarias
                    <span className="card-title-line" />
                  </p>
                  <div className="stats-grid">
                    <StatCaja Icon={Flame}    titulo="Calorías"    valor="2,200" color="orange" />
                    <StatCaja Icon={Droplets} titulo="Hidratación" valor="2.0 L" color="cyan"   />
                    <StatCaja Icon={Beef}     titulo="Proteína"    valor="120 g" color="green"  />
                    <StatCaja Icon={Moon}     titulo="Sueño"       valor="8 h"   color="purple" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── COMPONENTES AUXILIARES ─────────────────────────────────

function InfoItem({ titulo, valor, Icon }) {
  return (
    <div className="info-item">
      <div className="info-icon-wrap">
        <Icon size={16} color="#22c55e" strokeWidth={1.75} />
      </div>
      <div>
        <p className="info-item-titulo">{titulo}</p>
        <p className="info-item-valor">{valor}</p>
      </div>
    </div>
  );
}

function StatCaja({ Icon, titulo, valor, color }) {
  const cfg = STAT_CONFIG[color];
  return (
    <div className="stat-caja">
      <div
        className="stat-icon-wrap"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <Icon size={17} color={cfg.text} strokeWidth={1.75} />
      </div>
      <p className="stat-caja-titulo">{titulo}</p>
      <p className="stat-caja-valor">{valor}</p>
      <div className="stat-caja-glow" style={{ background: cfg.glow, opacity: 0.5 }} />
    </div>
  );
}

export default Perfil;