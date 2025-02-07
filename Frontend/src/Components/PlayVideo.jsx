import React from "react";

const PlayVideo = () =>{
   return(
    <div className="w-full h-full flex overflow-hidden ">
      <div className=" w-[70%] h-[88%] m-4 ">

        <div className="w-full bg-black h-[70%] rounded-3xl">
          <video className="w-full h-full" src=""></video>
        </div>

        <div className="w-full">
          <p>video.title</p>
          <div className="w-full flex justify-between">
          <div className="flex  ">
            <img src="" alt="" />
            <div className="flex flex-col">
              <h3>channelName</h3>
              <h3>subcriber</h3>
            </div>

            <button>Subscribe</button>
          </div>

          <div className="flex">
            <form action="">
              
            </form>
          </div>
          </div>
        </div>
      </div>

      <div className="border border-black w-[30%] h-[88%] m-4 "></div>
    </div>
   )
}

export default PlayVideo