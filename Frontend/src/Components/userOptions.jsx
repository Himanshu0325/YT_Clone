import { NavLink } from "react-router-dom"
import axios from "axios"
import logoutUser from "../Api/Logout.js"
import getUserProfile from "../Api/getUsersProfile.js"
import { useCookies } from "react-cookie"

export default function UserOptions(props){

  const isUserOpen = props.isUserOpen
  const loginButton = props.loginButton
  const toggleUserOptions = props.toggleUserOptions
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  

  if (loginButton) {
    console.log(loginButton,"from userOption");
    
    return (<>
      <div className={ `w-[20%] h-[25%] bg-white absolute top-16 right-4 rounded-md ${isUserOpen?"visible":"hidden"}`}>
        
        <NavLink className={({ isActive }) => {
                `${isActive ? "text-gray-700" : "text-black"}`
              }} to={"/register"}>
                <button className="py-2 px-4 bg-blue-300 rounded-lg" onClick={()=>{
                  getUserProfile()
                  toggleUserOptions()
                }}>
                  Login
                </button>
              </NavLink>
      </div>
    </>)
  } else {
    return (<>
      <div className={`border-gray-800 w-[20%] h-[65%] bg-white absolute top-16 right-4 rounded-md ${isUserOpen?"visible":"hidden"}`}    >
        <div className="w-[50%] h-[30%] m-auto">
          <img src="" alt="" className="rounded-[50%] w-full h-full" />
        </div>
        <div className="text-center">
          <h1>Name</h1>
          <h2>Username</h2>
        </div>
        <div className="w-full text-center ">
          <ul >
            <li>
              <NavLink className={({ isActive }) => {
                `${isActive ? "text-gray-700" : "text-black"}`
              }} to={""}>
                <img className='h-[2rem] w-[2rem] ' src="" alt="Logout" onClick={()=>{
                  logoutUser(removeCookie)
                  toggleUserOptions()
                }} />
              </NavLink>

            </li>
          </ul>
        </div>
      </div>
    </>)
  }
}