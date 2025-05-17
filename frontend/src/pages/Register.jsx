import { useState } from 'react'
import Logo from "../assets/LogoSmartCity.png"

function App() {


  return (
    <>
    <div className="flex">
    <aside className="bg-[#3E4756] w-[574px] h-[1024px]"></aside>

    <main className='w-[100%]'>
        <div className="flex justify-end">
            <img src={Logo} alt="Logo" />
        </div>
        <div className='flex justify-center'>
            <p className='text-[#3E4756] text-[36px] font-semibold '>Cadastre-se na SmartCity</p>
        </div>
        
    </main>

    </div>
    </>
  )
}

export default App