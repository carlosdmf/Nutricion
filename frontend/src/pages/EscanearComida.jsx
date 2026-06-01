import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import obtenerSesion from '../utils/obtenerSesion';
import {
  Search, ScanLine, Sparkles, Upload,
  ImagePlus, RefreshCw, Loader2, BrainCircuit,
  X,
} from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .scan-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .scan-root::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .scan-root::after {
    content: '';
    position: fixed;
    bottom: -150px; left: -100px;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .scan-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .scan-contenido {
    flex: 1;
    padding: 48px 56px;
    max-width: 900px;
  }

  /* ── HEADER ── */
  .scan-header {
    margin-bottom: 40px;
    animation: fadeUp 0.5s ease both;
  }

  .scan-badge {
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

  .scan-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .scan-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .scan-header p {
    color: #3d5068;
    font-size: 14.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── TABS ── */
  .scan-tabs {
    display: flex;
    gap: 5px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 14px;
    padding: 5px;
    margin-bottom: 24px;
    width: fit-content;
    animation: fadeUp 0.5s 0.05s ease both;
  }

  .scan-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #2d4155;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.01em;
  }

  .scan-tab:hover:not(.activo) {
    color: #475569;
  }

  .scan-tab.activo {
    background: #0b1120;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }

  .scan-tab.activo.verde { color: #22c55e; }
  .scan-tab.activo.azul  { color: #60a5fa; }

  /* ── CARD ── */
  .scan-card {
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 34px;
    animation: fadeUp 0.5s 0.1s ease both;
    position: relative;
    overflow: hidden;
  }

  .scan-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
  }

  .scan-card.verde::before {
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
  }

  .scan-card.azul::before {
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
  }

  /* ── SECTION TITLE ── */
  .scan-section-title {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 18px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .scan-section-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.04);
  }

  /* ── INPUT ── */
  .scan-input-wrap {
    position: relative;
    margin-bottom: 18px;
  }

  .scan-input {
    width: 100%;
    padding: 15px 18px;
    border-radius: 13px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    color: #f1f5f9;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;
  }

  .scan-input::placeholder { color: #1e3a52; }

  .scan-input:focus {
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 0 0 3px rgba(34,197,94,0.05);
  }

  /* ── UPLOAD AREA ── */
  .scan-upload-area {
    border: 1.5px dashed rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 44px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .scan-upload-area:hover {
    border-color: rgba(59,130,246,0.3);
    background: rgba(59,130,246,0.025);
  }

  .scan-upload-area input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .scan-upload-icon-wrap {
    width: 54px; height: 54px;
    border-radius: 16px;
    background: rgba(59,130,246,0.08);
    border: 1px solid rgba(59,130,246,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
  }

  .scan-upload-titulo {
    color: #3d5068;
    font-size: 14px;
    font-weight: 400;
    margin: 0 0 5px 0;
  }

  .scan-upload-sub {
    color: #1e3a52;
    font-size: 11.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── PREVIEW ── */
  .scan-preview-wrap {
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
  }

  .scan-preview-img {
    width: 280px;
    max-width: 100%;
    border-radius: 16px;
    border: 1px solid rgba(59,130,246,0.22);
    box-shadow: 0 0 30px rgba(59,130,246,0.1);
    display: block;
  }

  .scan-preview-badge {
    position: absolute;
    top: 10px; right: 10px;
    background: rgba(8,12,20,0.85);
    border: 1px solid rgba(59,130,246,0.2);
    color: #60a5fa;
    font-size: 10.5px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 999px;
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* ── BOTONES ── */
  .scan-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
  }

  .scan-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .scan-btn.verde {
    background: rgba(34,197,94,0.09);
    border: 1px solid rgba(34,197,94,0.22);
    color: #22c55e;
  }

  .scan-btn.verde:hover:not(:disabled) {
    background: rgba(34,197,94,0.15);
    border-color: rgba(34,197,94,0.42);
    box-shadow: 0 0 20px rgba(34,197,94,0.1);
    transform: translateY(-1px);
  }

  .scan-btn.azul {
    background: rgba(59,130,246,0.09);
    border: 1px solid rgba(59,130,246,0.22);
    color: #60a5fa;
  }

  .scan-btn.azul:hover:not(:disabled) {
    background: rgba(59,130,246,0.15);
    border-color: rgba(59,130,246,0.42);
    box-shadow: 0 0 20px rgba(59,130,246,0.1);
    transform: translateY(-1px);
  }

  .scan-btn.ghost {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.06);
    color: #2d4155;
  }

  .scan-btn.ghost:hover {
    background: rgba(255,255,255,0.02);
    border-color: rgba(255,255,255,0.1);
    color: #475569;
  }

  .scan-btn-spin { animation: spin 0.7s linear infinite; }

  /* ── RESULTADO ── */
  .scan-resultado {
    margin-top: 24px;
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(34,197,94,0.1);
    padding: 32px;
    animation: fadeUp 0.5s ease both;
    position: relative;
    overflow: hidden;
  }

  .scan-resultado::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
  }

  .scan-resultado-header {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }

  .scan-resultado-icon {
    width: 40px; height: 40px;
    border-radius: 11px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .scan-resultado-titulo {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 3px 0;
    letter-spacing: -0.01em;
  }

  .scan-resultado-sub {
    color: #1e3a52;
    font-size: 12px;
    margin: 0;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .scan-resultado-texto {
    color: #3d5068;
    white-space: pre-wrap;
    line-height: 1.95;
    font-size: 14px;
    font-weight: 300;
    margin: 0;
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
    .scan-contenido { padding: 28px 20px; }
    .scan-header h1 { font-size: 1.9rem; }
  }
`;

function EscanerComida() {
  const usuario = obtenerSesion();

  const [tab, setTab]           = useState('texto');
  const [comida, setComida]     = useState('');
  const [imagen, setImagen]     = useState(null);
  const [preview, setPreview]   = useState('');
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  async function analizarComida() {
    if (!comida.trim()) return;
    try {
      setCargando(true);
      setResultado('');
      const response = await axios.post('http://localhost:5000/escanear-comida', {
        comida,
        usuario_id: usuario.id,
      });
      setResultado(response.data.resultado);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  }

  function manejarImagen(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setImagen(archivo);
    setPreview(URL.createObjectURL(archivo));
  }

  async function analizarImagen() {
    if (!imagen) return;
    try {
      setCargando(true);
      setResultado('');
      const formData = new FormData();
      formData.append('imagen', imagen);
      formData.append('usuario_id', usuario.id);
      const response = await axios.post('http://localhost:5000/escanear-imagen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResultado(response.data.resultado);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="scan-root">
        <Navbar usuario={usuario?.nombre} />
        <div className="scan-layout">
          <Sidebar />
          <div className="scan-contenido">

            {/* HEADER */}
            <div className="scan-header">
              <div className="scan-badge">
                <span className="scan-badge-dot" />
                Análisis con IA
              </div>
              <h1>Escanear Comida</h1>
              <p>Obtén información nutricional detallada usando inteligencia artificial</p>
            </div>

            {/* TABS */}
            <div className="scan-tabs">
              <button
                className={`scan-tab ${tab === 'texto' ? 'activo verde' : ''}`}
                onClick={() => { setTab('texto'); setResultado(''); }}
              >
                <Search size={14} strokeWidth={2} />
                Buscar por nombre
              </button>
              <button
                className={`scan-tab ${tab === 'imagen' ? 'activo azul' : ''}`}
                onClick={() => { setTab('imagen'); setResultado(''); }}
              >
                <ScanLine size={14} strokeWidth={2} />
                Analizar imagen
              </button>
            </div>

            {/* CARD TEXTO */}
            {tab === 'texto' && (
              <div className="scan-card verde">
                <p className="scan-section-title">
                  <Search size={12} strokeWidth={2} />
                  Nombre del alimento
                  <span className="scan-section-line" />
                </p>
                <div className="scan-input-wrap">
                  <input
                    className="scan-input"
                    type="text"
                    placeholder="Ej: Pizza margarita, manzana verde, arroz con pollo..."
                    value={comida}
                    onChange={(e) => setComida(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && analizarComida()}
                  />
                </div>
                <button
                  className="scan-btn verde"
                  onClick={analizarComida}
                  disabled={cargando || !comida.trim()}
                >
                  {cargando
                    ? <><Loader2 size={14} strokeWidth={2} className="scan-btn-spin" /> Analizando...</>
                    : <><Sparkles size={14} strokeWidth={1.75} /> Analizar comida</>
                  }
                </button>
              </div>
            )}

            {/* CARD IMAGEN */}
            {tab === 'imagen' && (
              <div className="scan-card azul">
                <p className="scan-section-title">
                  <ImagePlus size={12} strokeWidth={2} />
                  Subir fotografía
                  <span className="scan-section-line" />
                </p>

                {!preview ? (
                  <div className="scan-upload-area">
                    <input type="file" accept="image/*" onChange={manejarImagen} />
                    <div className="scan-upload-icon-wrap">
                      <Upload size={22} color="#60a5fa" strokeWidth={1.75} />
                    </div>
                    <p className="scan-upload-titulo">Arrastra una imagen o haz clic para seleccionar</p>
                    <p className="scan-upload-sub">JPG, PNG, WEBP — máx. 10 MB</p>
                  </div>
                ) : (
                  <div className="scan-preview-wrap">
                    <img src={preview} alt="preview" className="scan-preview-img" />
                    <span className="scan-preview-badge">
                      <ScanLine size={9} strokeWidth={2} />
                      Vista previa
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    className="scan-btn azul"
                    onClick={analizarImagen}
                    disabled={cargando || !imagen}
                  >
                    {cargando
                      ? <><Loader2 size={14} strokeWidth={2} className="scan-btn-spin" /> Analizando imagen...</>
                      : <><ScanLine size={14} strokeWidth={1.75} /> Escanear imagen</>
                    }
                  </button>
                  {preview && (
                    <button
                      className="scan-btn ghost"
                      onClick={() => { setImagen(null); setPreview(''); setResultado(''); }}
                    >
                      <X size={14} strokeWidth={2} />
                      Cambiar imagen
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* RESULTADO */}
            {resultado && (
              <div className="scan-resultado">
                <div className="scan-resultado-header">
                  <div className="scan-resultado-icon">
                    <BrainCircuit size={20} color="#22c55e" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="scan-resultado-titulo">Análisis nutricional</p>
                    <p className="scan-resultado-sub">
                      <Sparkles size={10} strokeWidth={2} />
                      Generado por inteligencia artificial
                    </p>
                  </div>
                </div>
                <p className="scan-resultado-texto">{resultado}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default EscanerComida;