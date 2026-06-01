// components/BotonPrimario.jsx

function BotonPrimario({ text, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '15px',
        borderRadius: '13px',
        border: '1px solid rgba(34,197,94,0.28)',
        background: 'rgba(34,197,94,0.12)',
        color: '#22c55e',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '15px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '0.02em',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        opacity: disabled ? 0.45 : 1,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = 'rgba(34,197,94,0.18)';
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
        e.currentTarget.style.boxShadow = '0 0 28px rgba(34,197,94,0.12)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = 'rgba(34,197,94,0.12)';
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.28)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span>✦</span> {text}
    </button>
  );
}

export default BotonPrimario;