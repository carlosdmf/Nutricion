import { useState } from 'react';

import TarjetaNutricional
from '../components/TarjetaNutricional';

function Dashboard() {

  // =====================================
  // ESTADOS
  // =====================================

  const [usuario] = useState({

    nombre: 'Carlos',
    objetivo: 'Ganar músculo'

  });

  // =====================================
  // VISTA
  // =====================================

  return (

    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        background:
          'linear-gradient(to right, #0f172a, #1e293b)',
        color: 'white'
      }}
    >

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div
        style={{
          marginBottom: '40px',
          textAlign: 'center'
        }}
      >

        <h1
          style={{
            fontSize: '2.8rem',
            marginBottom: '10px'
          }}
        >
          NutriScan AI Dashboard
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: '#CBD5E1'
          }}
        >
          Bienvenido {usuario.nombre}
        </p>

        <p
          style={{
            color: '#22c55e',
            marginTop: '8px'
          }}
        >
          Objetivo actual:
          {' '}
          {usuario.objetivo}
        </p>

      </div>

      {/* ===================================== */}
      {/* TARJETAS */}
      {/* ===================================== */}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >

        <TarjetaNutricional
          titulo="Calorías"
          valor="2200"
          unidad="kcal"
          icono="🔥"
          color="#ef4444"
        />

        <TarjetaNutricional
          titulo="Proteínas"
          valor="120"
          unidad="g"
          icono="🥩"
          color="#22c55e"
        />

        <TarjetaNutricional
          titulo="Agua"
          valor="2"
          unidad="Litros"
          icono="💧"
          color="#3b82f6"
        />

        <TarjetaNutricional
          titulo="IMC"
          valor="24"
          unidad=""
          icono="📊"
          color="#f59e0b"
        />

      </div>

    </div>

  );

}

export default Dashboard;