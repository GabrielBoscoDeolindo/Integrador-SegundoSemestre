import { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function History() {
  const [historico, setHistorico] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState("timestamp");
  const [sensorId, setSensorId] = useState("");
  const [filtroSensor, setFiltroSensor] = useState("");

  const fetchHistorico = async () => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.get("http://localhost:8000/historico/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistorico(data);
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/historico/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHistorico();
    } catch (err) {
      alert("Erro ao deletar histórico. Verifique as permissões.");
    }
  };

  const toggleOrdenacao = () => {
    setOrdenarPor((prev) => (prev === "timestamp" ? "valor" : "timestamp"));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFiltroSensor(sensorId.trim());
  };

  const filteredHistorico = filtroSensor
    ? historico.filter((item) => item.sensor.toString() === filtroSensor)
    : historico;

const chartData = [...filteredHistorico]
  .sort((a, b) => {
    if (ordenarPor === "timestamp") {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else {
      return a.valor - b.valor;
    }
  })
  .map((item) => ({
    timestamp: item.timestamp, 
    valor: item.valor,
  }));


  return (
    <div className="flex min-h-screen bg-background">
      <Aside />

      <main className="flex-1 p-8 pt-12 flex flex-col lg:flex-row gap-8">
        <section className="w-full lg:w-1/3 flex flex-col gap-6">
          <h1 className="text-charcoal text-4xl font-bold">Histórico</h1>

          {/* Seção de Filtro e Ordenação */}
          <div className="bg-white rounded-[5px] p-6 border border-black">
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              Ver dados por ID
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                placeholder="Filtrar por ID do sensor"
                value={sensorId}
                onChange={(e) => setSensorId(e.target.value)}
                className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="ID do sensor"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 hover:bg-blue-700 transition duration-300"
              >
                BUSCAR
              </button>
            </form>

            <button
              onClick={toggleOrdenacao}
              className="w-full py-2 bg-charcoal text-white font-semibold rounded-[5px] hover:bg-[#36578E] transition duration-300"
            >
              Ordenar por:{" "}
              <span className="font-bold">
                {ordenarPor === "timestamp" ? "Hora do Registro" : "Valor"}
              </span>
            </button>
          </div>

          {/* Lista de Histórico */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {filteredHistorico.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[5px] border border-black p-4 flex flex-col gap-2"
              >
                <p className="text-lg font-bold text-charcoal">
                  Valor: <span className="font-normal">{item.valor}</span>
                </p>
                <p className="text-sm text-gray-600">
                  ID Sensor: <span className="font-medium">{item.sensor}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Timestamp:{" "}
                  <span className="font-medium">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </p>
                <div className="mt-2">
                  <DeleteButton onDelete={handleDelete} id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção do Gráfico */}
        <section className="w-[1000px] h-[700px] bg-white rounded-[5px] p-6 border border-black flex flex-col items-center justify-center mt-16">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Visualização Gráfica
          </h2>

          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis
                dataKey="timestamp"
                stroke="#363F4A"
                tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
              />
              <YAxis stroke="#363F4A" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#36578E"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}

export default History;
