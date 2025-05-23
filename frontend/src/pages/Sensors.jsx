import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";
import UpdateButton from "../components/UpdateButton";
import EditFormsButtons from "../components/EditFormsButtons";

function Sensors() {
  const [sensores, setSensores] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const location = useLocation();
  const query = location.search;  

  const fetchSensores = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`http://localhost:8000/sensores/${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSensores(data);
    } catch (err) {
      console.error("Erro ao buscar sensores:", err);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, [location.search]);  

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/sensores/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSensores();
    } catch (err) {
      console.error("Erro ao deletar sensor:", err);
      alert("Erro ao deletar sensor. Verifique permissões.");
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

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Meus sensores:</p>

        {sensores.map((sensor) => (
          <div key={sensor.id} className="flex flex-col gap-2 w-[350px] bg-sensor border-[2px] border-charcoal p-2">
            {editandoId === sensor.id ? (
              <>
                {["sensor", "mac_address", "latitude", "longitude", "valor", "unidade_med"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={formEdicao[field]}
                    onChange={handleEditChange}
                    className="border p-1"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}

                <select
                  name="status"
                  value={formEdicao.status}
                  onChange={handleEditChange}
                  className="border p-1"
                >
                  <option value={true}>ATIVO</option>
                  <option value={false}>INATIVO</option>
                </select>

              <EditFormsButtons sensorId={sensor.id} onSave={handleSaveEdit} onCancel={() => setEditandoId(null)}/>
            </>
            ) : (
              <>
                <div>
                  <p className="text-[20px] font-bold capitalize">{sensor.id} - {sensor.sensor}</p>
                  <p className={`text-[16px] font-semibold ${sensor.status ? "text-[#0033FF]" : "text-[#FF0000]"}`}>
                    {sensor.status ? "ATIVO" : "INATIVO"}
                  </p>
                  <p className="text-[12px] font-bold">Mac address: {sensor.mac_address}</p>
                  <p className="text-[12px] font-bold">Unidade de Medida: {sensor.unidade_med}</p>
                  <p className="text-[12px] font-bold">Coordenadas: {sensor.latitude}, {sensor.longitude}</p>
                </div>
                <div className="flex gap-2">
                  <UpdateButton onEdit={() => handleEditClick(sensor)} />
                  <DeleteButton onDelete={handleDelete} id={sensor.id} />
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
