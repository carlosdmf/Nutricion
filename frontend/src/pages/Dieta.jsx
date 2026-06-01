import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import obtenerSesion from '../utils/obtenerSesion';
import {
  Salad, CalendarDays, BrainCircuit, Sparkles,
  Share2, ChevronDown, Printer, Download,
  Broccoli, FileText, Loader2,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .dieta-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .dieta-root::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .dieta-root::after {
    content: '';
    position: fixed;
    bottom: -150px; left: -100px;
    width: 440px; height: 440px;
    background: radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .dieta-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .dieta-contenido {
    flex: 1;
    padding: 48px 56px;
    max-width: 980px;
  }

  /* ── HEADER ── */
  .dieta-header {
    margin-bottom: 36px;
    animation: fadeUp 0.5s ease both;
  }

  .dieta-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.18);
    color: #22c55e;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 13px;
    border-radius: 999px;
    margin-bottom: 16px;
  }

  .dieta-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .dieta-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .dieta-header p {
    color: #3d5068;
    font-size: 14.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── PILLS ── */
  .dieta-pills {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 28px;
    animation: fadeUp 0.5s 0.05s ease both;
  }

  .dieta-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #0b1120;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 14px;
    padding: 13px 18px;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .dieta-pill:hover {
    border-color: rgba(255,255,255,0.09);
    transform: translateY(-1px);
  }

  .dieta-pill-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dieta-pill-label {
    color: #2d4155;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    margin: 0 0 3px 0;
  }

  .dieta-pill-valor {
    font-size: 1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0;
    letter-spacing: -0.01em;
  }

  /* ── BOTÓN ── */
  .dieta-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 17px;
    border-radius: 11px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.22s ease;
    white-space: nowrap;
  }

  .dieta-btn.verde {
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.2);
    color: #22c55e;
  }

  .dieta-btn.verde:hover {
    background: rgba(34,197,94,0.14);
    border-color: rgba(34,197,94,0.4);
    box-shadow: 0 0 16px rgba(34,197,94,0.08);
    transform: translateY(-1px);
  }

  .dieta-btn-chevron {
    transition: transform 0.2s ease;
  }

  .dieta-btn-chevron.open {
    transform: rotate(180deg);
  }

  /* ── DROPDOWN ── */
  .dieta-dropdown-wrap { position: relative; }

  .dieta-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #0d1525;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    overflow: hidden;
    min-width: 190px;
    z-index: 50;
    animation: fadeDown 0.15s ease;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dieta-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #64748b;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .dieta-dropdown-item:hover {
    background: rgba(34,197,94,0.04);
    color: #e2e8f0;
  }

  .dieta-dropdown-divider {
    height: 1px;
    background: rgba(255,255,255,0.04);
  }

  /* ── CARD ── */
  .dieta-card {
    background: #0b1120;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.05);
    overflow: hidden;
    animation: fadeUp 0.5s 0.1s ease both;
    position: relative;
  }

  .dieta-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.35), transparent);
  }

  .dieta-card-header {
    padding: 20px 28px;
    background: rgba(0,0,0,0.18);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }

  .dieta-card-titulo {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .dieta-card-titulo-icon {
    width: 30px; height: 30px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.15);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dieta-card-tag {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: rgba(34,197,94,0.07);
    border: 1px solid rgba(34,197,94,0.13);
    color: #4ade80;
    padding: 3px 10px;
    border-radius: 999px;
  }

  /* ── BODY ── */
  .dieta-card-body { padding: 34px 36px; }

  .dieta-separador {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 26px;
  }

  .dieta-separador-texto {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #1e3a52;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .dieta-separador-linea {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0.04), transparent);
  }

  .dieta-texto {
    color: #7a95b0;
    font-size: 14.5px;
    line-height: 2;
    white-space: pre-wrap;
    font-weight: 300;
  }

  .dieta-texto strong {
    color: #e2e8f0;
    font-weight: 600;
  }

  /* ── EMPTY ── */
  .dieta-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
  }

  .dieta-empty-icon {
    width: 72px; height: 72px;
    background: rgba(34,197,94,0.06);
    border: 1px solid rgba(34,197,94,0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .dieta-empty h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1e3a52;
    margin: 0 0 10px 0;
  }

  .dieta-empty p {
    color: #152535;
    font-size: 13.5px;
    max-width: 280px;
    line-height: 1.65;
    margin: 0;
    font-weight: 300;
  }

  /* ── LOADING ── */
  .dieta-loading {
    min-height: 100vh;
    background: #080c14;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 14px;
  }

  .dieta-spinner {
    animation: spin 0.75s linear infinite;
  }

  .dieta-loading-text {
    color: #1e3a52;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @media print {
    .dieta-pills,
    .dieta-root::before,
    .dieta-root::after { display: none; }
  }

  @media (max-width: 768px) {
    .dieta-contenido { padding: 28px 20px; }
    .dieta-header h1 { font-size: 1.9rem; }
    .dieta-card-body { padding: 24px 20px; }
  }
`;

function Dieta() {
  const usuario = obtenerSesion();
  const [dieta, setDieta]     = useState(null);
  const [cargando, setCargando] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function obtenerDieta() {
      try {
        const response = await axios.get(`http://localhost:5000/dietas/${usuario.id}`);
        if (response.data.length > 0) setDieta(response.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    if (usuario?.id) obtenerDieta();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuOpen]);

  function handleImprimir() {
    setMenuOpen(false);
    window.print();
  }

  function handleDescargar() {
    setMenuOpen(false);
    if (!dieta) return;
    const blob = new Blob([dieta.contenido], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'mi-dieta.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (cargando) {
    return (
      <>
        <style>{styles}</style>
        <div className="dieta-loading">
          <Loader2 size={32} color="#22c55e" strokeWidth={1.75} className="dieta-spinner" />
          <p className="dieta-loading-text">Cargando plan de dieta</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="dieta-root">
        <Navbar usuario={usuario?.nombre} />
        <div className="dieta-layout">
          <Sidebar />
          <div className="dieta-contenido">

            {/* HEADER */}
            <div className="dieta-header">
              <div className="dieta-badge">
                <span className="dieta-badge-dot" />
                Generado con IA
              </div>
              <h1>Mi Dieta Personalizada</h1>
              <p>Plan nutricional adaptado a tu perfil y objetivos</p>
            </div>

            {/* PILLS */}
            {dieta && (
              <div className="dieta-pills">
                <div className="dieta-pill">
                  <div className="dieta-pill-icon">
                    <Salad size={16} color="#22c55e" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="dieta-pill-label">Estado</p>
                    <p className="dieta-pill-valor">Activo</p>
                  </div>
                </div>

                <div className="dieta-pill">
                  <div className="dieta-pill-icon">
                    <CalendarDays size={16} color="#22c55e" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="dieta-pill-label">Duración</p>
                    <p className="dieta-pill-valor">7 días</p>
                  </div>
                </div>

                <div className="dieta-pill">
                  <div className="dieta-pill-icon">
                    <BrainCircuit size={16} color="#22c55e" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="dieta-pill-label">Fuente</p>
                    <p className="dieta-pill-valor">IA personalizada</p>
                  </div>
                </div>
              </div>
            )}

            {/* CARD */}
            <div className="dieta-card">

              <div className="dieta-card-header">
                <h2 className="dieta-card-titulo">
                  <span className="dieta-card-titulo-icon">
                    <Sparkles size={14} color="#22c55e" strokeWidth={1.75} />
                  </span>
                  Plan generado por inteligencia artificial
                  <span className="dieta-card-tag">NutriScan</span>
                </h2>

                {dieta && (
                  <div
                    className="dieta-dropdown-wrap"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="dieta-btn verde"
                      onClick={() => setMenuOpen(v => !v)}
                    >
                      <Share2 size={13} strokeWidth={2} />
                      Exportar
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`dieta-btn-chevron ${menuOpen ? 'open' : ''}`}
                      />
                    </button>

                    {menuOpen && (
                      <div className="dieta-dropdown">
                        <button className="dieta-dropdown-item" onClick={handleImprimir}>
                          <Printer size={14} color="#22c55e" strokeWidth={1.75} />
                          Imprimir
                        </button>
                        <div className="dieta-dropdown-divider" />
                        <button className="dieta-dropdown-item" onClick={handleDescargar}>
                          <Download size={14} color="#22c55e" strokeWidth={1.75} />
                          Descargar (.txt)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="dieta-card-body">
                {dieta ? (
                  <>
                    <div className="dieta-separador">
                      <span className="dieta-separador-texto">
                        <FileText size={11} color="#1e3a52" strokeWidth={2} />
                        Contenido del plan
                      </span>
                      <span className="dieta-separador-linea" />
                    </div>
                    <div className="dieta-texto">{dieta.contenido}</div>
                  </>
                ) : (
                  <div className="dieta-empty">
                    <div className="dieta-empty-icon">
                      <Salad size={32} color="#22c55e" strokeWidth={1.25} />
                    </div>
                    <h3>Sin plan de dieta aún</h3>
                    <p>Completa tu registro para que la IA genere tu dieta personalizada.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dieta;