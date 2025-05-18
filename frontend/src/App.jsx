import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Register';
import Login from './pages/Login';
import Sensors from './pages/Sensors';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sensores" element={<Sensors />} />
    </Routes>
  );
}

export default App;
