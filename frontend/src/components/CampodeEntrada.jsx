// components/CampoEntrada.jsx

function CampoEntrada({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = null,
  required = false,
}) {
  return (
    <div style={{ marginBottom: '18px' }}>

      {/* LABEL */}
      {label && (
        <label style={{
          display: 'block',
          fontSize: '11.5px',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
          color: '#475569',
          marginBottom: '8px',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {label}
          {required && (
            <span style={{ color: '#f87171', marginLeft: '3px' }}>*</span>
          )}
        </label>
      )}

      {/* INPUT */}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '12px',
          border: error
            ? '1px solid rgba(248,113,113,0.5)'
            : '1px solid rgba(255,255,255,0.06)',
          background: error
            ? 'rgba(248,113,113,0.04)'
            : 'rgba(255,255,255,0.02)',
          color: '#f1f5f9',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: '300',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onFocus={(e) => {
          if (error) {
            e.currentTarget.style.borderColor = 'rgba(248,113,113,0.6)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.06)';
          } else {
            e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.05)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? 'rgba(248,113,113,0.5)'
            : 'rgba(255,255,255,0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = error
              ? 'rgba(248,113,113,0.6)'
              : 'rgba(255,255,255,0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = error
              ? 'rgba(248,113,113,0.5)'
              : 'rgba(255,255,255,0.06)';
          }
        }}
      />

      {/* ERROR */}
      {error && (
        <span style={{
          display: 'block',
          color: '#f87171',
          fontSize: '12px',
          fontWeight: '400',
          marginTop: '6px',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.01em',
        }}>
          {error}
        </span>
      )}

    </div>
  );
}

export default CampoEntrada;