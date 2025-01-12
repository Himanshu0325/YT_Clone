import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link , NavLink } from 'react-router-dom';

const NavItem = ({ href, children }) => (
  <a href={href} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
    {children}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-lg">
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

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* <NavItem href="/" children='Home'></NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem> */}
            <ul className='text-l flex gap-2 '>

              <li className='hover:text-gray-500'>
                <NavLink className={({isActive})=>{
                `${isActive?"text-gray-700":"text-black"} hover:text-gray-800`
              }} to={"/"}>Home</NavLink>
              </li>


              <li className='hover:text-gray-500'>
                <NavLink className={({isActive})=>{
                `${isActive?"text-gray-700":"text-black"}`
              }} to={"/Register"}>Login</NavLink>
              </li>


              {/* <li className='hover:text-gray-500'>
                <NavLink className={({isActive})=>{
                `${isActive?"text-gray-500":"text-black"}`
              }} to={"/PasswordGenerator"} >PasswordGenerator</NavLink>
              </li>


              <li className='hover:text-gray-500'>
                <NavLink className={({isActive})=>{
                `${isActive? "text-white": "text-black"}`
              }} to={"/CurrencyConverter"}>Currency Converter</NavLink>
              </li>

              <li className='hover:text-gray-500'>
                <NavLink className={({isActive})=>{
                `${isActive? "text-white": "text-black"}`
              }} to={"/Digitalclock"}>Digitalclock</NavLink>
              </li> */}

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

