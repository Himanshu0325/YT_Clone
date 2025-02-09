import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import updateViews from '../Api/UpdateViews';




const useData = () => {
  return new URLSearchParams(useLocation().search);
};

const ChannelPage = () => {
  
  const value = useData();
  const username = value.get('q');
  const cookie = new Cookies()
  const [Data, setData] = useState([])
  const [Video, setVideo] = useState([])
  const navigate = useNavigate();
  
  
  const sendingData = (vid , un) => {
      navigate(`/play-video?q=${vid}&username=${un}`);
    }

  const FetchData = async () => {
    const accessToken = cookie.get("accessToken")
    await axios({
      method: "post",
      url: 'http://localhost:4000/api/v1/users/get-channel-profile',
      data: { username, accessToken }
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data)
        setVideo(res.data.allVideos[0])
      })
  }

  useEffect(() => {
    FetchData()
  }, [])
 

  return (
    <div className='px-8 bg-[#f5f5f5]'>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col  h-[25%]   ">
        <div className="border-2 h-[15rem] w-full  rounded-3xl">
          <img className="h-full w-full rounded-3xl" src={Data.coverImage} alt="" />
        </div>

        <div className="flex flex-shrink-0 h-[8rem] items-center ">
          <div className="flex-shrink-0 h-full ">
            <img
              className="h-full w-32 rounded-full"
              src={Data.avatar ? Data.avatar : 'https://res.cloudinary.com/dataghar/image/upload/v1737839048/icons8-account-50_l8bpfi.png'}
              alt={` logo`}
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">{Data.channelName}</h1>
            <p className="text-gray-500"> {Data.subscribersCount} subscribers . 10 videos</p>
            <p className="text-gray-700 mt-2"></p>
          </div>
        </div>
      </div>
      <main className=''>
        <h2 className='font-bold text-3xl font-serif'>Videos</h2>
        <div className={`w-full  bg-[#ffffff] grid grid-cols-3 grid-rows-auto p-2 gap-4 overflow-scroll`} >
          {
            [Video].map((video, index) => {
              return (
                <div key={index} id={video.id} className=" h-[17rem] w-full rounded-xl  " >
                  <div className="h-[75%] w-full rounded-xl  border border-black  " onClick={(e) => {
                    e.preventDefault()


                    updateViews(e.target.id)
                    sendingData(e.target.id , Data.username )
                    console.log(e.target.id);
                    
                  }}>
                    <img className="h-full w-full bg-cover rounded-xl " value={index} id={video._id} src={video.thumbnail} alt="*" />
                  </div>
                  <div className="h-[24%] w-full pt-2">
                    <div className="w-full h-[60%]  flex relative " onClick={(e) => {
                      // sendingChannelData(video.user[0].username)
                    }}>
                      <img className="h-full w-[10%] rounded-full mr-4" src={Data.avatar} alt="" />
                      <div className="">
                        <h2 className="font-bold text-2xl">{video.title}</h2>
                        <p className=" font-serif text-sm text-gray-400">{Data.channelName}</p>
                        <p className=" font-serif text-sm text-gray-400">{video.views} views • Published On :{new Date(video.createdAt).getDate()}-{new Date(video.createdAt).getMonth()}-{new Date(video.createdAt).getFullYear()}  </p>
                      </div>


                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  );
};

export default ChannelPage;