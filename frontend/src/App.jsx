import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Register';
import Login from './pages/Login';
import Sensors from './pages/Sensors';
import Enviroments from './pages/Enviroments';
import History from './pages/History';
import Map from './pages/Map';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sensores" element={<Sensors />} />
      <Route path="/ambientes" element={<Enviroments />} />
      <Route path="/historico" element={<History />} />
      <Route path="/historico" element={<History />} />
      <Route path="/mapa" element={<Map />} />
      
    </Routes>
  );
}

export default App;
