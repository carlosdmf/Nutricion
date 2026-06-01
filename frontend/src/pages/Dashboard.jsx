import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, BarElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import obtenerSesion from '../utils/obtenerSesion';
import {
  Weight, Flame, Droplets, TrendingDown, TrendingUp,
  Save, Loader2, TrendingDownIcon, PieChart, BarChart2,
  LineChart, ChartNoAxesColumn,
} from 'lucide-react';

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, BarElement,
  Title, Tooltip, Legend, Filler
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .dash-root {
    min-height: 100vh;
    background: #080c14;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .dash-root::before {
    content: '';
    position: fixed;
    top: -220px; right: -220px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .dash-root::after {
    content: '';
    position: fixed;
    bottom: -160px; left: -120px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .dash-layout {
    display: flex;
    position: relative;
    z-index: 1;
  }

  .dash-contenido {
    flex: 1;
    padding: 48px 56px;
  }

  /* ── HEADER ── */
  .dash-header {
    margin-bottom: 44px;
    animation: fadeUp 0.5s ease both;
  }

  .dash-badge {
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

  .dash-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: pulse 2s ease infinite;
  }

  .dash-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 10px 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .dash-header p {
    color: #3d5068;
    font-size: 14.5px;
    margin: 0;
    font-weight: 300;
  }

  /* ── PILLS ── */
  .dash-pills {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 32px;
    animation: fadeUp 0.5s 0.05s ease both;
  }

  .dash-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #0b1120;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 14px;
    padding: 14px 20px;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .dash-pill:hover {
    border-color: rgba(255,255,255,0.09);
    transform: translateY(-1px);
  }

  .dash-pill-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dash-pill-icon.green  { background: rgba(34,197,94,0.1);  border: 1px solid rgba(34,197,94,0.15); }
  .dash-pill-icon.orange { background: rgba(249,115,22,0.1);  border: 1px solid rgba(249,115,22,0.15); }
  .dash-pill-icon.blue   { background: rgba(59,130,246,0.1);  border: 1px solid rgba(59,130,246,0.15); }
  .dash-pill-icon.purple { background: rgba(168,85,247,0.1);  border: 1px solid rgba(168,85,247,0.15); }
  .dash-pill-icon.red    { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.15); }

  .dash-pill-label {
    color: #2d4155;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    margin: 0 0 3px 0;
  }

  .dash-pill-valor {
    font-size: 1rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0;
    letter-spacing: -0.01em;
  }

  /* ── REGISTRO PESO ── */
  .dash-registro {
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 28px 30px;
    margin-bottom: 28px;
    animation: fadeUp 0.5s 0.08s ease both;
    position: relative;
    overflow: hidden;
  }

  .dash-registro::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent);
  }

  .dash-registro-inner {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    flex-wrap: wrap;
  }

  .dash-registro-field { flex: 1; min-width: 200px; }

  .dash-registro-label {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    gap: 7px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .dash-registro-input {
    width: 100%;
    padding: 13px 17px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    color: #f1f5f9;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 300;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    -moz-appearance: textfield;
  }

  .dash-registro-input::-webkit-outer-spin-button,
  .dash-registro-input::-webkit-inner-spin-button { -webkit-appearance: none; }

  .dash-registro-input::placeholder { color: #1e3a52; }

  .dash-registro-input:focus {
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 0 0 3px rgba(34,197,94,0.05);
  }

  .dash-registro-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.25);
    color: #22c55e;
    padding: 13px 24px;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  .dash-registro-btn:hover:not(:disabled) {
    background: rgba(34,197,94,0.16);
    border-color: rgba(34,197,94,0.45);
    box-shadow: 0 0 20px rgba(34,197,94,0.1);
    transform: translateY(-1px);
  }

  .dash-registro-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .dash-registro-btn .spin {
    animation: spin 0.8s linear infinite;
  }

  /* ── CHARTS GRID ── */
  .dash-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 22px;
    animation: fadeUp 0.5s 0.12s ease both;
  }

  /* ── CHART CARD ── */
  .dash-chart-card {
    background: #0b1120;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.05);
    padding: 26px 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.25s ease, transform 0.25s ease;
  }

  .dash-chart-card:hover {
    border-color: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }

  .dash-chart-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dash-chart-card:hover::before { opacity: 1; }
  .dash-chart-card.line::before   { background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent); }
  .dash-chart-card.donut::before  { background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent); }
  .dash-chart-card.bar::before    { background: linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent); }

  .dash-chart-title {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .dash-chart-title-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.04);
  }

  .dash-chart-sub {
    color: #1e3a52;
    font-size: 12px;
    font-weight: 300;
    margin: 0 0 22px 0;
  }

  /* ── DONUT ── */
  .dash-donut-wrap {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  .dash-donut-chart { flex: 1; max-width: 170px; }

  .dash-donut-legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .dash-legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dash-legend-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dash-legend-label {
    color: #3d5068;
    font-size: 12.5px;
    flex: 1;
  }

  .dash-legend-val {
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
  }

  /* ── EMPTY ── */
  .dash-empty-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: #1e293b;
    font-size: 13px;
    gap: 10px;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .dash-contenido { padding: 28px 20px; }
    .dash-header h1 { font-size: 1.9rem; }
    .dash-grid { grid-template-columns: 1fr; }
    .dash-donut-wrap { flex-direction: column; }
  }
`;

const chartDefaults = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0b1120',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      padding: 12,
      cornerRadius: 10,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
      ticks: { color: '#2d4155', font: { family: 'Outfit', size: 11 } },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
      ticks: { color: '#2d4155', font: { family: 'Outfit', size: 11 } },
    },
  },
};

function Dashboard() {
  const usuario = obtenerSesion();
  const [progreso, setProgreso] = useState([]);
  const [pesoNuevo, setPesoNuevo] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => { obtenerProgreso(); }, []);

  async function obtenerProgreso() {
    try {
      const response = await axios.get(`http://localhost:5000/dashboard/${usuario.id}`);
      setProgreso(response.data);
    } catch (error) { console.log(error); }
  }

  async function guardarPeso() {
    if (!pesoNuevo) return;
    try {
      setGuardando(true);
      await axios.post('http://localhost:5000/progreso', {
        usuario_id: usuario.id,
        peso: pesoNuevo,
      });
      setPesoNuevo('');
      obtenerProgreso();
    } catch (error) { console.log(error); }
    finally { setGuardando(false); }
  }

  const lineData = {
    labels: progreso.map(i => new Date(i.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })),
    datasets: [{
      label: 'Peso corporal',
      data: progreso.map(i => i.peso),
      borderColor: '#22c55e',
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        g.addColorStop(0, 'rgba(34,197,94,0.18)');
        g.addColorStop(1, 'rgba(34,197,94,0)');
        return g;
      },
      tension: 0.45,
      borderWidth: 2.5,
      pointRadius: 4,
      pointBackgroundColor: '#22c55e',
      pointBorderColor: '#080c14',
      pointBorderWidth: 2,
      fill: true,
    }],
  };

  const doughnutData = {
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b'],
      borderColor: '#080c14',
      borderWidth: 3,
      hoverOffset: 6,
    }],
  };

  const barData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Calorías quemadas',
      data: [400, 500, 350, 650, 700, 450, 600],
      backgroundColor: (ctx) => {
        const max = Math.max(...[400, 500, 350, 650, 700, 450, 600]);
        return ctx.raw === max ? 'rgba(249,115,22,0.7)' : 'rgba(249,115,22,0.22)';
      },
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const pesoActual   = progreso.length > 0 ? progreso[progreso.length - 1].peso : '—';
  const diferencia   = progreso.length > 1
    ? (progreso[progreso.length - 1].peso - progreso[0].peso).toFixed(1)
    : null;
  const bajando      = diferencia !== null && parseFloat(diferencia) <= 0;

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        <Navbar usuario={usuario?.nombre} />
        <div className="dash-layout">
          <Sidebar />
          <div className="dash-contenido">

            {/* HEADER */}
            <div className="dash-header">
              <div className="dash-badge">
                <span className="dash-badge-dot" />
                Resumen general
              </div>
              <h1>Dashboard</h1>
              <p>Evolución de peso, nutrientes y actividad semanal</p>
            </div>

            {/* PILLS */}
            <div className="dash-pills">

              <div className="dash-pill">
                <div className="dash-pill-icon green">
                  <Weight size={17} color="#22c55e" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="dash-pill-label">Peso actual</p>
                  <p className="dash-pill-valor">{pesoActual} kg</p>
                </div>
              </div>

              <div className="dash-pill">
                <div className="dash-pill-icon orange">
                  <Flame size={17} color="#fb923c" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="dash-pill-label">Calorías hoy</p>
                  <p className="dash-pill-valor">2,200 kcal</p>
                </div>
              </div>

              <div className="dash-pill">
                <div className="dash-pill-icon blue">
                  <Droplets size={17} color="#60a5fa" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="dash-pill-label">Hidratación</p>
                  <p className="dash-pill-valor">2.0 L</p>
                </div>
              </div>

              {diferencia !== null && (
                <div className="dash-pill">
                  <div className={`dash-pill-icon ${bajando ? 'green' : 'red'}`}>
                    {bajando
                      ? <TrendingDown size={17} color="#4ade80" strokeWidth={1.75} />
                      : <TrendingUp   size={17} color="#f87171" strokeWidth={1.75} />
                    }
                  </div>
                  <div>
                    <p className="dash-pill-label">Variación total</p>
                    <p className="dash-pill-valor" style={{ color: bajando ? '#4ade80' : '#f87171' }}>
                      {diferencia > 0 ? `+${diferencia}` : diferencia} kg
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* REGISTRAR PESO */}
            <div className="dash-registro">
              <div className="dash-registro-inner">
                <div className="dash-registro-field">
                  <p className="dash-registro-label">
                    <Weight size={13} color="#22c55e" strokeWidth={2} />
                    Registrar nuevo peso
                  </p>
                  <input
                    className="dash-registro-input"
                    type="number"
                    placeholder="Ej: 78.5 kg"
                    value={pesoNuevo}
                    onChange={(e) => setPesoNuevo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && guardarPeso()}
                  />
                </div>
                <button
                  className="dash-registro-btn"
                  onClick={guardarPeso}
                  disabled={guardando || !pesoNuevo}
                >
                  {guardando
                    ? <><Loader2 size={15} strokeWidth={2} className="spin" /> Guardando…</>
                    : <><Save    size={15} strokeWidth={1.75} /> Guardar progreso</>
                  }
                </button>
              </div>
            </div>

            {/* CHARTS */}
            <div className="dash-grid">

              {/* LÍNEA */}
              <div className="dash-chart-card line">
                <p className="dash-chart-title">
                  <LineChart size={13} strokeWidth={2} />
                  Evolución de peso
                  <span className="dash-chart-title-line" />
                </p>
                <p className="dash-chart-sub">Historial de registros en el tiempo</p>
                {progreso.length === 0 ? (
                  <div className="dash-empty-chart">
                    <TrendingDown size={32} color="#1e293b" strokeWidth={1.5} />
                    Sin registros todavía
                  </div>
                ) : (
                  <Line data={lineData} options={{ ...chartDefaults }} />
                )}
              </div>

              {/* DONUT */}
              <div className="dash-chart-card donut">
                <p className="dash-chart-title">
                  <PieChart size={13} strokeWidth={2} />
                  Distribución de nutrientes
                  <span className="dash-chart-title-line" />
                </p>
                <p className="dash-chart-sub">Macros del día actual</p>
                <div className="dash-donut-wrap">
                  <div className="dash-donut-chart">
                    <Doughnut
                      data={doughnutData}
                      options={{
                        responsive: true,
                        cutout: '72%',
                        plugins: { legend: { display: false }, tooltip: chartDefaults.plugins.tooltip },
                      }}
                    />
                  </div>
                  <div className="dash-donut-legend">
                    {[
                      { label: 'Proteínas',     val: '40%', color: '#22c55e' },
                      { label: 'Carbohidratos', val: '35%', color: '#3b82f6' },
                      { label: 'Grasas',        val: '25%', color: '#f59e0b' },
                    ].map(({ label, val, color }) => (
                      <div className="dash-legend-item" key={label}>
                        <div className="dash-legend-dot" style={{ background: color }} />
                        <span className="dash-legend-label">{label}</span>
                        <span className="dash-legend-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BARRAS */}
              <div className="dash-chart-card bar">
                <p className="dash-chart-title">
                  <ChartNoAxesColumn size={13} strokeWidth={2} />
                  Calorías semanales
                  <span className="dash-chart-title-line" />
                </p>
                <p className="dash-chart-sub">Calorías quemadas por día esta semana</p>
                <Bar data={barData} options={{ ...chartDefaults }} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;