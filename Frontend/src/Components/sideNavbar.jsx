import React, { useState } from 'react';
import { Link, NavLink , useLocation } from 'react-router-dom';

// You can replace these with actual icon components if you prefer
const HomeIcon = () => <span>🏠</span>;
const DocumentIcon = () => <span>📄</span>;
const SettingsIcon = () => <span>⚙️</span>;
const HelpIcon = () => <span>❓</span>;
const MenuIcon = () => <span>☰</span>;

const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: DocumentIcon, label: 'Documents', path: '/documents' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  { icon: HelpIcon, label: 'Help', path: '/help' },
];

function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full h-full p-2 border-2 flex justify-start">
        <ul className='pt-[5rem] '>
        {
            navItems.map((item) => {
              return (<li>
                <NavLink className={`text-black`} to={item.path} >
                  {item.label}
                </NavLink>
              </li>)
            })
        }
        </ul>
      </div>
    </>
  );
}

export default SideNavbar;


