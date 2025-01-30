import { useEffect, useState } from 'react'
import Auth from './Components/Auth'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
import SideNavbar from './Components/sideNavbar'
import UserOptions from './Components/userOptions'
import axios from 'axios'
import {Cookies} from "react-cookie"
import getUserProfileData from './Api/getUsersProfile.js'
import ReAuth from './Components/ReAuth.jsx'




function App() {

  const cookies = new Cookies();
  const [loginButton , setLoginButton] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isUserOpen , setIsUserOpen ] = useState(false)
  const [showUpdatePass , setShowUpdatePass] = useState(false)
  const [showUpdateScreen , setShowUpdateScreen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserOptions = () => {
    setIsUserOpen(!isUserOpen);
  };

  const toogleshowUpdatePass = () => {
    setShowUpdatePass(!showUpdatePass)
  }

  const toogleshowUpdateScreen = (value) => {
    setShowUpdateScreen(value)
  }

  const getUserProfile = async () => {
    
    const token = cookies.get('accessToken')
    console.log("token:",token);
    
    if (!token) {
      setLoginButton(!loginButton)
    } else {
      setLoginButton(loginButton)
    }
  }


  
  useEffect(() => {
    // used this to ensure getUserProfile function does not run evry time a function is render
    // if(isUserOpen){
    //   getUserProfile()
    // }

    getUserProfile()
    
    },[]);

    const data = async(e) =>{
      const profileData = await getUserProfileData();
      
      return profileData
    }
    const profileData = data()

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex overflow-hidden ">
        <div className={`${isOpen?"w-[15%]":"w-[5%]"} h-full transition-[width] duration-[500ms]`}>
         <span className={`fixed  text-2xl cursor-pointer ${isOpen?'left-[12%] top-4':'left-4 top-4'} transition-all duration-500`} onClick={toggleSidebar}>☰</span>
          <SideNavbar isOpen={isOpen}  />
        </div>
        <div className={`${isOpen?"w-[85%]":"w-[95%]"} h-full transition-[width] duration-[500ms]`}>
          <Navbar toggleUserOptions={toggleUserOptions} loginButton={loginButton} isUserOpen={isUserOpen} profileData={profileData} />
          <Outlet/>

          <UserOptions isUserOpen={isUserOpen} loginButton={loginButton} toggleUserOptions={toggleUserOptions} toogleshowUpdatePass={toogleshowUpdatePass} profileData={profileData} toogleshowUpdateScreen={toogleshowUpdateScreen}  />
          {/* <ReAuth showUpdatePass={showUpdatePass} toogleshowUpdatePass={toogleshowUpdatePass} profileData={profileData} showUpdateScreen={showUpdateScreen} /> */}
        </div>

      </div>
    </>
  )
}

export default App
