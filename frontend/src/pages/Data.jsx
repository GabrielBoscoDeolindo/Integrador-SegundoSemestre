import { useState } from "react";
import axios from "axios";
import Aside from "../components/Aside";

function Data() {
  const [sensorId, setSensorId] = useState("");
  const [sensor, setSensor] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`http://localhost:8000/sensores/${sensorId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSensor(data);
    } catch (err) {
      alert("Sensor não encontrado ou erro de permissão.");
      setSensor(null);
    }
  };

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Buscar Sensor por ID</p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite o ID"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white border border-black p-2 hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>

        {sensor && (
          <div className="flex flex-col gap-2 w-[350px] bg-sensor border-[2px] border-charcoal p-2">
            <p className="text-[20px] font-bold capitalize">{sensor.id} - {sensor.sensor}</p>
            <p className={`text-[16px] font-semibold ${sensor.status ? "text-[#0033FF]" : "text-[#FF0000]"}`}>
              {sensor.status ? "ATIVO" : "INATIVO"}
            </p>
            <p className="text-[12px] font-bold">Mac address: {sensor.mac_address}</p>
            <p className="text-[12px] font-bold">Unidade de Medida: {sensor.unidade_med}</p>
            <p className="text-[12px] font-bold">Coordenadas: {sensor.latitude}, {sensor.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Data;
