import React, { useState , useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link , NavLink } from 'react-router-dom';
import getUserProfileData from '../Api/getUsersProfile';
import axios from 'axios';
import SearchPage from './SearchPage';
import { useNavigate } from 'react-router-dom';


const NavItem = ({ href, children }) => (
  <a href={href} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
    {children}
  </a>
);



const Navbar = (props) => {
  const [profileImg , setProfileImg]  = useState('/assets.')
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBox , setFilterBox] = useState(false)
  const [whatToSearch , setWhatToSearch] = useState(0)
  const [IsChannel , setIsChannel] = useState(false)
  const navigate = useNavigate();
  const loginButton = props.loginButton

  const toggleUserOptions = props.toggleUserOptions

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //transfer data to searchpage via url
    navigate(`/search-page?q=${searchQuery}&whatToSearch=${whatToSearch}`);
  };

  // const isUserOpen = props.isUserOpen
  const[avatar, setavatar] = useState("")

  const data = async(e) =>{
    const profileData = await props.profileData;
    const { avatar ,isChannel} = profileData;
    setavatar(avatar)
    setIsChannel(isChannel)
  }
  useEffect(() => {
    data()
  }, []);

  
  return (
    <nav className="bg-[#f5f5f5] shadow-lg">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">YouTube</span>
            </a>
          </div>

          <div className="flex-1 flex items-center justify-center px-2  ">
            <div className="max-w-lg w-full lg:max-w-xs flex items-center ">
              <form onSubmit={handleSearchSubmit} className="relative flex">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* this c0de is for filterbutton */}
              <button className='h-5 w-5' onClick={() => {
                setFilterBox(true)
              }} >
                <img className='h-full w-full' src="https://res.cloudinary.com/dataghar/image/upload/v1738672306/icons8-filter-50_yeslwz.png" alt="" />
              </button>

              {/* this code is for filterBox */}
                <div className={`${filterBox?'visible':'hidden'} absolute bg-white h-[12%] w-[15%] rounded-lg flex flex-col border border-gray-300 top-[5%] right-[27%] `}>
                  <button className='h-[50%] hover:bg-gray-300 rounded-lg ' onClick={()=>{
                    setFilterBox(false)
                    setWhatToSearch(0)
                  }}>Channels</button>
                  <button className='h-[50%] hover:bg-gray-300 rounded-lg'  onClick={()=>{
                    setFilterBox(false)
                    setWhatToSearch(1)
                  }}>Videos</button>
                </div>
            </div>
          </div>

          <div className="sm:ml-6 sm:flex sm:items-center w-[15%]">
            <ul className='text-l flex gap-4 w-full'>

              {loginButton?
                <li className='border-2 border-gray-500 rounded-full w-[60%] flex justify-center '>
                  <NavLink className={``} to={"/register"}>
                    <div className="flex gap-2 items-center w-full">
                      <img className='h-[2rem] w-[2rem] rounded-full ' src="https://res.cloudinary.com/dataghar/image/upload/v1737839048/icons8-account-50_l8bpfi.png" alt="" />
                      <p>Login</p>
                    </div>
                  </NavLink>
                </li> 
            : 

            <div className="flex w-full gap-3">

              <li className='hover:text-gray-500 m-1 border-2 border-gray-500 rounded-full w-[60%] ' >
                <NavLink className={({isActive})=>{
                `${isActive?"text-gray-700":"text-black"} hover:text-gray-800`
              }} to={IsChannel?'/upload-video':'/upload-video/create-channel'}>
                <div className="flex gap-2 items-center w-full justify-center">
                      <img className='h-[2rem] w-[2rem] ' src="https://res.cloudinary.com/dataghar/image/upload/v1738348236/icons8-video-24_onrbfv.png" alt="" />
                      <p>Create</p>
                </div>
              </NavLink>
              </li>

              <li className='m-1'>
                <NavLink className={``} onClick={(e)=>{
                  e.preventDefault()
                  toggleUserOptions()
                }}>
                    <img className='h-[2.5rem] w-[2.5rem] rounded-full ' src={avatar} alt="" />
              </NavLink>
              </li>
            </div>

            }

            </ul>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              About
            </a>
            <a
              href="/services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Services
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Contact
            </a>
          </div>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;

