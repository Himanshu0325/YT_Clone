import React ,{useEffect, useState}from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import {  Cookies } from "react-cookie";

const useData = () => {
  return new URLSearchParams(useLocation().search);
};

const PlayVideo = () =>{
  
  const value = useData();
  const vid= value.get('q');
  const username = value.get('username')
  const [video , setData]= useState([])
  const [user, setUser]= useState([])
  const cookie = new Cookies()
 


  const data = async ()=>{
    await axios({
      method:'post',
      url:'http://localhost:4000/api/v1/video/get-video',
      data:{vid}
    })
    .then((res)=>{
        
        setData(res.data.videos[0])
        setUser(res.data.videos[0].user[0])
    })
  }

  const isSubscribe = async ()=>{
    const accessToken = cookie.get("accessToken")
    await axios ({
      method:'post',
      url:'http://localhost:4000/api/v1/subscription/is-subscribe',
      data:{username , accessToken}
    })
    .then((res)=>{
      console.log(res);
      
    })
  }

  useEffect(()=>{
    data()
    // isSubscribe()
  },[])

  const Subscribe = (un) =>{

    axios({
      method:'post',
      url:'http://localhost:4000/api/v1/subscription/subscribe',
      data:{
        // id:user._id,
        accessToken:cookie.get('accessToken'),
        username:un
      }
    })
    .then((res)=>{
      console.log(res);
    })
  }
  
  console.log(user);
  console.log(video);
  
  
   return(
    <div className="w-full h-full flex overflow-scroll ">
      <div className=" w-[70%] h-[88%] m-4 overflow-scroll ">

        <div className="w-full  h-[70%] rounded-3xl">
          <video className="w-full h-full rounded-3xl" src={video.videoFile} controls ></video>
        </div>

        <div className="w-full p-4 ">
          <p className="w-full text-2xl font-serif font-bold">{video.title}</p>
           <div className="w-full flex justify-between">
             <div className="flex h-[60%]  ">
               <img className="h-[48px] w-[48px] rounded-full " src={user.avatar} alt="" />
               <div className="flex flex-col mr-6">
                 <h3 className="font-serif text-sm text-gray-500">{user.channelName}</h3>
                 <h3 className="font-serif text-sm text-gray-500">subcriber</h3>
               </div>

               <button className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white text-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
               onClick={(e)=>{
                console.log(user.username);
                Subscribe(user.username)
               }}>Subscribe</button>
             </div>

             <div className="flex">
               <form action="">
                 <input type="radio" id="like" name="Dbutton" />
                 <label htmlFor="like">Like</label>
                 <input type="radio" id="Unlike" name="Dbutton" />
                 <label htmlFor="Unlike">UnLike</label>
               </form>
             </div>
           </div>
        </div>

        <details  >
          <summary> {video.views} views • Published On :{new Date(video.createdAt).getDate()}-{new Date(video.createdAt).getMonth()}-{new Date(video.createdAt).getFullYear()} </summary>
          <p>
          {video.discription }
          </p>
        </details>
      </div>

      <div className="border border-black w-[30%] h-[88%] m-4 "></div>
    </div>
   )
}

export default PlayVideo