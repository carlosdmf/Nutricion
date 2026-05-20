// utils/utilidadesIMC.js

// ======================================================
// REFACTORIZACIÓN APLICADA:
// ======================================================
// 1. Replace Magic Number → constantes con nombre descriptivo
// 2. Extract Method → funciones pequeñas y reutilizables
// 3. Decompose Conditional → condiciones nombradas y legibles
// ======================================================



// ======================================================
// Replace Magic Number
// ======================================================

// ANTES:
// if(imc < 18.5) return 'Bajo peso'
// if(imc < 25) return 'Normal'
// if(imc < 30) return 'Sobrepeso'

// Problema:
// Los números no explican su significado y dificultan la lectura

// ✔ SOLUCIÓN: constantes con nombre claro

const IMC_BAJO_PESO = 18.5;
const IMC_NORMAL_MAX = 24.9;
const IMC_SOBREPESO_MAX = 29.9;
const IMC_OBESIDAD_MIN = 30;



// ======================================================
// Decompose Conditional
// ======================================================

// ✔ Se separan las condiciones en funciones pequeñas
// ✔ Cada función representa una regla de negocio clara

function esBajoPeso(imc) {
  return imc < IMC_BAJO_PESO;
}

function esNormal(imc) {
  return imc >= IMC_BAJO_PESO &&
         imc <= IMC_NORMAL_MAX;
}

function esSobrepeso(imc) {
  return imc > IMC_NORMAL_MAX &&
         imc <= IMC_SOBREPESO_MAX;
}

function esObesidad(imc) {
  return imc >= IMC_OBESIDAD_MIN;
}



// ======================================================
// Función principal (estado del IMC)
// ======================================================

// ✔ Código más legible
// ✔ Más fácil de mantener
// ✔ Cada caso tiene una función clara

export function estadoIMC(imc) {

  if (esBajoPeso(imc))
    return {
      estado: 'Bajo peso',
      color: '#3b82f6'
    };

  if (esNormal(imc))
    return {
      estado: 'Normal',
      color: '#22c55e'
    };

  if (esSobrepeso(imc))
    return {
      estado: 'Sobrepeso',
      color: '#f97316'
    };

  if (esObesidad(imc))
    return {
      estado: 'Obesidad',
      color: '#ef4444'
    };
}



// ======================================================
// Extract Method
// ======================================================

// ANTES:
// const alturaMetros = altura / 100;

// Problema:
// La conversión estaba mezclada dentro de la lógica principal

// ✔ SOLUCIÓN: función reutilizable

function convertirAltura(alturaCm) {
  return alturaCm / 100;
}



// ======================================================
// Cálculo del IMC
// ======================================================

// ✔ Función separada para reutilización
// ✔ Código más limpio y modular

export function calcularIMC(peso, altura) {

  const alturaMetros = convertirAltura(altura);

  const resultado = peso / (alturaMetros * alturaMetros);

  return parseFloat(resultado.toFixed(1));
}