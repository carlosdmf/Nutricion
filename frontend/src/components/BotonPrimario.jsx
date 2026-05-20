function BotonPrimario({
  text,
  onClick
}) {

  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

export default BotonPrimario;