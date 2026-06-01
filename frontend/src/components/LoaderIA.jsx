// components/LoaderIA.jsx

function LoaderIA({ mensaje = 'Generando tu plan con IA...' }) {
  return (
    <>
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes loaderFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .loader-dot:nth-child(1) { animation-delay: 0s; }
        .loader-dot:nth-child(2) { animation-delay: 0.2s; }
        .loader-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: "'DM Sans', sans-serif",
        animation: 'loaderFadeUp 0.4s ease both',
      }}>

        {/* Anillo giratorio */}
        <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(34,197,94,0.08)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#22c55e',
            animation: 'loaderSpin 1s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(34,197,94,0.3)',
            animation: 'loaderSpin 1.5s linear infinite reverse',
          }} />
          {/* Icono central */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
          }}>
            🤖
          </div>
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          background: 'rgba(34,197,94,0.07)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: '999px',
          padding: '5px 14px',
          marginBottom: '14px',
        }}>
          <div style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px rgba(34,197,94,0.8)',
            animation: 'loaderPulse 1.5s ease infinite',
          }} />
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#22c55e',
          }}>
            NutriScan AI
          </span>
        </div>

        {/* Mensaje */}
        <p style={{
          margin: '0 0 20px',
          fontSize: '14px',
          fontWeight: '300',
          color: '#475569',
          textAlign: 'center',
          letterSpacing: '0.01em',
        }}>
          {mensaje}
        </p>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="loader-dot"
              style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                opacity: 0.5,
                animation: 'loaderPulse 1.2s ease infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default LoaderIA;