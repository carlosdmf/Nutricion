// components/CardProgreso.jsx

function CardProgreso({ pesoInicial, pesoActual }) {
  const diferencia = +(pesoActual - pesoInicial).toFixed(1);
  const bajando = diferencia < 0;
  const estable = diferencia === 0;

  const accentColor  = bajando ? '#22c55e' : estable ? '#818cf8' : '#f87171';
  const accentGlow   = bajando ? 'rgba(34,197,94,0.15)'   : estable ? 'rgba(129,140,248,0.15)' : 'rgba(248,113,113,0.15)';
  const accentBorder = bajando ? 'rgba(34,197,94,0.2)'    : estable ? 'rgba(129,140,248,0.2)'  : 'rgba(248,113,113,0.2)';
  const accentBg     = bajando ? 'rgba(34,197,94,0.06)'   : estable ? 'rgba(129,140,248,0.06)' : 'rgba(248,113,113,0.06)';
  const emoji        = bajando ? '📉' : estable ? '➡️' : '📈';
  const etiqueta     = bajando ? 'Bajaste' : estable ? 'Sin cambios' : 'Subiste';

  const porcentaje = pesoInicial
    ? Math.abs(((diferencia) / pesoInicial) * 100).toFixed(1)
    : 0;

  return (
    <div style={{
      background: '#0e1420',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.05)',
      padding: '28px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Línea decorativa superior */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`,
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '11px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#475569',
        }}>
          Progreso de peso
        </span>
        <span style={{
          fontSize: '16px',
          lineHeight: 1,
        }}>
          {emoji}
        </span>
      </div>

      {/* Pesos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {[
          { label: 'Peso inicial', valor: pesoInicial },
          { label: 'Peso actual',  valor: pesoActual  },
        ].map(({ label, valor }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '14px 16px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#334155',
              marginBottom: '6px',
            }}>
              {label}
            </div>
            <div style={{
              fontSize: '22px',
              fontFamily: "'Syne', sans-serif",
              fontWeight: '800',
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              {valor}
              <span style={{ fontSize: '13px', fontWeight: '400', color: '#475569', marginLeft: '3px' }}>kg</span>
            </div>
          </div>
        ))}
      </div>

      {/* Diferencia badge */}
      <div style={{
        background: accentBg,
        border: `1px solid ${accentBorder}`,
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: `0 0 20px ${accentGlow}`,
      }}>
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: accentColor,
            marginBottom: '4px',
            opacity: 0.8,
          }}>
            {etiqueta}
          </div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '28px',
            fontWeight: '800',
            color: accentColor,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {diferencia > 0 ? '+' : ''}{diferencia}
            <span style={{ fontSize: '14px', fontWeight: '400', marginLeft: '3px' }}>kg</span>
          </div>
        </div>

        {!estable && (
          <div style={{
            textAlign: 'right',
          }}>
            <div style={{
              fontSize: '11px',
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              Variación
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '20px',
              fontWeight: '700',
              color: accentColor,
              opacity: 0.85,
            }}>
              {porcentaje}%
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default CardProgreso;