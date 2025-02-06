import React from 'react';

const SearchPage = () => {
  return (
    <div className=' w-full h-full bg-[#f5f5f5] overflow-scroll'>
      <div className="flex flex-col gap-4 pt-8  pl-4  ">
      {
          Data.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden flex h-[20rem] relative">
              <div className="w-[50%] h-full aspect-h-9 bg-gray-200">
                <img className='h-full w-full bg-cover' src={video.thumbnail} alt="" />
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
  );
};

export default SearchPage;