// components/Navbar.jsx

function Navbar({ usuario = 'Usuario', onCerrarSesion }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes navPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <nav style={{
        width: '100%',
        background: '#0e1420',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'DM Sans', sans-serif",
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxSizing: 'border-box',
      }}>

        {/* Línea decorativa inferior */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.2), transparent)',
        }} />

        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '10px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '17px',
            boxShadow: '0 0 16px rgba(34,197,94,0.1)',
          }}>
            🥗
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '16px',
            fontWeight: '800',
            color: '#f1f5f9',
            letterSpacing: '-0.02em',
          }}>
            NutriScan{' '}
            <span style={{ color: '#22c55e' }}>AI</span>
          </span>
        </div>

        {/* USUARIO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Badge online */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '999px',
            padding: '7px 14px',
          }}>
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 6px rgba(34,197,94,0.8)',
              animation: 'navPulse 2s ease infinite',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: '300',
              color: '#475569',
            }}>
              Hola,{' '}
              <span style={{
                fontWeight: '500',
                color: '#94a3b8',
              }}>
                {usuario}
              </span>
            </span>
          </div>

          {/* Botón cerrar sesión */}
          {onCerrarSesion && (
            <button
              onClick={onCerrarSesion}
              style={{
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.15)',
                borderRadius: '10px',
                padding: '7px 14px',
                color: '#f87171',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(248,113,113,0.14)';
                e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(248,113,113,0.08)';
                e.currentTarget.style.borderColor = 'rgba(248,113,113,0.15)';
              }}
            >
              Salir
            </button>
          )}

        </div>
      </nav>
    </>
  );
}

export default Navbar;