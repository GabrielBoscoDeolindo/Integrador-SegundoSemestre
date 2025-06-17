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
      const { data } = await axios.get(
        `http://localhost:8000/sensores/${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSensores(data);
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      alert("Não foi possível carregar os sensores.");
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
      alert("Erro ao deletar sensor. Verifique as permissões.");
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
      alert("Erro ao editar. Verifique as permissões.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Aside />
      <main className="flex-1 p-8 pt-12">
        <h1 className="text-charcoal text-4xl font-bold mb-8">Meus Sensores</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sensores.map((sensor) => (
            <div key={sensor.id} className="bg-white rounded-[5px] border border-black p-6 flex flex-col justify-between">
              {editandoId === sensor.id ? (
                <div className="flex flex-col gap-3">
                  {[
                    "sensor",
                    "mac_address",
                    "latitude",
                    "longitude",
                    "unidade_med",
                  ].map((field) => (
                    <input
                      key={field}
                      name={field}
                      value={formEdicao[field]}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field}
                    />
                  ))}

                  <select
                    name="status"
                    value={formEdicao.status}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={true}>ATIVO</option>
                    <option value={false}>INATIVO</option>
                  </select>

                  <EditFormsButtons
                    sensorId={sensor.id}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditandoId(null)}
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-charcoal mb-1 capitalize">
                      {sensor.id} - {sensor.sensor}
                    </h2>
                    <p className={`text-xl font-bold ${sensor.status ? "text-blue-500" : "text-red-500"}`}>
                      {sensor.status ? "ATIVO" : "INATIVO"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">MAC Address:</span>{" "}
                      {sensor.mac_address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Unidade de Medida:</span>{" "}
                      {sensor.unidade_med}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Coordenadas:</span>{" "}
                      {sensor.latitude}, {sensor.longitude}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-end mt-auto">
                    <UpdateButton onEdit={() => handleEditClick(sensor)} />
                    <DeleteButton onDelete={handleDelete} id={sensor.id} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Sensors;
