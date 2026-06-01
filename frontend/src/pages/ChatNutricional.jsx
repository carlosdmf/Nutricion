import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  .chat-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .chat-root::before {
    content: '';
    position: fixed;
    top: -200px; right: -200px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .chat-root::after {
    content: '';
    position: fixed;
    bottom: -150px; left: -100px;
    width: 440px; height: 440px;
    background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .chat-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .chat-contenido {
    flex: 1;
    padding: 48px 56px;
    display: flex;
    flex-direction: column;
    max-width: 860px;
  }

  /* ---- HEADER ---- */
  .chat-header {
    margin-bottom: 36px;
    animation: fadeUp 0.5s ease both;
  }

  .chat-badge {
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

  .chat-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .chat-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: 2.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 10px 0;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .chat-header p {
    color: #475569;
    font-size: 14.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ---- SUGERENCIAS ---- */
  .chat-sugerencias {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 28px;
    animation: fadeUp 0.5s 0.05s ease both;
  }

  .chat-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    color: #64748b;
    font-size: 12.5px;
    font-weight: 400;
    padding: 7px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .chat-chip:hover {
    background: rgba(34,197,94,0.07);
    border-color: rgba(34,197,94,0.2);
    color: #22c55e;
  }

  /* ---- HISTORIAL MENSAJES ---- */
  .chat-mensajes {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
    min-height: 60px;
    animation: fadeUp 0.5s 0.08s ease both;
  }

  .chat-burbuja-wrap {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    animation: fadeUp 0.35s ease both;
  }

  .chat-burbuja-wrap.usuario { flex-direction: row-reverse; }

  .chat-avatar {
    width: 34px; height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .chat-avatar.ia {
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.18);
  }

  .chat-avatar.usuario {
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.2);
  }

  .chat-burbuja {
    max-width: 75%;
    padding: 14px 18px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.75;
    font-weight: 300;
    white-space: pre-wrap;
  }

  .chat-burbuja.ia {
    background: #0e1420;
    border: 1px solid rgba(255,255,255,0.05);
    color: #94a3b8;
    border-top-left-radius: 4px;
  }

  .chat-burbuja.usuario {
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.15);
    color: #c7d2fe;
    border-top-right-radius: 4px;
    text-align: right;
  }

  /* ---- TYPING INDICATOR ---- */
  .chat-typing {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeUp 0.3s ease both;
  }

  .chat-typing-dots {
    display: flex;
    gap: 5px;
    padding: 14px 18px;
    background: #0e1420;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    border-top-left-radius: 4px;
  }

  .chat-typing-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #334155;
    animation: typingBounce 1.2s ease infinite;
  }

  .chat-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing-dot:nth-child(3) { animation-delay: 0.4s; }

  /* ---- INPUT AREA ---- */
  .chat-input-card {
    background: #0e1420;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 20px 22px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s ease;
    animation: fadeUp 0.5s 0.1s ease both;
  }

  .chat-input-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent);
  }

  .chat-input-card:focus-within {
    border-color: rgba(34,197,94,0.2);
  }

  .chat-textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    font-weight: 300;
    line-height: 1.7;
    resize: none;
    min-height: 72px;
    box-sizing: border-box;
  }

  .chat-textarea::placeholder { color: #334155; }

  .chat-input-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.04);
  }

  .chat-input-hint {
    color: #334155;
    font-size: 12px;
    font-weight: 300;
  }

  .chat-input-hint kbd {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 5px;
    padding: 2px 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #475569;
  }

  .chat-send-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.25);
    color: #22c55e;
    padding: 11px 22px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
  }

  .chat-send-btn:hover:not(:disabled) {
    background: rgba(34,197,94,0.16);
    border-color: rgba(34,197,94,0.45);
    box-shadow: 0 0 20px rgba(34,197,94,0.1);
    transform: translateY(-1px);
  }

  .chat-send-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .chat-send-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(34,197,94,0.2);
    border-top-color: #22c55e;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* ---- ANIMATIONS ---- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); background: #334155; }
    30%            { transform: translateY(-5px); background: #22c55e; }
  }

  @media (max-width: 768px) {
    .chat-contenido { padding: 28px 20px; }
    .chat-header h1 { font-size: 1.9rem; }
    .chat-burbuja   { max-width: 90%; }
  }
`;

const SUGERENCIAS = [
  { icono: '🥗', texto: '¿Cuántas calorías tiene una ensalada César?' },
  { icono: '💪', texto: '¿Qué comer antes de entrenar?' },
  { icono: '🧬', texto: '¿Cuánta proteína necesito al día?' },
  { icono: '🍎', texto: '¿Cuáles son los alimentos más nutritivos?' },
];

function ChatNutricional() {

  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historial, cargando]);

  async function enviarMensaje(textoOverride) {
    const texto = (textoOverride || mensaje).trim();
    if (!texto || cargando) return;

    const nuevoHistorial = [...historial, { rol: 'usuario', texto }];
    setHistorial(nuevoHistorial);
    setMensaje('');
    setCargando(true);

    try {
      const response = await axios.post('http://localhost:5000/chat-nutricional', { mensaje: texto });
      setHistorial([...nuevoHistorial, { rol: 'ia', texto: response.data.respuesta }]);
    } catch (error) {
      console.log(error);
      setHistorial([...nuevoHistorial, { rol: 'ia', texto: 'Ocurrió un error al consultar la IA. Intenta de nuevo.' }]);
    } finally {
      setCargando(false);
    }
  }

  function manejarTecla(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="chat-root">
        <Navbar />
        <div className="chat-layout">
          <Sidebar />
          <div className="chat-contenido">

            {/* HEADER */}
            <div className="chat-header">
              <div className="chat-badge">
                <span className="chat-badge-dot" />
                Asistente nutricional
              </div>
              <h1>Chat Nutricional IA</h1>
              <p>Consulta dudas sobre alimentación, macros y hábitos saludables</p>
            </div>

            {/* SUGERENCIAS — solo si no hay historial */}
            {historial.length === 0 && (
              <div className="chat-sugerencias">
                {SUGERENCIAS.map(({ icono, texto }) => (
                  <button
                    key={texto}
                    className="chat-chip"
                    onClick={() => enviarMensaje(texto)}
                  >
                    {icono} {texto}
                  </button>
                ))}
              </div>
            )}

            {/* MENSAJES */}
            {historial.length > 0 && (
              <div className="chat-mensajes">
                {historial.map((msg, i) => (
                  <div key={i} className={`chat-burbuja-wrap ${msg.rol}`}>
                    <div className={`chat-avatar ${msg.rol}`}>
                      {msg.rol === 'ia' ? '🤖' : '👤'}
                    </div>
                    <div className={`chat-burbuja ${msg.rol}`}>
                      {msg.texto}
                    </div>
                  </div>
                ))}

                {cargando && (
                  <div className="chat-typing">
                    <div className="chat-avatar ia">🤖</div>
                    <div className="chat-typing-dots">
                      <div className="chat-typing-dot" />
                      <div className="chat-typing-dot" />
                      <div className="chat-typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            )}

            {/* INPUT */}
            <div className="chat-input-card">
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                placeholder="Pregunta algo sobre nutrición... (Enter para enviar)"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyDown={manejarTecla}
              />
              <div className="chat-input-footer">
                <p className="chat-input-hint">
                  <kbd>Enter</kbd> enviar &nbsp;·&nbsp; <kbd>Shift+Enter</kbd> nueva línea
                </p>
                <button
                  className="chat-send-btn"
                  onClick={() => enviarMensaje()}
                  disabled={cargando || !mensaje.trim()}
                >
                  {cargando
                    ? <><span className="chat-send-spinner" /> Consultando...</>
                    : <><span>✦</span> Enviar</>
                  }
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ChatNutricional;