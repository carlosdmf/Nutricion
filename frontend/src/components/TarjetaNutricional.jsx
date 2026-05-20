// components/TarjetaNutricional.jsx
// Componente reutilizable: muestra cualquier dato nutricional
// Reutilizable en: Dashboard, Historial, Plan semanal

function TarjetaNutricional({
  titulo,
  valor,
  unidad = '',
  color = '#22c55e',
  icono = '🥗'
}) {

  const estiloTarjeta = {
    border: `2px solid ${color}`,
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    minWidth: '140px',
    backgroundColor: '#fff'
  };

  const estiloValor = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: color
  };

  return (
    <div style={estiloTarjeta}>
      <div style={{ fontSize: '2rem' }}>{icono}</div>
      <div style={estiloValor}>{valor}</div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>{unidad}</div>
      <div style={{ fontWeight: 'bold', marginTop: '4px' }}>{titulo}</div>
    </div>
  );
}

export default TarjetaNutricional;