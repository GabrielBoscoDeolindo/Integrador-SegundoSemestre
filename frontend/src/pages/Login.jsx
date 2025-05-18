import { useState } from 'react'
import Logo from "../assets/LogoSmartCity.png"
import { Link } from 'react-router-dom';

function Login() {

  return (
    <>
    <div className="flex">
    <aside className="bg-[#3E4756] w-[574px] h-[1024px]"></aside>

    <main className='w-[100%]'>
        <div className="flex justify-end">
            <img src={Logo} alt="Logo" />
        </div>

<div className='flex flex-col items-center gap-5 mt-10'>
  <div>
    <p className='text-[#3E4756] text-[36px] font-semibold'>Entre na sua conta</p>
  </div>
  <div>
  <form action="">
      <fieldset className='flex flex-col gap-2'>
        <label className="text-[#3E4756] font-semibold text-[20px]">Nome:</label>
        <input type="text" placeholder="Nome" className="border border-black rounded-[5px] px-4 py-3 bg-[#E8E8E8] w-[491px]"/>
        <label className="text-[#3E4756] font-semibold text-[20px]">Matrícula:</label>
        <input type="text" placeholder="Matrícula" className="border border-black rounded-[5px] px-4 py-3 bg-[#E8E8E8] w-[491px]"/>
      </fieldset>
    </form>
    </div>
    <div>
      <button className='bg-[#3E4756] text-white font-semibold rounded-[50px] w-[300px] py-3'>ENTRAR</button>
    </div>
    <div>
      <Link to="/" className="text-[#3E4756] underline text-[20px]">Não possui uma conta? Se cadastre aqui!</Link>
    </div>
</div>


        
    </main>

    </div>
    </>
  )
}

export default Login