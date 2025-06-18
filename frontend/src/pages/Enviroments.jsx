import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Aside from "../components/Aside";
import DeleteButton from "../components/DeleteButton";
import UpdateButton from "../components/UpdateButton";
import EditFormsButtons from "../components/EditFormsButtons";

function Enviroments() {
  const [ambientes, setAmbientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAmbienteForm, setNewAmbienteForm] = useState({
    sig: "",
    descricao: "",
    ni: "",
    responsavel: "",
  });

  const location = useLocation();
  const query = location.search;

  const fetchAmbientes = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const url = query
        ? `http://localhost:8000/ambientes/${query}`
        : `http://localhost:8000/ambientes/`;
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmbientes(data);
    } catch {
      alert("Não foi possível carregar os ambientes.");
    }
  };

  useEffect(() => {
    fetchAmbientes();
  }, [location.search]);

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/ambientes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAmbientes();
    } catch {
      alert("Erro ao deletar ambiente. Verifique se está logado.");
    }
  };

  const handleEditClick = (ambiente) => {
    setEditandoId(ambiente.id);
    setFormEdicao({
      sig: ambiente.sig || "",
      descricao: ambiente.descricao || "",
      ni: ambiente.ni === null || ambiente.ni === undefined ? "" : ambiente.ni,
      responsavel: ambiente.responsavel || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({
      ...prev,
      [name]: name === "ni" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const handleSaveEdit = async (id) => {
    const token = localStorage.getItem("access_token");
    await axios.patch(`http://localhost:8000/ambientes/${id}/`, formEdicao, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditandoId(null);
    setFormEdicao({});
    fetchAmbientes();
  };

  const handleNewAmbienteChange = (e) => {
    const { name, value } = e.target;
    setNewAmbienteForm((prev) => ({
      ...prev,
      [name]: name === "ni" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const handleCreateAmbiente = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(`http://localhost:8000/ambientes/`, newAmbienteForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ambiente criado");
      setNewAmbienteForm({
        sig: "",
        descricao: "",
        ni: "",
        responsavel: "",
      });
      fetchAmbientes();
    } catch {
      alert("Erro ao criar ambiente. Verifique os campos (ou se está logado)");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Aside />

      <main className="flex-1 p-8 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-charcoal text-4xl font-bold">Meus Ambientes</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 px-4 hover:bg-blue-700 cursor-pointer"
          >
            Criar Ambiente
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white rounded-[5px] border border-black p-6 mb-8 shadow-md">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              Novo Ambiente
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateAmbiente();
              }}
              className="flex flex-col gap-3"
            >
              {[
                { name: "sig", placeholder: "Sigla", type: "text" },
                { name: "descricao", placeholder: "Descrição", type: "text" },
                { name: "ni", placeholder: "NI", type: "number" },
                {
                  name: "responsavel",
                  placeholder: "Responsável",
                  type: "text",
                },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={newAmbienteForm[field.name]}
                  onChange={handleNewAmbienteChange}
                  type={field.type}
                  className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                  required
                />
              ))}

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold rounded-[5px] py-2 px-4 hover:bg-blue-700 cursor-pointer"
                >
                  SALVAR NOVO AMBIENTE
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
          {ambientes.map((ambiente) => (
            <div
              key={ambiente.id}
              className="bg-white rounded-[5px] border border-black p-6 flex flex-col justify-between"
            >
              {editandoId === ambiente.id ? (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit(ambiente.id);
                  }}
                >
                  {["sig", "descricao", "ni", "responsavel"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      value={formEdicao[field]}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-2 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={field}
                      type={field === "ni" ? "number" : "text"}
                    />
                  ))}

                  <EditFormsButtons
                    sensorId={ambiente.id}
                    onSave={() => handleSaveEdit(ambiente.id)}
                    onCancel={() => setEditandoId(null)}
                  />
                </form>
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-charcoal mb-1 capitalize">
                      {ambiente.sig} - {ambiente.descricao}
                    </h2>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Responsável:</span>{" "}
                      {ambiente.responsavel}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">NI:</span> {ambiente.ni}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end mt-auto">
                    <UpdateButton onEdit={() => handleEditClick(ambiente)} />
                    <DeleteButton onDelete={handleDelete} id={ambiente.id} />
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

export default Enviroments;
