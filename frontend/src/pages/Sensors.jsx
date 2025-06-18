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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSensorForm, setNewSensorForm] = useState({
    sensor: "",
    mac_address: "",
    status: true,
    latitude: "",
    longitude: "",
    unidade_med: "",
  });

  const location = useLocation();

  const fetchSensores = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(
        `http://localhost:8000/sensores/${location.search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSensores(data);
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      alert("Não foi possível carregar os sensores. Verifique se está logado (superusuario)");
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
      alert("Sensor deletado com sucesso!");
    } catch {
      alert("Erro ao deletar sensor. Verifique se está logado.");
    }
  };

  const handleEditClick = (sensor) => {
    setEditandoId(sensor.id);
    setFormEdicao({ ...sensor });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({
      ...prev,
      [name]: name === "status"
        ? value === "true"
        : ["latitude", "longitude"].includes(name)
        ? value === "" ? null : Number(value)
        : value,
    }));
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
    } catch {
      alert("Erro ao editar. Verifique os campos.");
    }
  };

  const handleNewSensorChange = (e) => {
    const { name, value } = e.target;
    setNewSensorForm((prev) => ({
      ...prev,
      [name]: name === "status"
        ? value === "true"
        : ["latitude", "longitude"].includes(name)
        ? value === "" ? null : Number(value)
        : value,
    }));
  };

  const handleCreateSensor = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(`http://localhost:8000/sensores/`, newSensorForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sensor criado");
      setNewSensorForm({
        sensor: "",
        mac_address: "",
        status: true,
        latitude: "",
        longitude: "",
        unidade_med: "",
      });
      fetchSensores();
    } catch {
      alert("Erro ao criar sensor. Verifique os campos");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Aside />
      <main className="flex-1 p-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-charcoal text-4xl font-bold">Meus Sensores</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 px-4 hover:bg-blue-700 cursor-pointer"
          >
            Criar Sensor
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white rounded-[5px] border border-black p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              Novo Sensor
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateSensor();
              }}
              className="flex flex-col gap-3"
            >
              {[
                { name: "sensor", placeholder: "Nome do Sensor", type: "text" },
                { name: "mac_address", placeholder: "Endereço MAC", type: "text" },
                { name: "latitude", placeholder: "Latitude", type: "number" },
                { name: "longitude", placeholder: "Longitude", type: "number" },
                { name: "unidade_med", placeholder: "Unidade de Medida", type: "text" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={newSensorForm[field.name]}
                  onChange={handleNewSensorChange}
                  type={field.type}
                  className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                  required
                />
              ))}

              <select
                name="status"
                value={newSensorForm.status.toString()}
                onChange={handleNewSensorChange}
                className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">ATIVO</option>
                <option value="false">INATIVO</option>
              </select>

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 px-4 hover:bg-blue-700 cursor-pointer"
                >
                  SALVAR NOVO SENSOR
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-red-600 text-white font-semibold rounded-[5px] py-2 px-4 hover:bg-red-700 cursor-pointer"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sensores.map((sensor) => (
            <div
              key={sensor.id}
              className="bg-white rounded-[5px] border border-black p-6 flex flex-col justify-between"
            >
              {editandoId === sensor.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit(sensor.id);
                  }}
                  className="flex flex-col gap-3"
                >
                  {[
                    { name: "sensor", placeholder: "Sensor", type: "text" },
                    { name: "mac_address", placeholder: "Mac Address", type: "text" },
                    { name: "latitude", placeholder: "Latitude", type: "number" },
                    { name: "longitude", placeholder: "Longitude", type: "number" },
                    { name: "unidade_med", placeholder: "Unidade de Medida", type: "text" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      name={field.name}
                      value={formEdicao[field.name]}
                      onChange={handleEditChange}
                      type={field.type}
                      className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                    />
                  ))}

                  <select
                    name="status"
                    value={formEdicao.status.toString()}
                    onChange={handleEditChange}
                    className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">ATIVO</option>
                    <option value="false">INATIVO</option>
                  </select>

                  <EditFormsButtons
                    sensorId={sensor.id}
                    onSave={() => handleSaveEdit(sensor.id)}
                    onCancel={() => setEditandoId(null)}
                  />
                </form>
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-charcoal mb-1 capitalize">
                      {sensor.id} - {sensor.sensor}
                    </h2>
                    <p
                      className={`text-xl font-bold ${
                        sensor.status ? "text-blue-500" : "text-red-500"
                      }`}
                    >
                      Status: {sensor.status ? "ATIVO" : "INATIVO"}
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
