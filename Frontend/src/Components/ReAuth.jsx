import axios from "axios"
import { useState } from "react"
import { Cookies } from "react-cookie"

const ReAuth = (props) =>{

  const [oldPass , setOldPass] = useState("")
  const [newPass , setNewPass] = useState("")
  const[message, setMessage] = useState("")
  const [buttonText , setButtonText] = useState("")
  const [errorBox , setErrorBox] = useState(false)
  const cookie = new Cookies
  const options = {
    httpOnly: true,
    secure: true,
    Credential:true
  };
  const showUpdatePass = props.showUpdatePass
  const toogleshowUpdatePass = props.toogleshowUpdatePass
  const accessToken = cookie.get('accessToken')

  const updatePassword = async () =>{
    axios({
      method : 'post',
      url : 'http://localhost:4000/api/v1/users/change-password',
      data : {oldPassword:oldPass , newPassword:newPass , accessToken}
    })
    .then((res)=>{
      if (res.code === 400) {
        console.log(res.code);
        
        const data = async ()=>{
          const message = res.data.message;
          setErrorBox(!errorBox)
          setMessage(message)
          setButtonText("Try Again")
          console.log("try again");
          
        }
        data()
      }else{
        const data = async ()=>{
          const message = res.data.message;
          setErrorBox(!errorBox)
          setMessage(message)
          setButtonText("Ok")
          console.log("ok");
          
        }
        data()
        
        
      }
    })
    .catch((err)=>{
      console.log(err,"Something went wrong");
      
    })
  }

  return (
    <div className={`w-screen h-screen bg-white absolute top-0 left-0 flex justify-center items-center ${showUpdatePass?"visible":"hidden"}`}  >
      <div className="h-[60%] w-[40%] border-2 border-black rounded-xl flex flex-col">
        <h2 className="font-serif text-2xl font-medium self-center m-4  ">Update Your Password</h2>

        <form className="mx-4 flex flex-col " onSubmit={(e)=>{
          e.preventDefault()
          updatePassword()
        }}>
          <label for="oldPass" className="block font-serif text-lg font-medium  text-gray-700">Enter your old password</label>
          <input type="password" id="oldPass" name="oldPass"  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e)=>{
            setOldPass(e.target.value)
          }}/>

          <label for="newPass" className="block font-serif text-lg font-medium  text-gray-700">Enter your new password</label>
          <input type="password" id="newPass" name="oldPass"  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e)=>{
            setNewPass(e.target.value)
          }}/>

          <div className="self-center justify-self-end gap-4">
          <button className=' py-2 px-4 m-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
          onClick={updatePassword}>
            Submit
          </button>

          <button className=' py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  '
          onClick={()=>{
            toogleshowUpdatePass()
          }}>
            Go to Home Page
          </button>
          </div>
        </form>
      </div>



        {/* block which are hidden genarly  */}

      <div className= {`h-[30%] w-[30%] bg-white absolute ${errorBox?"visible":"hidden"} flex justify-evenly items-center flex-col border border-black rounded-lg shadow-xl`} >
        <p className='text-xl font-medium'>{message}</p>
        <button className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={()=>{
          setErrorBox(!errorBox)

        }}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default ReAuth