import { useState , useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from "axios"
import {useCookies} from "react-cookie"
import getUserProfileData from '../Api/getUsersProfile.js'

export default function AnimatedAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const[message, setMessage] = useState("")
  const [errorBox , setErrorBox] = useState(false)
  const [form , setForm] = useState({
    fullName : "",
    userName:"",
    email:"",
    password:"",
    avatar:"",
    coverImage:"",
   })


   const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", form.avatar);
    formData.append("coverImage", form.coverImage);
    formData.append("fullName", form.fullName);
    formData.append("userName", form.userName);
    formData.append("email", form.email);
    formData.append("password", form.password);

    axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/users/register',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("data transfer failed", error);
      });
  };

  const verify = async (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/users/login',
      data: {
        email: form.email,
        password: form.password
      }
    })
      .then(function (res) {
        
        const code = res.data.code

        if (code===200) {
          const accessToken = res.data.data[0];
        const refreshToken = res.data.data[1];
        const status = res.data.code
        console.log(status);

        const options = {
          path: '/',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          //httpOnly: true,
          secure: true,
        };
        

        setCookie('accessToken', accessToken, options);
        setCookie('refreshToken', refreshToken, options );
        location.reload()
        location.assign("http://localhost:5173/")
        }else{
          const data = async ()=>{
            const message = res.data.message;
            setErrorBox(!errorBox)
            setMessage(message)
          }
          data()
        }
        
      })
      .catch(function (error) {
        console.log("data transfer failed", error);
      });
       
  };

  
  

  // const data = async ()=>{
  //   const profileData = await getUserProfileData();
  //   const { Message} = profileData;
  //   setMessage(Message)
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <motion.h2
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </motion.h2>
        <motion.form
          key={isLogin ? 'loginForm' : 'signupForm'}
          initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
          onSubmit={isLogin ? verify : submit}
        >
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e)=> setForm({...form , fullName:e.target.value})}
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e)=> setForm({...form , userName:e.target.value})}
              />
            </div>
          )}    

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e)=> {setForm({...form , email:e.target.value})
              }}
            />
          </div>
          {!isLogin && (
            <>
            <div>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) =>{
                setForm({...form , avatar: e.target.files[0]})}}
            />
          </div>
          <div>
            <label htmlFor="coverPicture">Cover Picture</label>
            <input
              id="coverPicture"
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) =>{
                setForm({...form , coverImage: e.target.files[0]})}}
            />
          </div>
            </>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e)=> {setForm({...form , password:e.target.value})}
              }
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

            onClick={isLogin ? verify : submit}
            > 
              {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </motion.form>
        <motion.p
          key={isLogin ? 'loginToggle' : 'signupToggle'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-sm text-gray-600"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </motion.p>
      </motion.div>


        {/* block which are hidden genarly  */}

      <div className= {`h-[30%] w-[30%] bg-white absolute ${errorBox?"visible":"hidden"} flex justify-evenly items-center flex-col border border-black rounded-lg shadow-xl`} >
        <p className='text-xl font-medium'>{message}</p>
        <button className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={()=>{
          setErrorBox(!errorBox)
        }}>
          Try Again
        </button>
      </div>
    </div>
  )
}

