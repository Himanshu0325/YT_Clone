import React ,{useEffect, useState}from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import {  Cookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import updateViews from "../Api/UpdateViews";

const useData = () => {
  return new URLSearchParams(useLocation().search);
};

const PlayVideo = () =>{
  
  const value = useData();
  const vid= value.get('q');
  const username = value.get('username')
  const [video , setData]= useState([])
  const [user, setUser]= useState([])
  const [channel , setChannel] = useState([])
  const [isSubscribed , setIsSubscribed] = useState(false)
  const [allVideo , setAllVideo] = useState([])
  const cookie = new Cookies()
  const navigate = useNavigate();

  const sendingChannelData = (un)=>{
      navigate(`/channel-page?q=${un}`);
    }

  const sendingData = (vid , un) => {
    navigate(`/play-video?q=${vid}&username=${un}`);
  }

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

  const FetchChannelData = async () => {
    const accessToken = cookie.get("accessToken")
    await axios({
      method: "post",
      url: 'http://localhost:4000/api/v1/users/get-channel-profile',
      data: { username, accessToken }
    })
      .then((res) => {
        setChannel(res.data)
        if (res.data.isSubscribed) {
          setIsSubscribed(true)
        }
      })
  }

  useEffect(()=>{
    data()
    FetchChannelData()
    AllVideos()
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
  
  const AllVideos = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/video/get-all-videos'
    })
      .then((res) => {
        console.log(res.data.videos);

        setAllVideo(res.data.videos)
      })
  }
  
  
   return(
    <div className="w-full h-full flex overflow-scroll ">
      <div className=" w-[70%] h-[88%] m-4 overflow-scroll ">

        <div className="w-full  h-[70%] rounded-3xl">
          <video className="w-full h-full rounded-3xl" src={video.videoFile} controls ></video>
        </div>

        <div className="w-full p-4 ">
          <p className="w-full text-2xl font-serif font-bold">{video.title}</p>
           <div className="w-full flex justify-between">
             <div className="flex h-[60%]  " >
               <div className="flex" onClick={()=>{
                sendingChannelData(user.username)
             }}>
               <img className="h-[48px] w-[48px] rounded-full " src={user.avatar} alt="" />
               <div className="flex flex-col mr-6">
                 <h3 className="font-serif text-sm text-gray-500">{user.channelName}</h3>
                 <h3 className="font-serif text-sm text-gray-500">{channel.subscribersCount} Subcriber</h3>
               </div>
               </div>

               <button className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white text-center  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
               onClick={(e)=>{
                e.preventDefault()
                if (!isSubscribed) {
                  Subscribe(user.username)
                  location.reload()
                }else{
                  return 0
                }
               }}>{isSubscribed?'Subscribed':'Subscribe'}</button>
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

      <div className=" w-[30%] overflow-scroll m-4 ">
      {
          allVideo.map((video, index) => {
            return (
              <div key={index} id={video.id} className="border border-black h-[18rem] w-full rounded-xl mb-4 " >
                <div className="h-[73%] w-full rounded-xl    " onClick={(e) => {
                  e.preventDefault()
                  updateViews(e.target.id)
                  sendingData(e.target.id , video.user[0].username )
                  location.reload()
                }}>
                  <img className="h-full w-full bg-cover rounded-xl " value={index} id={video._id} src={video.thumbnail} alt="*" />
                </div>
                <div className="h-[26%] w-full pt-2">
                  <div className="w-full h-[60%]  flex relative " onClick={(e)=>{
                    sendingChannelData(video.user[0].username)
                  }}>
                    <img className="h-full w-[10%] rounded-full mr-4" src={video.user[0].avatar} alt="" />
                    <div className="">
                      <h2 className="font-bold text-2xl">{video.title}</h2>
                      <p className=" font-serif text-sm text-gray-400">{video.user[0].channelName}</p>
                      <p className=" font-serif text-sm text-gray-400">{video.views} views • Published On :{new Date(video.createdAt).getDate()}-{new Date(video.createdAt).getMonth()}-{new Date(video.createdAt).getFullYear()}  </p>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
   )
}

export default PlayVideo