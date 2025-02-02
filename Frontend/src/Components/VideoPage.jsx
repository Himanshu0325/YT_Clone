import React ,{useEffect, useState} from 'react';
import { Cookies } from "react-cookie"
import axios from 'axios';

// function VideoCard({ title, views, date }) {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{title}</h3>
//         <p className="text-sm text-gray-500">
//           {views} views • {date}
//         </p>
//       </div>
//     </div>
//   )
// }


const VideoPage = () => {

  const [Data , setData] = useState({})
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
  
    function VideoCard({ title, views, date }) {
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            {
              Data.map((video, index) => (
                <VideoCard 
                  key={index}
                  title={video.title}
                  views={video.views}
                  date={video.date}
                />
              ))
            }
            
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">
              {views} views • {date}
            </p>
          </div>
        </div>
      )
    }

  return (
    <div className='absolute w-[83%] h-[90%] bg-[#f5f5f5] top-[10%] left-[17%]'>
      <div className="flex flex-col gap-4 pt-8  pl-4">
        <VideoCard title="How to Build a React App" views="15K" date="2 days ago" />
        <VideoCard title="JavaScript Tips and Tricks" views="22K" date="1 week ago" />
        <VideoCard title="CSS Flexbox Tutorial" views="18K" date="2 weeks ago" />
      </div>
    </div>
  );
};

export default VideoPage;