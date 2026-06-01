// components/ListaComidas.jsx

const iconoTipo = {
  desayuno:  '🌅',
  almuerzo:  '☀️',
  cena:      '🌙',
  merienda:  '🍎',
  snack:     '🥜',
};

function ListaComidas({ comidas = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {comidas.map((comida, index) => (
        <div
          key={index}
          style={{
            background: '#0e1420',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '18px 20px',
            fontFamily: "'DM Sans', sans-serif",
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Línea izquierda decorativa */}
          <div style={{
            position: 'absolute',
            top: '20%', bottom: '20%',
            left: 0,
            width: '2px',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, transparent, #22c55e, transparent)',
          }} />

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '16px', lineHeight: 1 }}>
              {iconoTipo[comida.tipo?.toLowerCase()] ?? '🍽️'}
            </span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#22c55e',
            }}>
              {comida.tipo}
            </span>

            {comida.calorias && (
              <span style={{
                marginLeft: 'auto',
                fontSize: '11px',
                fontWeight: '500',
                color: '#334155',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '999px',
                padding: '3px 10px',
                letterSpacing: '0.04em',
              }}>
                {comida.calorias} kcal
              </span>
            )}
          </div>

          {/* Descripción */}
          <p style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '300',
            color: '#94a3b8',
            lineHeight: '1.6',
            paddingLeft: '26px',
          }}>
            {comida.descripcion}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ListaComidas;