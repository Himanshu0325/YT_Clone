import React, { useState } from 'react';
import { Link, NavLink , useLocation } from 'react-router-dom';


// You can replace these with actual icon components if you prefer
const HomeIcon = () => { return <span>🏠</span>;}
const watchHistory = () => { return <span>📄</span>;}
const SettingsIcon = () => { return <span>⚙️</span>;}
const HelpIcon = () => { return <span>❓</span>;}
const MenuIcon = () => { return <span>☰</span>;}

const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: watchHistory, label: 'Subcriptions', path: '/subcribed-channel' },
  { icon: watchHistory, label: 'WatchHistory', path: '/watch-history' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  { icon: HelpIcon, label: 'Help', path: '/help' },
];

function SideNavbar(props) {

  const isOpen = props.isOpen
  // const [isOpen, setIsOpen] = useState(false);
  // const location = useLocation();

  // const toggleSidebar = () => {
  //   console.log(isOpen);
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <div className="w-full h-full p-2 border-2 flex ">
        <ul className='pt-[5rem] w-full '>
          {
            navItems.map((item,id) => {
              if (!isOpen) {
                return <li className='flex flex-col items-center'>
                  <NavLink className={`text-black text-2xl`} to={item.path} key={id} >
                    {item.icon}
                  </NavLink>
                </li>
              } else {
                return <li>
                  <NavLink className={`text-black text-xl font-serif ml-4 gap-2 flex`} to={item.path} key={id} >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              }
            })
          }
        </ul>
      </div>
    </>
  );
}

export default SideNavbar;


