import React ,{useEffect, useState} from 'react';
import { Cookies } from "react-cookie"
import axios from 'axios';




const VideoPage = () => {

  const [Data , setData] = useState([])
  const cookie= new Cookies()
  const data = async ()=>{
    
  const accessToken = cookie.get('accessToken')
    await axios({
      method:'post',
      url:'http://localhost:4000/api/v1/users/uservideos',
      data: {accessToken}
    })
    .then((res)=>{
  
      setData(res.data[0].userVideo)
      console.log(res.data[0].userVideo);
      
    })
  }
  
  // const url = Window.location.href
  const url = window.location.href
  let ignore = true
  useEffect(() => {
    if (ignore) {
      data()
    }
    ignore = false
    },[]);
  
    

  return (
    <div className='absolute w-[83%] h-[90%] bg-[#f5f5f5] top-[10%] left-[17%] overflow-scroll'>
      <div className="flex flex-col gap-4 pt-8  pl-4  ">
      {
          Data.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden flex h-[20rem] ">
              <div className="w-[50%] h-full aspect-h-9 bg-gray-200">
                <img className='h-full w-full bg-cover' src={video.thumbnail} alt="" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-black">{video.title}</h3>
                <p className="text-sm text-gray-500 pb-8">
                  {video.views} views • Published On :{new Date(video.createdAt).getDate()}-{new Date(video.createdAt).getMonth()}-{new Date(video.createdAt).getFullYear()}
                </p>
                <p>{video.discription}</p>
              </div>
            </div>
          ))
        }
      </div>

      
    </div>
  );
};

export default VideoPage;