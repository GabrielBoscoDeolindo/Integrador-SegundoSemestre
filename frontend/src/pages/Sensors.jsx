import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Aside from "../components/Aside";

function Sensors() {
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/sensores/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSensores(response.data);
      } catch (err) {
        console.error('Erro ao buscar sensores:', err);
      }
    };

    fetchSensores();
  }, []);

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Meus sensores:</p>

        {sensores.map((sensor, index) => (
          <div key={index} className="w-[442px] h-auto bg-sensor border-[2px] border-charcoal pl-1">
            <p className='text-[20px] font-bold'>{sensor.sensor}</p>
            <p className={`text-[16px] font-semibold ${sensor.status ? "text-[#0033FF]" : "text-[#FF0000]"}`}> {sensor.status ? "ATIVO" : "INATIVO"}</p>
            <p className='text-[12px] font-bold'>Mac address: {sensor.mac_address}</p>
            <p className='text-[12px] font-bold'>Valor: {sensor.valor}{sensor.unidade_med}</p>
            <p className='text-[12px] font-bold'>Coordenadas: {sensor.latitude}, {sensor.longitude}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sensors;
