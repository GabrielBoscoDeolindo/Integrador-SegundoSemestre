import Me from "../assets/me.jpg";
import LogoWhite from "../assets/LogoWhite.png";
import { MdOutlineSensors } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { TbMapSearch } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function AsideButton({ to, icon: Icon, label }) {
  return (
    <Link to={to}>
      <button className="text-white border-[2px] border-white rounded-[12px] w-[248px] h-[56px] cursor-pointer text-[24px] hover:bg-[#36578E] flex items-center gap-2 pl-2">
        <Icon />
        <p className="pb-1">{label}</p>
      </button>
    </Link>
  );
}

function Aside() {
  return (
    <aside className="bg-charcoal w-[284px] min-h-screen flex flex-col items-center gap-5 pt-20">
      <Link to="/login">
        <div className="flex text-white items-center gap-1 font-semibold hover:text-black">
          <FaArrowLeft />
          <p>SAIR</p>
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <div className="w-[190px] h-[204px] border-[4px] rounded-[5px] border-white">
          <img className="w-full h-full object-cover" src={Me} alt="me" />
        </div>
        <p className="text-white text-[20px]">Gabriel Deolindo</p>
      </div>

      <div className="flex flex-col gap-3">
        <AsideButton to="/sensores" icon={MdOutlineSensors} label="Sensores" />
        <AsideButton to="/ambientes" icon={BsFillHouseFill} label="Ambientes" />
        <AsideButton to="/historico" icon={GrNotes} label="Histórico" />
        <AsideButton to="/mapa" icon={TbMapSearch} label="Mapas" />
      </div>

      <img className="pt-30" src={LogoWhite} alt="logo" />
    </aside>
  );
}

export default Aside;
