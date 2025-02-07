import React ,{useEffect, useState}from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const useData = () => {
  return new URLSearchParams(useLocation().search);
};

const PlayVideo = () =>{
  
  const value = useData();
  const vid= value.get('q');
  const [Data , setData]= useState([])
  const [user, setUser]= useState([])
 


  const data = async ()=>{
    await axios({
      method:'post',
      url:'http://localhost:4000/api/v1/video/get-video',
      data:{vid}
    })
    .then((res)=>{
        console.log(res.data.videos[0]);
        
        setData(res.data.videos[0])
        setUser(res.data.videos[0].user[0])
    })
  }

  useEffect(()=>{
    data()
  },[])
  
  console.log(user);
   return(
    <div className="w-full h-full flex overflow-scroll ">
      <div className=" w-[70%] h-[88%] m-4 overflow-scroll ">

        <div className="w-full  h-[70%] rounded-3xl">
          <video className="w-full h-full rounded-3xl" src={Data.videoFile} controls ></video>
        </div>

        <div className="w-full p-4 ">
          <p className="w-full text-2xl font-serif font-bold">{Data.title}</p>
           <div className="w-full flex justify-between">
             <div className="flex h-[60%]  ">
               <img className="h-[48px] w-[48px] rounded-full " src={user.avatar} alt="" />
               <div className="flex flex-col mr-6">
                 <h3 className="font-serif text-sm text-gray-500">{user.channelName}</h3>
                 <h3 className="font-serif text-sm text-gray-500">subcriber</h3>
               </div>

               <button className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white text-center bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Subscribe</button>
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
          <summary> 0 views . 2 days ago </summary>
          <p>
          {Data.discription          }
          </p>
        </details>
      </div>

      <div className="border border-black w-[30%] h-[88%] m-4 "></div>
    </div>
   )
}

export default PlayVideo