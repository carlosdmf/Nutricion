// components/CampoEntrada.jsx
// Componente reutilizable: acepta cualquier tipo de input
// Reutilizable en: Login, Registro, Formulario de perfil nutricional

function CampoEntrada({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = null,
  required = false
}) {

  return (
    <div style={{ marginBottom: '12px' }}>

      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '8px',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      {/* Mensaje de error reutilizable */}
      {error && (
        <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
      )}

    </div>
  );
}

export default CampoEntrada;