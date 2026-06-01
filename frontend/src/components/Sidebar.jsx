// components/Sidebar.jsx

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Salad,
  CalendarDays,
  ScanLine,
  BrainCircuit,
  LogOut,
  Sparkles,
} from 'lucide-react';

const LINKS = [
  { to: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard'      },
  { to: '/perfil',    Icon: UserCircle,      label: 'Perfil'          },
  { to: '/dieta',     Icon: Salad,           label: 'Mi dieta'        },
  { to: '/historial', Icon: CalendarDays,    label: 'Historial'       },
  { to: '/escanear',  Icon: ScanLine,        label: 'Escanear comida' },
  { to: '/chat',      Icon: BrainCircuit,    label: 'Chat IA'         },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function cerrarSesion() {
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .sb-root {
          width: 264px;
          min-height: 100vh;
          background: #080d14;
          border-right: 1px solid rgba(255,255,255,0.04);
          padding: 24px 16px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          flex-shrink: 0;
          font-family: 'Outfit', sans-serif;
        }

        /* glow lateral */
        .sb-root::after {
          content: '';
          position: absolute;
          top: 10%; bottom: 10%;
          right: -1px;
          width: 1px;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(34,197,94,0.25) 40%,
            rgba(34,197,94,0.25) 60%,
            transparent 100%
          );
        }

        /* ── LOGO ── */
        .sb-logo-wrap {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 10px 14px;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .sb-logo-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(16,185,129,0.08) 100%);
          border: 1px solid rgba(34,197,94,0.22);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .sb-logo-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(34,197,94,0.15), transparent 70%);
        }

        .sb-logo-text { line-height: 1.2; }

        .sb-logo-name {
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }

        .sb-logo-name span { color: #22c55e; }

        .sb-logo-sub {
          font-size: 10.5px;
          font-weight: 300;
          color: #2d3f52;
          letter-spacing: 0.03em;
          margin-top: 1px;
        }

        /* ── NAV SECTION ── */
        .sb-section-label {
          font-size: 9.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #1a2535;
          padding: 20px 12px 8px;
        }

        /* ── LINKS ── */
        .sb-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .sb-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 400;
          color: #3d5068;
          border: 1px solid transparent;
          transition: all 0.18s ease;
          position: relative;
          white-space: nowrap;
        }

        .sb-link-icon {
          flex-shrink: 0;
          transition: color 0.18s ease, transform 0.18s ease;
          color: #243040;
        }

        .sb-link:hover {
          color: #7a95b0;
          background: rgba(255,255,255,0.025);
        }

        .sb-link:hover .sb-link-icon {
          color: #5a7a95;
          transform: translateX(1px);
        }

        .sb-link.active {
          color: #dcfce7;
          background: rgba(34,197,94,0.09);
          border-color: rgba(34,197,94,0.14);
          font-weight: 500;
        }

        .sb-link.active .sb-link-icon {
          color: #22c55e;
        }

        .sb-link.active::before {
          content: '';
          position: absolute;
          left: 0; top: 22%; bottom: 22%;
          width: 2.5px;
          border-radius: 999px;
          background: linear-gradient(180deg, #4ade80, #16a34a);
          box-shadow: 0 0 10px rgba(34,197,94,0.55);
        }

        /* dot activo */
        .sb-link.active::after {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.7);
        }

        /* ── FOOTER ZONA ── */
        .sb-footer {
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        /* versión / badge */
        .sb-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.08);
          margin-bottom: 10px;
        }

        .sb-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
          flex-shrink: 0;
          animation: pulse 2.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.6); }
          50%       { opacity: 0.55; box-shadow: 0 0 4px rgba(34,197,94,0.3); }
        }

        .sb-badge-text {
          font-size: 11px;
          font-weight: 500;
          color: #1e3a28;
          letter-spacing: 0.02em;
        }

        .sb-badge-text span {
          color: #22c55e;
        }

        /* ── CERRAR SESIÓN ── */
        .sb-logout {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.12);
          background: rgba(248,113,113,0.05);
          color: #7a4040;
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 11px;
          transition: all 0.18s ease;
        }

        .sb-logout:hover {
          background: rgba(248,113,113,0.11);
          border-color: rgba(248,113,113,0.28);
          color: #f87171;
        }

        .sb-logout:hover .sb-logout-icon {
          color: #f87171;
          transform: translateX(-1px);
        }

        .sb-logout-icon {
          flex-shrink: 0;
          transition: color 0.18s ease, transform 0.18s ease;
        }
      `}</style>

      <div className="sb-root">

        {/* ── LOGO ── */}
        <div className="sb-logo-wrap">
          <div className="sb-logo-icon">
            <Sparkles size={16} color="#22c55e" strokeWidth={1.8} style={{ position: 'relative', zIndex: 1 }} />
          </div>
          <div className="sb-logo-text">
            <div className="sb-logo-name">NutriScan <span>AI</span></div>
            <div className="sb-logo-sub">Sistema nutricional inteligente</div>
          </div>
        </div>

        {/* ── MENÚ ── */}
        <div className="sb-section-label">Menú principal</div>

        <nav className="sb-nav">
          {LINKS.map(({ to, Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`sb-link ${location.pathname === to ? 'active' : ''}`}
            >
              <Icon size={16} strokeWidth={1.75} className="sb-link-icon" />
              {label}
            </Link>
          ))}
        </nav>

        {/* ── FOOTER ── */}
        <div className="sb-footer">

          <div className="sb-badge">
            <div className="sb-badge-dot" />
            <span className="sb-badge-text">Modelo <span>GPT-4o</span> activo</span>
          </div>

          <button className="sb-logout" onClick={cerrarSesion}>
            <LogOut size={15} strokeWidth={1.75} className="sb-logout-icon" />
            Cerrar sesión
          </button>

        </div>
      </div>
    </>
  );
}

export default Sidebar;