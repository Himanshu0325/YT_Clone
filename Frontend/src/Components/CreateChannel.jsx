import axios from 'axios';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';

const CreateChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const cookie = new Cookies
  const accessToken = cookie.get('accessToken')

  const handleSubmit = async (e) => {
    e.preventDefault();
    // location.assign("http://localhost:5173/")
    // Handle form submission logic here

    const formData = new FormData()
    formData.append('channelName',channelName)
    formData.append('channelDescription',channelDescription)
    formData.append('coverImage',coverImage)
    formData.append('accessToken',accessToken)

    await axios ({
      method:'post',
      url:'http://localhost:4000/api/v1/users/create-channel',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(()=>{
      console.log({ channelName, channelDescription, coverImage });
      location.assign("/")
    })

    
  };

  return (
    <div className="max-w-lg mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Create Channel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">Channel Name:</label>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="channelDescription" className="block text-sm font-medium text-gray-700">Channel Description:</label>
          <textarea
            id="channelDescription"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;