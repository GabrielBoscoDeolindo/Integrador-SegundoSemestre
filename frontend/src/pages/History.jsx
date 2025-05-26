import { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function History() {
  const [historico, setHistorico] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState("timestamp"); // Estado para controle da ordenação

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
      alert("Erro ao deletar histórico. Verifique permissões.");
    }
  };

 
  const toggleOrdenacao = () => {
    setOrdenarPor(prev => (prev === "timestamp" ? "valor" : "timestamp"));
  };

 
  const chartData = [...historico]
    .sort((a, b) => {
      if (ordenarPor === "timestamp") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else {
        return a.valor - b.valor;
      }
    })
    .map(item => ({
      timestamp: new Date(item.timestamp).toLocaleString(),
      valor: item.valor
    }));

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Histórico:</p>

        <button onClick={toggleOrdenacao} className="mb-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700">
          Ordenar por: {ordenarPor === "timestamp" ? "Hora do resgistro" : "Valor"}
        </button>

        {historico.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 w-[300px] bg-sensor border-[2px] border-charcoal p-2">
            <div>
              <p className="text-[18px] font-bold">
                Valor: {item.valor}
              </p>
              <p className="text-[16px]">
                Timestamp: {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <DeleteButton onDelete={handleDelete} id={item.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="border mt-[205px] w-[1200px] h-[500px] bg-white rounded">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp"/>
            <YAxis dataKey="valor"/>
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#3E4756" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default History;
