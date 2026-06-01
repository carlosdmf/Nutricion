// components/BarraProgreso.jsx

function BarraProgreso({ valor, maximo, color = '#22c55e', label = '' }) {
  const porcentaje = Math.min((valor / maximo) * 100, 100);

  const colorMap = {
    '#22c55e': { glow: 'rgba(34,197,94,0.3)',  track: 'rgba(34,197,94,0.08)',  text: '#22c55e' },
    '#f87171': { glow: 'rgba(248,113,113,0.3)', track: 'rgba(248,113,113,0.08)', text: '#f87171' },
    '#818cf8': { glow: 'rgba(129,140,248,0.3)', track: 'rgba(129,140,248,0.08)', text: '#818cf8' },
    '#fb923c': { glow: 'rgba(251,146,60,0.3)',  track: 'rgba(251,146,60,0.08)',  text: '#fb923c' },
  };

  const theme = colorMap[color] ?? {
    glow: 'rgba(34,197,94,0.3)',
    track: 'rgba(34,197,94,0.08)',
    text: color,
  };

  return (
    <div style={{ width: '100%' }}>

      {/* Header: label + valores */}
      {(label || maximo) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}>
          {label && (
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11.5px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              color: '#475569',
            }}>
              {label}
            </span>
          )}
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: '400',
            color: theme.text,
            marginLeft: 'auto',
          }}>
            {valor} <span style={{ color: '#334155' }}>/ {maximo}</span>
          </span>
        </div>
      )}

      {/* Track */}
      <div style={{
        width: '100%',
        height: '6px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Fill */}
        <div style={{
          width: `${porcentaje}%`,
          height: '100%',
          borderRadius: '999px',
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 8px ${theme.glow}`,
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
        }}>
          {/* Brillo interno */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '50%',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.15)',
          }} />
        </div>

      </div>

      {/* Porcentaje */}
      <div style={{
        marginTop: '5px',
        textAlign: 'right',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: '300',
        color: '#334155',
      }}>
        {Math.round(porcentaje)}%
      </div>

    </div>
  );
}

export default BarraProgreso;