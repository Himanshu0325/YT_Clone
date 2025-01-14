import { NavLink } from "react-router-dom"
import axios from "axios"

export default function UserOptions(props){

  const isUserOpen = props.isUserOpen

  // const getUserProfile = async () => {
  //   await axios.get('http://localhost:4000/api/v1/users/profile')
  //   .then(res=>{
  //     console.log(res.data);
  //   })
  // }

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
        <ul>
          <li>
            <button className="px-4 py-2 bg-slate-400 rounded-lg " >Log out</button>
          </li>
        </ul>
      </div>
    </div>
  </>)
}