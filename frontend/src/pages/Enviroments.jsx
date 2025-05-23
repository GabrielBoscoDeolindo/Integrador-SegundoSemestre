import { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";
import UpdateButton from "../components/UpdateButton";
import EditFormsButtons from "../components/EditFormsButtons";

function Enviroments() {
  const [ambientes, setAmbientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const fetchAmbientes = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get("http://localhost:8000/ambientes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmbientes(data);
    } catch (err) {
      console.error("Erro ao buscar ambientes:", err);
    }
  };

  useEffect(() => { fetchAmbientes(); }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/ambientes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAmbientes();
    } catch (err) {
      alert("Erro ao deletar Ambiente. Verifique permissões.");
    }
  };

  const handleEditClick = (ambiente) => {
    setEditandoId(ambiente.id);
    setFormEdicao({
      sig: ambiente.sig,
      descricao: ambiente.descricao,
      ni: ambiente.ni,
      responsavel: ambiente.responsavel,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://localhost:8000/ambientes/${id}/`, formEdicao, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditandoId(null);
      setFormEdicao({});
      fetchAmbientes();
    } catch (err) {
      alert("Erro ao editar. Verifique permissões.");
    }
  };

  return (
    <div className="flex">
      <Aside />

      <div className="flex flex-col p-6 pt-16 gap-4">
        <p className="text-charcoal text-[36px] font-semibold">Meus ambientes:</p>

        {ambientes.map((ambiente) => (
          <div key={ambiente.id} className="flex flex-col gap-2 w-[600px] bg-sensor border-[2px] border-charcoal p-2">
            {editandoId === ambiente.id ? (
              <>
                {["sig","descricao","ni","responsavel"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={formEdicao[field]}
                    onChange={handleEditChange}
                    className="border p-1"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}

                <EditFormsButtons ambienteId={ambiente.id} onSave={handleSaveEdit} onCancel={() => setEditandoId(null)}/>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[20px] font-bold capitalize">{ambiente.sig} - {ambiente.descricao}</p><br />
                  <p className="text-[20px] font-bold capitalize">Responsável: {ambiente.responsavel} - {ambiente.ni}</p>
                </div>
                <div className="flex gap-2">
                  <UpdateButton onEdit={() => handleEditClick(ambiente)} />
                  <DeleteButton onDelete={handleDelete} id={ambiente.id} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Enviroments;