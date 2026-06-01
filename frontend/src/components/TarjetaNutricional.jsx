// components/TarjetaNutricional.jsx

const colorThemes = {
  '#22c55e': { glow: 'rgba(34,197,94,0.18)',   border: 'rgba(34,197,94,0.2)',   bg: 'rgba(34,197,94,0.07)'   },
  '#f87171': { glow: 'rgba(248,113,113,0.18)', border: 'rgba(248,113,113,0.2)', bg: 'rgba(248,113,113,0.07)' },
  '#818cf8': { glow: 'rgba(129,140,248,0.18)', border: 'rgba(129,140,248,0.2)', bg: 'rgba(129,140,248,0.07)' },
  '#fb923c': { glow: 'rgba(251,146,60,0.18)',  border: 'rgba(251,146,60,0.2)',  bg: 'rgba(251,146,60,0.07)'  },
  '#38bdf8': { glow: 'rgba(56,189,248,0.18)',  border: 'rgba(56,189,248,0.2)',  bg: 'rgba(56,189,248,0.07)'  },
};

function TarjetaNutricional({
  titulo,
  valor,
  unidad = '',
  color = '#22c55e',
  icono = '🥗',
}) {
  const theme = colorThemes[color] ?? {
    glow:   `${color}30`,
    border: `${color}33`,
    bg:     `${color}12`,
  };

  return (
    <div
      style={{
        background: '#0e1420',
        border: `1px solid rgba(255,255,255,0.05)`,
        borderRadius: '20px',
        padding: '24px',
        fontFamily: "'DM Sans', sans-serif",
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = `0 8px 32px ${theme.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Línea decorativa superior */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
      }} />

      {/* Icono */}
      <div style={{
        width: '44px', height: '44px',
        borderRadius: '13px',
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        marginBottom: '16px',
        boxShadow: `0 0 16px ${theme.glow}`,
      }}>
        {icono}
      </div>

      {/* Título */}
      <div style={{
        fontSize: '11px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.09em',
        color: '#475569',
        marginBottom: '8px',
      }}>
        {titulo}
      </div>

      {/* Valor + unidad */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '2rem',
          fontWeight: '800',
          color: color,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          {valor}
        </span>
        {unidad && (
          <span style={{
            fontSize: '13px',
            fontWeight: '300',
            color: '#334155',
            letterSpacing: '0.02em',
          }}>
            {unidad}
          </span>
        )}
      </div>

    </div>
  );
}

export default TarjetaNutricional;