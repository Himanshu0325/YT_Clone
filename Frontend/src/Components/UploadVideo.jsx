import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Cookies } from "react-cookie"

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: '',
    discription: '',
    thumbnail: null,
    videoFile: null
  });
  const [message, setMessage] = useState('')
  const [confirmBox, setConfirmBox] = useState(false)
  const cookie = new Cookies()
  const accessToken = cookie.get('accessToken')

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('discription', form.discription);
    formData.append('thumbnail', form.thumbnail);
    formData.append('videoFile', form.videoFile);
    formData.append('accessToken', accessToken);

    axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/video/create-video',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        setMessage(res.data.message)
      })
      .catch((error) => {
        console.log("data transfer failed", error);

      })



  };

  return (
    <div className="absolute bg-white w-[70%] h-[75%] top-[10%] left-[20%] rounded-3xl border-2 border-black">
      <div className="h-[10%] w-[100%] border-b-2 border-b-black flex items-center">
        <p className='text-black text-xl font-serif ml-4 flex'>Upload Video</p>
        <span className='justify-self-end' onClick={(e) => {
          e.preventDefault()
          const url = window.location.href.replace('http://localhost:5173/','/')
          
          
          if (url == '/upload-video') {
            location.assign('/')
            
            
          }
          else {
            location.assign('/creator-page/video')
            
            
          }
        }}>✖</span>
      </div>

      <div className="h-[85%] flex flex-col items-center justify-center gap-2">
        <form action='post' className='flex flex-col w-65% h-[85%]' onSubmit={(e) => {
          e.preventDefault()
        }}>
          <label className='block font-serif text-lg font-medium text-gray-700' htmlFor='title'>Title</label>
          <input className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type='text' id='title' onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <label className='block font-serif text-lg font-medium text-gray-700' htmlFor='discription'>Description</label>
          <input className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type='text' id='discription' onChange={(e) => setForm({ ...form, discription: e.target.value })} />

          <label className='block font-serif text-lg font-medium text-gray-700'>Thumbnail</label>
          <input className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="file" name="thumbnail" id="thumbnail" onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })} />

          <label className='block font-serif text-lg font-medium text-gray-700'>Video</label>
          <input className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="file" id="videoFile" onChange={(e) => setForm({ ...form, videoFile: e.target.files[0] })} />

          <NavLink className='text-center text-black text-xl font-serif ml-4 border-2 border-black hover:bg-gray-100 rounded-3xl w-[45%] mt-8' to={'/'}>
            <button className='text-center' type="button" onClick={(e) => {
              e.preventDefault()
              handleUpload()
              setConfirmBox(!confirmBox)
            }}>Upload</button>
          </NavLink>
        </form>
        <p className='text-black text-lg font-serif ml-4'>Your videos will be private until you publish them.</p>
      </div>

      <div className={`${confirmBox ? 'visible' : 'hidden'} absolute h-[50%] w-[40%] bg-white top-[30%] left-[30%] rounded-3xl border-2 border-black shadow-2xl items-center justify-center flex flex-col`}>
        <h1 className='text-xl font-medium mb-4'>{message}</h1>
        <button className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' onClick={() => {
          setConfirmBox(!confirmBox)
          const url = window.location.href
          if (url === '/upload-video') {
            location.assign('/')
          } {
            location.assign('/creator-page/video')
          }
        }}>Ok</button>
      </div>
    </div>
  );
}

export default UploadVideo;