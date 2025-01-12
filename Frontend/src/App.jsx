import { useState } from 'react'
import Auth from './Components/Auth'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import SideNavbar from './Components/sideNavbar'


function App() {


  const [isOpen, setIsOpen] = useState(true)
  const toggleSidebar = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex ">
        <div className={`${isOpen?"w-[15%]":"w-[5%]"} h-full transition-[width] duration-[500ms]`}>
         <span className={`fixed  text-2xl cursor-pointer ${isOpen?'left-[12%] top-4':'left-4 top-4'} transition-all duration-500`} onClick={toggleSidebar}>☰</span>
          <SideNavbar/>
        </div>
        <div className={`${isOpen?"w-[85%]":"w-[95%]"} h-full transition-[width] duration-[500ms]`}>
          <Navbar/>
          <Outlet/>
        </div>

      </div>
    </>
  )
}

export default App
