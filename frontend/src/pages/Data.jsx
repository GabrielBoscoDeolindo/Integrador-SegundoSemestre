import { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";

function Data() {
  const [historico, setHistorico] = useState([]);

  const fetchHistorico = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:8000/historico/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistorico(data);
    } catch (err) {
      console.error("Erro ao buscar o histórico:", err);
    }
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

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Histórico:</p>

        {historico.map((historico) => (
          <div key={historico.id} className="flex flex-col gap-2 w-[600px] bg-sensor border-[2px] border-charcoal p-2">
            <div>
              <p className="text-[20px] font-bold capitalize">
                {historico.id} - {historico.responsavel} - {historico.ni}
              </p>
              <br />
              <p className="text-[20px] font-bold capitalize">
                {historico.sig} - {historico.descricao}
              </p>
            </div>
            <div className="flex gap-2">
              <DeleteButton onDelete={handleDelete} id={historico.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
