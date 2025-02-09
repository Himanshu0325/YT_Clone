import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { data, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};



const SearchPage = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const whatToSearch = query.get('whatToSearch');
  const [Data, setData] = useState([]);
  const [resultScreen , setresultScreen] = useState(false)
  const [channel , setChannel] = useState([])
  const [isSubscribed , setIsSubscribed] = useState(false)
  const cookie = new Cookies()


  const fetchData = async () => {
    try {
      let response;
      if (whatToSearch === '0') {
        response = await axios.post('http://localhost:4000/api/v1/users/search-channel', { searchQuery });

        const code = response.data.code 
        if (code === 400) {
          setresultScreen(true)
        }else if (code === 200) {
          setresultScreen(false)
        }
      } else if (whatToSearch === '1') {
        response = await axios.post('http://localhost:4000/api/v1/videos/search-video', { searchQuery });
      }
      setData([response.data.user]);
      console.log(response);

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const FetchChannelData = async () => {
    const accessToken = cookie.get("accessToken")
    const username = searchQuery
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


  useEffect(() => {
    FetchChannelData();
    fetchData();
  }, [searchQuery]);

  console.log(isSubscribed);
  return (
    <div className=' w-full h-full bg-[#f5f5f5] overflow-scroll'>
      { resultScreen?
        
        <div className="flex text-center  gap-4 pt-8  pl-4 h-full w-full items-center">
          <p className='text-3xl font-serif font-bold text-center  w-full'>User not found</p>
        </div>
       
       :
      <div className="flex flex-col gap-4 pt-8  pl-4  ">
        {
          Data.map((data) => {
            return (
              <div className="border-2 border-black h-[15rem] rounded-3xl flex flex-row items-center justify-between p-4">
                <div key={data._id} className='flex flex-row gap-4 h-full w-[20%]'>
                  <img src={data.avatar ? data.avatar : ""} alt="channel" className='w-full h-full rounded-full' />
                </div>

                <div key={data.id} className="h-full w-[70%] flex flex-col gap-2 justify-center pl-6">
                  <h1 className='text-3xl font-serif font-bold'>{data.channelName}</h1>
                  <h3 className='text-xl font-serif font-bold text-gray-700'>{data.username}</h3>
                  {/* <p>{data.channelDescription}</p> */}
                </div>
                <div className="">
                  <button className='"flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white text-center  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"'
                   onClick={(e)=>{
                    e.preventDefault()
                    if (!isSubscribed) {
                      Subscribe(data.username)
                      location.reload()
                    }else{
                      return 0
                    }
                   }}>{isSubscribed?'Subscribed':'Subscribe'}</button>
                </div>
              </div>
            );
          }
          
        )
        }
      </div>
      }
      </div>
  );
};

export default SearchPage;