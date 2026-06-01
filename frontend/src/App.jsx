// =====================================
// APP PRINCIPAL
// NutriScan AI
// =====================================

import {

  BrowserRouter,

  Routes,

  Route

} from 'react-router-dom';

// =====================================
// PAGINAS
// =====================================

import Login
from './pages/Login';

import Registro
from './pages/Registro';

import Dashboard
from './pages/Dashboard';

import Perfil
from './pages/Perfil';

import Dieta
from './pages/Dieta';

import Historial
from './pages/Historial';

import EscanerComida
from './pages/EscanearComida';

import ChatNutricional
from './pages/ChatNutricional';

// =====================================
// APP
// =====================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route

          path="/"

          element={<Login />}

        />

        {/* REGISTRO */}

        <Route

          path="/registro"

          element={<Registro />}

        />

        {/* DASHBOARD */}

        <Route

          path="/dashboard"

          element={<Dashboard />}

        />

        {/* PERFIL */}

        <Route

          path="/perfil"

          element={<Perfil />}

        />

        {/* DIETA */}

        <Route

          path="/dieta"

          element={<Dieta />}

        />

        {/* HISTORIAL */}

        <Route

          path="/historial"

          element={<Historial />}

        />

        {/* ESCANEAR COMIDA */}

        <Route

          path="/escanear"

          element={<EscanerComida />}

        />

        {/* CHAT IA */}

        <Route

          path="/chat"

          element={<ChatNutricional />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;