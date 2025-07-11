import { useState } from "react";
import Logo from "../assets/LogoSmartCity.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      navigate("/sensores");
    } catch (err) {
      window.alert("Usuário ou Matrícula incorretos.");
    }
  };

  return (
    <div className="flex">
      <aside className="bg-charcoal w-[1024px] h-[1024px]"></aside>

      <main className="w-full bg-background">
        <header className="flex justify-end">
          <img src={Logo} alt="Logo" />
        </header>

        <section className="flex flex-col items-center gap-5 mt-10">
          <h1 className="text-charcoal text-[36px] font-semibold">
            Entre na sua conta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-charcoal font-semibold text-[20px]">
              Nome de usuário:
            </label>
            <input
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-black rounded-[5px] px-4 py-3 bg-white w-[491px]"
            />

            <label className="text-charcoal font-semibold text-[20px]">
              Matrícula:
            </label>
            <input
              type="password"
              placeholder="Matrícula"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black rounded-[5px] px-4 py-3 bg-white w-[491px]"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-charcoal text-white font-semibold rounded-[50px] w-[300px] py-3 cursor-pointer hover:bg-[#272d36]"
              >
                ENTRAR
              </button>
            </div>
          </form>

          <footer>
            <Link to="/cadastro" className="text-charcoal underline text-[20px]">
              Não possui uma conta? Se cadastre aqui!
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Login;
