// utils/Formulario.js

// CUSTOM HOOK REUTILIZABLE
// Reutilizable en:
// - Inicio de sesión
// - Registro
// - Perfil nutricional
// - Formularios del sistema

// REFACTORIZACIÓN APLICADA:
// 1. Extract Method → lógica separada en funciones reutilizables
// 2. Decompose Conditional → validaciones más legibles

import { useState } from 'react';

export function Formulario(valoresIniciales) {

  const [valores, setValores] = useState(valoresIniciales);

  const [errores, setErrores] = useState({});

  const [cargando, setCargando] = useState(false);

  // ======================================================
  // Extract Method
  // ======================================================

  // ✅ Lógica de actualización separada

  function manejarCambio(campo) {

    return (evento) => {

      setValores(prev => ({
        ...prev,
        [campo]: evento.target.value
      }));

    };
  }

  // ======================================================
  // Decompose Conditional
  // ======================================================

  // ✅ Validación separada y reutilizable

  function campoVacio(valor) {
    return !valor || valor.trim() === '';
  }

  function validarCamposRequeridos(campos) {

    const nuevosErrores = {};

    campos.forEach(campo => {

      if (campoVacio(valores[campo])) {

        nuevosErrores[campo] =
          `El campo ${campo} es requerido`;

      }

    });

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  }

  // ======================================================
  // Método reutilizable
  // ======================================================

  function limpiarFormulario() {

    setValores(valoresIniciales);

    setErrores({});

  }

  // ======================================================
  // Retorno del hook
  // ======================================================

  return {

    valores,
    errores,
    cargando,

    setCargando,

    manejarCambio,

    validarCamposRequeridos,

    limpiarFormulario

  };
}