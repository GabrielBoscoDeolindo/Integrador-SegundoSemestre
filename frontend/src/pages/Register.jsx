import { useState } from "react";
import axios from "axios";
import Logo from "../assets/LogoSmartCity.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/register/", {
        username,
        password,
      });
        const proceed = window.confirm("Cadastro realizado com sucesso! Deseja ir para a tela de login?");
        if (proceed) {
        navigate("/login");
        }
    } catch (err) {
      console.error("Erro ao registrar:", err);
    }
  };

  return (
    <>
      <div className="flex">
        <aside className="bg-[#3E4756] w-[574px] h-[1024px]"></aside>

        <main className="w-[100%]">
          <div className="flex justify-end">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="flex flex-col items-center gap-5 mt-10">
            <p className="text-[#3E4756] text-[36px] font-semibold">
              Cadastre-se na SmartCity
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-[#3E4756] font-semibold text-[20px]">
                Nome de usuário:
              </label>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border border-black rounded-[5px] px-4 py-3 bg-[#E8E8E8] w-[491px]"
              />

              <label className="text-[#3E4756] font-semibold text-[20px]">
                Senha:
              </label>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-black rounded-[5px] px-4 py-3 bg-[#E8E8E8] w-[491px]"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#3E4756] text-white font-semibold rounded-[50px] w-[300px] py-3 cursor-pointer hover:bg-[#272d36]"
                >
                  CADASTRAR
                </button>
              </div>
            </form>

            <div>
              <Link to="/login" className="text-[#3E4756] underline text-[20px]">
                Já possui uma conta? Entre aqui
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Register;
