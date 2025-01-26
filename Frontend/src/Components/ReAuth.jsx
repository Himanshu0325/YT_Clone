import axios from "axios"
import { useState , useEffect } from "react"
import { Cookies } from "react-cookie"

const ReAuth = (props) =>{

  const [oldPass , setOldPass] = useState("")
  const [newPass , setNewPass] = useState("")
  const[message, setMessage] = useState("")
  const [buttonText , setButtonText] = useState("")
  const [errorBox , setErrorBox] = useState(false)
  

  const [fullName , setFullName] = useState("")
  const [userName , setUserName] = useState("")
  const [Email , setEmail] = useState("")

  const [newfullName , setNewFullName] = useState("")
  const [newuserName , setNewUserName] = useState("")
  const [newEmail , setNewEmail] = useState("")

  const cookie = new Cookies
  const options = {
    httpOnly: true,
    secure: true,
    Credential:true
  };
  const showUpdatePass = props.showUpdatePass
  const showUpdateScreen = props.showUpdateScreen
  // const toogleshowUpdatePass = props.toogleshowUpdatePass
  const accessToken = cookie.get('accessToken')

  const data = async() =>{
    const profileData = await props.profileData;
    const {fullname , username , email} = profileData
    setFullName(fullname)
    setUserName(username)
    setEmail(email)
  }
  useEffect(() => {
      data()
    }, []);

  const updatePassword = async () =>{
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/v1/users/change-password',
        data: { oldPassword: oldPass, newPassword: newPass, accessToken }
      });

      const code = response.data.code;
      console.log(code);
      if (code === 420) {
        console.log(code);

        const message = response.data.message;
        setErrorBox(true);
        setMessage(message);
        setButtonText("Try Again");
        console.log("try again");
      } else {
        // Handle success case
        console.log("Password updated successfully");
        const message = response.data.message;
          setErrorBox(!errorBox)
          setMessage(message)
          setButtonText("Ok")
          console.log("ok");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorBox(true);
      setMessage('An error occurred. Please try again.');
      setButtonText("Try Again");
    }
  }

  const updateInfo = async () =>{
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/v1/users/update-info',
        data: { fullname:newfullName ,username:newuserName , email:newEmail, password: newPass, accessToken }
      });

      const code = response.data.code;
      console.log(code);
      if (code === 420) {
        console.log(code);

        const message = response.data.message;
        setErrorBox(true);
        setMessage(message);
        setButtonText("Try Again");
        console.log("try again");
      } else {
        // Handle success case
        console.log("Password updated successfully");
        const message = response.data.message;
          setErrorBox(!errorBox)
          setMessage(message)
          setButtonText("Ok")
          console.log("ok");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorBox(true);
      setMessage('An error occurred. Please try again.');
      setButtonText("Try Again");
    }
  }

  return (
    <div className={`w-screen h-screen bg-white absolute top-0 left-0 flex justify-center items-center ${showUpdatePass?"visible":"hidden"}`}  >


    {showUpdateScreen?
    
      <div className={`h-[60%] w-[40%] border-2 border-black rounded-xl flex flex-col `}>
        <h2 className="font-serif text-2xl font-medium self-center m-4  ">Update Your Password</h2>

        <form className="mx-4 flex flex-col " onSubmit={(e)=>{
          e.preventDefault()
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
            props.toogleshowUpdatePass()
          }}>
            Go to Home Page
          </button>
          </div>
        </form>
      </div>

      :

      <div className={`h-[60%] w-[40%] border-2 border-black rounded-xl flex flex-col `}>
        <h2 className="font-serif text-2xl font-medium self-center m-4  ">Account Information</h2>

        <form className="mx-4 flex flex-col " onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <label for="name" className="block font-serif text-lg font-medium  text-gray-700">Name</label>
          <input type="text" id="name" name="name"  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" readOnly={false} defaultValue={fullName} onChange={
            (e)=>{
              setNewFullName(e.target.value)
            }
          }/>

          <label for="userName" className="block font-serif text-lg font-medium  text-gray-700">User Name</label>
          <input type="text" id="userName" name="userName" className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" readOnly={false} defaultValue={userName} onChange={
            (e)=>{
              setNewUserName(e.target.value)
            }
          }/>

          <label for="email" className="block font-serif text-lg font-medium  text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" readOnly={false} defaultValue={Email} onChange={
            (e)=>{
              setNewEmail(e.target.value)
            }
          }/>

          <label for="newPass" className="block font-serif text-lg font-medium  text-gray-700">Password</label>
          <input type="password" id="newPass" name="oldPass"  className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e)=>{
            setNewPass(e.target.value)
          }}/>

          <div className="self-center justify-self-end gap-4">
          <button className=' py-2 px-4 m-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
          onClick={updateInfo}>
            Save
          </button>

          <button className=' py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  '
          onClick={()=>{
            props.toogleshowUpdatePass()
            location.reload()
          }}>
            Go to Home Page
          </button>
          </div>
        </form>
      </div>

  }


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