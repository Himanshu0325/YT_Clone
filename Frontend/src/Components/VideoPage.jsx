import React from 'react';

function VideoCard({ title, views, date }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        
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

const VideoPage = () => {
  return (
    <div className='absolute w-full h-full bg-gray-100 top-[10%] left-[17%]'>
      <div className="flex flex-col gap-4 pt-8  pl-4">
        <VideoCard title="How to Build a React App" views="15K" date="2 days ago" />
        <VideoCard title="JavaScript Tips and Tricks" views="22K" date="1 week ago" />
        <VideoCard title="CSS Flexbox Tutorial" views="18K" date="2 weeks ago" />
      </div>
    </div>
  );
};

export default VideoPage;