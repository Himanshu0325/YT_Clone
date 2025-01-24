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
    const { fullname,username , avatar , message} = profileData;
    setFullName(fullname)
    setUserName(username)
    setavatar(avatar)
  }

  useEffect(() => {
    data()
  }, []);

  

  if (!loginButton) {
    return (<>
      <div className={`border-2 border-gray-500 w-[20%] h-[65%] bg-white absolute top-16 right-4 rounded-md  p-4 ${isUserOpen?"visible":"hidden"}`}    >
        <div className="w-[50%] h-[30%] m-auto rounded-lg">
          <img src={avatar} alt="" className="rounded-[50%] w-full h-full" />
        </div>
        <div className="text-center border-b-2 border-b-gray-400 m-4 ">
          <h1 className="font-serif text-xl">{fullName}</h1>
          <h2 className="font-serif text-sm">{userName}</h2>
        </div>
        <div className="w-full text-center flex justify-center ">
          <ul className="w-full  gap-4  flex flex-col" >
            <li className="flex w-full">
              <img className='h-[2rem] w-[2rem] ' src="" alt="" />
                <p className="font-serif text-lg">Change Password</p>
            </li>
            <li className="flex w-full border-b-2 border-b-gray-400">
              <img className='h-[2rem] w-[2rem] ' src="" alt="" />
                <p className="font-serif text-lg">Update Information</p>
            </li>
            <li className="flex w-full">
              <button className={`w-full flex gap-4 `}
                onClick={() => {
                  logoutUser(removeCookie)
                  toggleUserOptions()
                }}>
                <img className='h-[2rem] w-[2rem] ' src="" alt="" />
                <p className="font-serif text-lg">LogOut</p>
              </button>

            </li>
          </ul>
        </div>
      </div>
    </>)
  }
}