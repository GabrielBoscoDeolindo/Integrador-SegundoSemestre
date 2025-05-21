import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import axios from "axios";

function Sensors() {
  const [sensores, setSensores] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const fetchSensores = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:8000/sensores/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSensores(response.data);
    } catch (err) {
      console.error("Erro ao buscar sensores:", err);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este sensor?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/sensores/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSensores();
    } catch (err) {
      alert("Erro ao deletar. Verifique permissões.");
    }
  };

  const handleEditClick = (sensor) => {
    setEditandoId(sensor.id);
    setFormEdicao({
      sensor: sensor.sensor,
      mac_address: sensor.mac_address,
      status: sensor.status,
      latitude: sensor.latitude,
      longitude: sensor.longitude,
      valor: sensor.valor,
      unidade_med: sensor.unidade_med,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://localhost:8000/sensores/${id}/`, formEdicao, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditandoId(null);
      setFormEdicao({});
      fetchSensores();
    } catch (err) {
      alert("Erro ao editar. Verifique permissões.");
    }
  };

  const sensoresFiltrados = sensores.filter(
    (sensor) => filtroTipo === "" || sensor.sensor.includes(filtroTipo)
  );

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">
          Meus sensores:
        </p>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border p-2 w-[200px] text-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="umidade">Umidade</option>
          <option value="temperatura">Temperatura</option>
          <option value="luminosidade">Luminosidade</option>
          <option value="contador">Contador</option>
        </select>

        {sensoresFiltrados.map((sensor) => (
          <div
            key={sensor.id}
            className="flex flex-col gap-2 w-[350px] bg-sensor border-[2px] border-charcoal p-2"
          >
            {editandoId === sensor.id ? (
              <>
                <input
                  name="sensor"
                  value={formEdicao.sensor}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="Tipo de sensor"
                />
                <input
                  name="mac_address"
                  value={formEdicao.mac_address}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="MAC Address"
                />
                <select
                  name="status"
                  value={formEdicao.status}
                  onChange={handleEditChange}
                  className="border p-1"
                >
                  <option value={true}>ATIVO</option>
                  <option value={false}>INATIVO</option>
                </select>
                <input
                  name="latitude"
                  value={formEdicao.latitude}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="Latitude"
                />
                <input
                  name="longitude"
                  value={formEdicao.longitude}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="Longitude"
                />
                <input
                  name="valor"
                  value={formEdicao.valor}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="Valor"
                />
                <input
                  name="unidade_med"
                  value={formEdicao.unidade_med}
                  onChange={handleEditChange}
                  className="border p-1"
                  placeholder="Unidade"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(sensor.id)}
                    className="bg-green-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-green-700"
                  >
                    SALVAR
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="bg-gray-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-gray-700"
                  >
                    CANCELAR
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[20px] font-bold capitalize">
                    {sensor.id} - {sensor.sensor}
                  </p>
                  <p
                    className={`text-[16px] font-semibold ${
                      sensor.status ? "text-[#0033FF]" : "text-[#FF0000]"
                    }`}
                  >
                    {sensor.status ? "ATIVO" : "INATIVO"}
                  </p>
                  <p className="text-[12px] font-bold">
                    Mac address: {sensor.mac_address}
                  </p>
                  <p className="text-[12px] font-bold">
                    Valor: {sensor.valor}
                    {sensor.unidade_med}
                  </p>
                  <p className="text-[12px] font-bold">
                    Coordenadas: {sensor.latitude}, {sensor.longitude}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(sensor)}
                    className="bg-blue-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-blue-700"
                  >
                    EDITAR
                  </button>
                  <button
                    onClick={() => handleDelete(sensor.id)}
                    className="bg-[#FF0000] text-white border border-black w-[70px] h-[25px] text-sm hover:bg-[#a81919]"
                  >
                    EXCLUIR
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sensors;
