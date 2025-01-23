import { NavLink } from "react-router-dom"
import axios from "axios"
import logoutUser from "../Api/Logout.js"
import getUserProfileData from "../Api/getUsersProfile.js"
import { useCookies } from "react-cookie"
import { useState , useEffect} from "react"

export default function UserOptions(props){

  const isUserOpen = props.isUserOpen
  const loginButton = props.loginButton
  const toggleUserOptions = props.toggleUserOptions
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const[userName, setUserName] = useState("UserName")
  const[fullName, setFullName] = useState("FullName")
  const[avatar, setavatar] = useState("")
  

  const data = async() =>{
    const profileData = await getUserProfileData();
    const { username, fullname , avatar} = profileData;
    setFullName(username)
    setUserName(fullname)
    setavatar(avatar)
  }
  useEffect(() => {
    if (isUserOpen) {
      data();
    }
  }, [isUserOpen]);

  

  if (!loginButton) {
    return (<>
      <div className={`border-gray-800 w-[20%] h-[65%] bg-white absolute top-16 right-4 rounded-md ${isUserOpen?"visible":"hidden"}`}    >
        <div className="w-[50%] h-[30%] m-auto">
          <img src={avatar} alt="" className="rounded-[50%] w-full h-full" />
        </div>
        <div className="text-center">
          <h1>{fullName}</h1>
          <h2>{userName}</h2>
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