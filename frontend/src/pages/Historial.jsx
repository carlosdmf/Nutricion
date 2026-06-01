import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import obtenerSesion from '../utils/obtenerSesion';
import {
  ScanLine, Search, ChevronDown, ChevronUp,
  Loader2, Inbox, Hash, Sparkles, Clock,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .hist-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .hist-root::before {
    content: '';
    position: fixed;
    top: -180px; right: -180px;
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .hist-root::after {
    content: '';
    position: fixed;
    bottom: -120px; left: -80px;
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .hist-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .hist-contenido {
    flex: 1;
    padding: 48px 56px;
  }

  /* ── HEADER ── */
  .hist-header {
    margin-bottom: 44px;
    animation: fadeUp 0.5s ease both;
  }

  .hist-badge {
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

  .hist-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .hist-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .hist-header p {
    color: #3d5068;
    font-size: 14.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── META ── */
  .hist-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
    animation: fadeUp 0.5s 0.05s ease both;
  }

  .hist-count {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #0b1120;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 10px 16px;
  }

  .hist-count-num {
    font-size: 1.15rem;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }

  .hist-count-label {
    color: #2d4155;
    font-size: 13px;
    font-weight: 400;
  }

  /* ── GRID ── */
  .hist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    animation: fadeUp 0.5s 0.1s ease both;
  }

  /* ── TARJETA ── */
  .hist-card {
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: transform 0.25s ease, border-color 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .hist-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hist-card.tipo-imagen::before {
    background: linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent);
  }

  .hist-card.tipo-busqueda::before {
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent);
  }

  .hist-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255,255,255,0.08);
  }

  .hist-card:hover::before { opacity: 1; }

  /* ── CARD HEADER ── */
  .hist-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .hist-card-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .hist-tipo-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .hist-tipo-icon.imagen {
    background: rgba(37,99,235,0.1);
    border: 1px solid rgba(37,99,235,0.18);
  }

  .hist-tipo-icon.busqueda {
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.15);
  }

  .hist-tipo-label {
    font-size: 14px;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 3px 0;
    letter-spacing: -0.01em;
  }

  .hist-tipo-fecha {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #2d4155;
    font-size: 11.5px;
    font-weight: 400;
  }

  .hist-tipo-badge {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .hist-tipo-badge.imagen {
    background: rgba(37,99,235,0.09);
    color: #60a5fa;
    border: 1px solid rgba(37,99,235,0.18);
  }

  .hist-tipo-badge.busqueda {
    background: rgba(34,197,94,0.07);
    color: #4ade80;
    border: 1px solid rgba(34,197,94,0.15);
  }

  /* ── DIVIDER ── */
  .hist-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
  }

  /* ── CONSULTA ── */
  .hist-consulta-label {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #1e3a52;
    margin: 0 0 7px 0;
  }

  .hist-consulta-texto {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    font-weight: 400;
  }

  /* ── RESULTADO ── */
  .hist-resultado {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 13px;
    padding: 16px;
    flex: 1;
  }

  .hist-resultado-label {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #1e3a52;
    margin: 0 0 9px 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .hist-resultado-texto {
    color: #3d5068;
    font-size: 13px;
    line-height: 1.75;
    margin: 0;
    font-weight: 300;
    font-style: italic;
  }

  /* ── EMPTY ── */
  .hist-empty {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    background: #0b1120;
    border-radius: 20px;
    border: 1px dashed rgba(255,255,255,0.06);
    text-align: center;
    animation: fadeUp 0.5s ease both;
  }

  .hist-empty-icon {
    width: 68px; height: 68px;
    background: rgba(34,197,94,0.05);
    border: 1px solid rgba(34,197,94,0.1);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }

  .hist-empty h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1e3a52;
    margin: 0 0 8px 0;
  }

  .hist-empty p {
    color: #152535;
    font-size: 13.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── VER MÁS ── */
  .hist-btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    animation: fadeUp 0.4s ease both;
  }

  .hist-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #22c55e;
    border: 1px solid rgba(34,197,94,0.22);
    padding: 12px 30px;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
  }

  .hist-btn:hover {
    background: rgba(34,197,94,0.06);
    border-color: rgba(34,197,94,0.5);
    box-shadow: 0 0 20px rgba(34,197,94,0.1);
    transform: translateY(-1px);
  }

  /* ── LOADING ── */
  .hist-loading {
    min-height: 100vh;
    background: #080c14;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 14px;
  }

  .hist-spinner { animation: spin 0.75s linear infinite; }

  .hist-loading-text {
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

  @media (max-width: 768px) {
    .hist-contenido { padding: 28px 20px; }
    .hist-header h1 { font-size: 1.9rem; }
    .hist-grid { grid-template-columns: 1fr; }
  }
`;

function Historial() {
  const usuario = obtenerSesion();
  const [historial, setHistorial]             = useState([]);
  const [historialCompleto, setHistorialCompleto] = useState(false);
  const [cargando, setCargando]               = useState(true);

  useEffect(() => {
    async function obtenerHistorial() {
      try {
        const response = await axios.get(`http://localhost:5000/historial/${usuario.id}`);
        setHistorial(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    }
    obtenerHistorial();
  }, []);

  if (cargando) {
    return (
      <>
        <style>{styles}</style>
        <div className="hist-loading">
          <Loader2 size={32} color="#22c55e" strokeWidth={1.75} className="hist-spinner" />
          <p className="hist-loading-text">Cargando historial</p>
        </div>
      </>
    );
  }

  const historialVisible = historialCompleto ? historial : historial.slice(0, 3);

  return (
    <>
      <style>{styles}</style>
      <div className="hist-root">
        <Navbar usuario={usuario?.nombre} />
        <div className="hist-layout">
          <Sidebar />
          <div className="hist-contenido">

            {/* HEADER */}
            <div className="hist-header">
              <div className="hist-badge">
                <span className="hist-badge-dot" />
                Registro de actividad
              </div>
              <h1>Historial Nutricional</h1>
              <p>Búsquedas y escaneos realizados con inteligencia artificial</p>
            </div>

            {/* META */}
            {historial.length > 0 && (
              <div className="hist-meta">
                <div className="hist-count">
                  <Hash size={14} color="#22c55e" strokeWidth={2} />
                  <span className="hist-count-num">{historial.length}</span>
                  <span className="hist-count-label">
                    {historial.length === 1 ? 'consulta registrada' : 'consultas registradas'}
                  </span>
                </div>
              </div>
            )}

            {/* GRID */}
            <div className="hist-grid">
              {historial.length === 0 ? (
                <div className="hist-empty">
                  <div className="hist-empty-icon">
                    <Inbox size={30} color="#22c55e" strokeWidth={1.25} />
                  </div>
                  <h3>Sin historial todavía</h3>
                  <p>Las búsquedas y escaneos que realices aparecerán aquí</p>
                </div>
              ) : (
                historialVisible.map((item, i) => (
                  <TarjetaHistorial key={item.id} item={item} index={i} />
                ))
              )}
            </div>

            {/* VER MÁS */}
            {historial.length > 3 && (
              <div className="hist-btn-wrap">
                <button
                  className="hist-btn"
                  onClick={() => setHistorialCompleto(!historialCompleto)}
                >
                  {historialCompleto ? (
                    <><ChevronUp size={15} strokeWidth={2} /> Ver menos</>
                  ) : (
                    <><ChevronDown size={15} strokeWidth={2} /> Ver {historial.length - 3} más</>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

// ── TARJETA ───────────────────────────────────────────────

function TarjetaHistorial({ item, index }) {
  const esImagen  = item.tipo === 'imagen';
  const tipoClase = esImagen ? 'imagen' : 'busqueda';

  const fechaFormateada = new Date(item.fecha).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const resultadoCorto = item.resultado?.length > 200
    ? item.resultado.substring(0, 200) + '…'
    : item.resultado;

  return (
    <div
      className={`hist-card tipo-${tipoClase}`}
      style={{ animationDelay: `${index * 0.06}s`, animation: 'fadeUp 0.5s ease both' }}
    >
      {/* HEADER */}
      <div className="hist-card-header">
        <div className="hist-card-header-left">
          <div className={`hist-tipo-icon ${tipoClase}`}>
            {esImagen
              ? <ScanLine size={18} color="#60a5fa" strokeWidth={1.75} />
              : <Search   size={18} color="#4ade80" strokeWidth={1.75} />
            }
          </div>
          <div>
            <p className="hist-tipo-label">
              {esImagen ? 'Escaneo IA' : 'Búsqueda IA'}
            </p>
            <p className="hist-tipo-fecha">
              <Clock size={10} strokeWidth={2} />
              {fechaFormateada}
            </p>
          </div>
        </div>
        <span className={`hist-tipo-badge ${tipoClase}`}>
          {esImagen
            ? <ScanLine size={10} strokeWidth={2} />
            : <Search   size={10} strokeWidth={2} />
          }
          {esImagen ? 'imagen' : 'texto'}
        </span>
      </div>

      <div className="hist-divider" />

      {/* CONSULTA */}
      <div>
        <p className="hist-consulta-label">Consulta</p>
        <p className="hist-consulta-texto">{item.consulta}</p>
      </div>

      {/* RESULTADO */}
      <div className="hist-resultado">
        <p className="hist-resultado-label">
          <Sparkles size={10} color="#1e3a52" strokeWidth={2} />
          Respuesta IA
        </p>
        <p className="hist-resultado-texto">{resultadoCorto}</p>
      </div>
    </div>
  );
}

export default Historial;