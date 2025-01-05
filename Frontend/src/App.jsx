import { useState } from 'react'
import Auth from './Components/Auth'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar />
      <Outlet/>
      {/* < Auth /> */}
    </>
  )
}

export default App
