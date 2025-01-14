import { NavLink } from "react-router-dom"
import axios from "axios"

export default function UserOptions(props){

  const isUserOpen = props.isUserOpen
  const loginButton = props.loginButton

  // const getUserProfile = async () => {
  //   await axios.get('http://localhost:4000/api/v1/users/profile')
  //   .then(res=>{
  //     console.log(res.data);
  //   })
  // }

  if (loginButton) {
    console.log(loginButton,"from userOption");
    
    return (<>
      <div className={ `w-[20%] h-[25%] bg-white absolute top-16 right-4 rounded-md ${isUserOpen?"visible":"hidden"}`}>
        <button>Log in</button>
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
          <ul>
            <li>
              <NavLink className={({ isActive }) => {
                `${isActive ? "text-gray-700" : "text-black"}`
              }} to={"/register"}>
                <img className='h-[2rem] w-[2rem] ' src="" alt="Login" />
              </NavLink>

            </li>
          </ul>
        </div>
      </div>
    </>)
  }
}