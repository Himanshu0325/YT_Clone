import axios from "axios";
import SideNavbar from "./sideNavbar";
import UserOptions from "./userOptions.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Hero(props) {

  const isUserOpen = props.isUserOpen
  const [Data, setData] = useState([])
  const[list , setList] = useState(false)
  const navigate = useNavigate();

  const sendingData = (vid) => {
    navigate(`/play-video?q=${vid}`);
  }

  const data = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:4000/api/v1/video/get-all-videos'
    })
      .then((res) => {
        console.log(res.data.videos);

        setData(res.data.videos)
      })
  }

  const updateViews = async (vid) => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/video/update-views',
      data:{vid}
    })
      .then((res) => {
        console.log(res.data);
      })
  }

  useEffect(() => {
    data()
  }, [])

  return (
    <>
      <div className={`w-full  bg-[#ffffff] grid grid-cols-3 grid-rows-auto p-2 gap-4 overflow-scroll`} >
        {
          Data.map((video, index) => {
            return (
              <div key={index} id={video.id} className=" h-[21rem] w-full rounded-xl  " >
                <div className="h-[75%] w-full rounded-xl  border border-black  " onClick={(e) => {
                  // console.log(location.assign('/play-video'));
                  e.preventDefault()
                  // setVId(e.target.id)
                  console.log(e.target.id);

                  updateViews(e.target.id)
                  sendingData(e.target.id)
                }}>
                  <img className="h-full w-full bg-cover rounded-xl " id={video._id} src={video.thumbnail} alt="" />
                </div>
                <div className="h-[24%] w-full pt-2">
                  <div className="w-full h-[60%]  flex relative ">
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
    </>
  )
}