import React ,{useEffect, useState} from 'react';
import { Cookies } from "react-cookie"
import axios from 'axios';




const VideoPage = () => {

  const [Data , setData] = useState([])
  const cookie= new Cookies()
  const [videoId , setVideoId ] = useState(0)
  const [option , setOptions] = useState(false)
  const length = Data.length



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
  
  
  useEffect(() => {
    //used this to ensure getUserProfile function does not run evry time a function is render
    let ignore = false;
    
    if (!ignore)  data()
    return () => { ignore = true; }
    },[]);
  
  const deleteVideo = async (videoId)=>{
    console.log(videoId,'fun');
    
    await axios({
      method:'post',
      url:'http://localhost:4000/api/v1/video/delete-video',
      data: { videoId }
    }).then(
      (res)=>{
        console.log('video deleted ');
        
      }
    )
  }

  
    if(length === 0){
      return(
        <div className='flex justify-center items-center h-[80vh]'>
          <h1 className='text-3xl'>No Videos Uploaded</h1>
        </div>
      )
    }else{
      return(
        <div className=' w-full h-full bg-[#f5f5f5] overflow-scroll'>
      <div className="flex flex-col gap-4 pt-8  pl-4  ">
      {
          Data.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden flex h-[20rem] relative">
              <div className="w-[50%] h-full aspect-h-9 bg-gray-200">
                <img className='h-full w-full bg-cover rounded-lg' src={video.thumbnail} alt="" />
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="font-semibold text-lg text-black">{video.title}</h3>
                <p className="text-sm text-gray-500 pb-8">
                  {video.views} views • Published On :{new Date(video.createdAt).getDate()}-{new Date(video.createdAt).getMonth()}-{new Date(video.createdAt).getFullYear()}
                </p>
                <p>{video.discription}</p>
              </div>
              <span className='absolute top-0 right-0 p-4 ' key={index} id={video._id} onClick={(e)=>{
                e.target.addEventListener('click', (e)=>{
                  setVideoId(e.target.id)
                  setOptions(true)
                })
              }}>:</span>
              <div className={`absolute border-2 border-black h-[40%] w-[15%] m-4 top-0 right-0 ${option?'visible':'hidden'} rounded-3xl flex flex-col `}>
                <button className='py-2 px-4  rounded-3xl hover:bg-[#f5f5f5]' onClick={()=>{
                  deleteVideo(videoId)
                  location.assign('http://localhost:5173/creator-page/video')
                  }}>Delete</button>
                <button className='py-2 px-4  rounded-3xl hover:bg-[#f5f5f5]' onClick={()=>setOptions(false)}>Close</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
      )
    }
    
  
};

export default VideoPage;