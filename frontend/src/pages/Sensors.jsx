import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Aside from "../components/Aside";

function Sensors() {
  const [sensores, setSensores] = useState([]);

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

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja deletar este sensor?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/sensores/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSensores();
    } catch (err) {
      alert("Erro ao deletar. Verifique permissões.");
    }
  };

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16  gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Meus sensores:</p>

        {sensores.map((sensor) => (
          <div key={sensor.id} className="flex justify-between items-start w-[350px] h-auto bg-sensor border-[2px] border-charcoal pl-1 pr-2 py-2">
            <div>
              <p className='text-[20px] font-bold capitalize'>{sensor.id} - {sensor.sensor}</p>
              <p className={`text-[16px] font-semibold ${sensor.status ? "text-[#0033FF]" : "text-[#FF0000]"}`}> {sensor.status ? "ATIVO" : "INATIVO"}</p>
              <p className='text-[12px] font-bold'>Mac address: {sensor.mac_address}</p>
              <p className='text-[12px] font-bold'>Valor: {sensor.valor}{sensor.unidade_med}</p>
              <p className='text-[12px] font-bold'>Coordenadas: {sensor.latitude}, {sensor.longitude}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(sensor.id)} className="bg-[#FF0000] text-white border border-black w-[70px] h-[25px] text-sm hover:bg-[#a81919]">
                EXCLUIR
              </button>
            </div>
          </div>
        ))}
      </div>
        {/* <div className='flex flex-col items-center bg-sensor border-[9px] border-charcoal w-[442px] h-[487px] mt-23.5'>
          <p className='text-charcoal text-[36px] font-semibold'>Novo sensor:</p>
          <form action="" className='flex flex-wrap justify-center gap-5'>
            <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Tipo do Sensor:</label>
              <input type="text" placeholder="Tipo do Sensor" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>
            <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Endereço MAC:</label>
              <input type="text" placeholder="Endereço MAC" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>
                        <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Latitude:</label>
              <input type="text" placeholder="Latitude" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>
            <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Longitude:</label>
              <input type="text" placeholder="Longitude" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>
                        <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Status:</label>
              <input type="text" placeholder="Status" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>
            <div className='flex flex-col'>
              <label className="text-charcoal font-semibold text-[14px]">Ambiente:</label>
              <input type="text" placeholder="Ambiente" required className="border border-black rounded-[5px] px-4 py-2 bg-[#E8E8E8] w-[174px]"/>
            </div>

          <button type="submit" className="bg-charcoal text-white font-semibold rounded-[50px] w-[200px] h-[50px] cursor-pointer hover:bg-[#272d36] mt-5">
          Salvar Sensor
          </button>
          </form>
        </div> */}
    </div>
  );
}

export default Sensors;
