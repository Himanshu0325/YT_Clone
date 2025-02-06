import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Cookies } from "react-cookie"
import axios from 'axios';
import getUserProfileData from "../Api/getUsersProfile";

const navItems = [
  { icon: "home", label: "Dashboard", path:"/creator-page" },
  { icon: "video", label: "Content" , path:"/creator-page/video" , logic : ()=>{ } },
  { icon: "bar-chart-2", label: "Analytics" },
  { icon: "settings", label: "Settings" },
]

function Header({ title, toggleSidebar }) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 md:hidden">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <NavLink to='/creator-page/upload-video'>
      <button className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Upload Video</button>
      </NavLink>
    </header>
  )
}
function Sidebar({ navItems, activeItem, setActiveItem, isOpen, setIsOpen }) {
  return (
    <aside className={`bg-white text-white w-64 min-h-screen ${isOpen ? "block" : "hidden"} md:block shadow-2xl`}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black">Your Channel</h2>
      </div>
      
      <nav>
        {navItems.map((item) => (
          <NavLink to={item.path}>
            <button
            key={item.label}
            className={`flex items-center px-4 py-2 mt-2 text-black w-full ${
              activeItem === item.label ? "bg-gray-200" : "hover:bg-gray-200"
            } `}
            onClick={() => {
              setActiveItem(item.label)
              item.logic()
            } }
          >
            <i className={`mr-3 fas fa-${item.icon}`}></i>
            {item.label}
          </button>
          </NavLink>
        ))}
      </nav>
    </aside >
  )
}





function CreatorDashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)


  return (
    <div className="flex h-screen">
      <Sidebar
        navItems={navItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-hidden">
        <Header title={activeItem} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className=" h-[95%] w-[100%] ">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export  default CreatorDashboard

