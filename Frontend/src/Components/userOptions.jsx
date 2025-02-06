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
  const toogleshowUpdatePass = props.toogleshowUpdatePass
  const toogleshowUpdateScreen = props.toogleshowUpdateScreen
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const[userName, setUserName] = useState("UserName")
  const[fullName, setFullName] = useState("FullName")
  const[avatar, setavatar] = useState("")
  const[Ischannel , setIscahnnel] = useState(false)
  

  const data = async() =>{
    const profileData = await props.profileData;
    
    const { fullname,username , avatar , isChannel} = profileData;
    setFullName(fullname)
    setUserName(username)
    setavatar(avatar)
    setIscahnnel(isChannel)
  }

  useEffect(() => {
    data()
  }, []);

  

  if (!loginButton) {
    return (<>
      <div className={`border-2 border-gray-500 w-[20%] h-[65%] bg-white absolute top-16 right-4 rounded-md  p-4 ${isUserOpen?"visible":"hidden"}`}    >
        <div className="w-[50%] h-[30%] m-auto rounded-lg">
          <img src={avatar} alt="" className="rounded-[50%] w-full h-full bg-cover" />
        </div>
        <div className="text-center border-b-2 border-b-gray-400 m-4 ">
          <h1 className="font-serif text-xl">{fullName}</h1>
          <h2 className="font-serif text-sm">{userName}</h2>
        </div>
        <div className="w-full text-center flex justify-center ">
          <ul className="w-full  gap-4  flex flex-col" >
            <li className="flex w-full">
              <NavLink to={'/Reauth-Password'}>
              <button className="flex " onClick={()=>{
                toggleUserOptions()
                toogleshowUpdateScreen(true)
              }} >
              <img className='h-[2rem] w-[2rem] ' src="https://res.cloudinary.com/dataghar/image/upload/v1737838789/icons8-change-48_gryjrw.png" alt="" />
              <p className="font-serif text-lg p-2">Change Password</p>
              </button>
              </NavLink>
            </li>
            <li className="flex w-full border-b-2 border-b-gray-400 p-2">
              <NavLink to={'/Reauth-Information'} >
              <button className="flex" onClick={()=>{
                toggleUserOptions()
                toogleshowUpdateScreen(false)
              }}>
                <img className='h-[2rem] w-[2rem] ' src="https://res.cloudinary.com/dataghar/image/upload/v1737912893/change_account_nrehbl.png" alt="" />
                <p className="font-serif text-lg">Update Information</p>
              </button>
              </NavLink>
            </li>
            <li className="flex w-full border-b-2 border-b-gray-400 p-2">
              <NavLink to={Ischannel?'/creator-page':'/upload-video/create-channel'}>
                <button className="flex" onClick={()=>{toggleUserOptions()}}>
                  <img  className='h-[2rem] w-[2rem] mr-2' src="https://res.cloudinary.com/dataghar/image/upload/v1738441042/video-recording_i2kuu7.svg" alt="" />
                  <p className="font-serif text-lg">{Ischannel?'Your Channel':'Create Channel'}</p>
                </button>
              </NavLink>
            </li>
            <li className="flex w-full m-4">
              <button className={`w-full flex gap-4 `}
                onClick={() => {
                  logoutUser(removeCookie)
                  toggleUserOptions()
                }}>
                <img className='h-[2rem] w-[2rem] ' src="https://res.cloudinary.com/dataghar/image/upload/v1737913197/Log_Out_v3hwzq.png" alt="" />
                <p className="font-serif text-lg">LogOut</p>
              </button>

            </li>
          </ul>
        </div>
      </div>
    </>)
  }
}