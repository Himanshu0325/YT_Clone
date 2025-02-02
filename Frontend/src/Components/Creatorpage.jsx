import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
// import Sidebar from "./Sidebar"
// import Header from "./Header"
// import StatCard from "./StatCard"
// import VideoCard from "./VideoCard"

const navItems = [
  { icon: "home", label: "Dashboard" },
  { icon: "video", label: "Content" , path:"/creator-page/video" },
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
      <button className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Upload Video</button>
    </header>
  )
}
function Sidebar({ navItems, activeItem, setActiveItem, isOpen, setIsOpen }) {
  return (
    <aside className={`bg-white text-white w-64 min-h-screen ${isOpen ? "block" : "hidden"} md:block shadow-2xl`}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-black">Your Channel</h2>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dataghar/image/upload/v1737839048/icons8-account-50_l8bpfi.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-black">John Doe</h3>
            <p className="text-sm text-gray-800">@johndoe</p>
          </div>
        </div>
      </div>
      <nav>
        {navItems.map((item) => (
          // <button
          //   key={item.label}
          //   className={`flex items-center px-4 py-2 mt-2 text-gray-100 w-full ${
          //     activeItem === item.label ? "bg-gray-700" : "hover:bg-gray-700"
          //   }`}
          //   onClick={() => setActiveItem(item.label)}
          // >
          //   <i className={`mr-3 fas fa-${item.icon}`}></i>
          //   {item.label}
          // </button>
          <NavLink to={item.path}>
            <button
            key={item.label}
            className={`flex items-center px-4 py-2 mt-2 text-black w-full ${
              activeItem === item.label ? "bg-gray-200" : "hover:bg-gray-200"
            } `}
            onClick={() => setActiveItem(item.label)}
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
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  )
}
function VideoCard({ title, views, date }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">
          {views} views • {date}
        </p>
      </div>
    </div>
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

      <div className="flex-1 overflow-auto">
        <Header title={activeItem} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Views" value="1.2M" />
            <StatCard title="Watch Time" value="45K hours" />
            <StatCard title="Subscribers" value="100K" />
            <StatCard title="Revenue" value="$5,230" />
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Recent Videos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <VideoCard title="How to Build a React App" views="15K" date="2 days ago" />
            <VideoCard title="JavaScript Tips and Tricks" views="22K" date="1 week ago" />
            <VideoCard title="CSS Flexbox Tutorial" views="18K" date="2 weeks ago" />
          </div>

          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export  default CreatorDashboard

