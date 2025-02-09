import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from "./Components/Auth.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './Components/Hero.jsx'
import Subcription from "./Components/Subcription.jsx"
import ReAuth from "./Components/ReAuth.jsx"
import UploadVideo from './Components/UploadVideo.jsx'
import CreatorPage from './Components/Creatorpage.jsx'
import VideoPage from './Components/VideoPage.jsx'
import Dashboard from './Components/Dashboard.jsx'
import CreateChannel from './Components/CreateChannel.jsx'
import SearchPage from './Components/SearchPage.jsx'
import PlayVideo from './Components/PlayVideo.jsx'
import ChannelPage from './Components/ChannelPage.jsx'

const router = createBrowserRouter([
  {
  path: '/',
    element: <App/>,
    children: [
      
      {
        path: "/",
        element: <Hero/>,
      },
      {
        path: "/register",
        element: <Auth/>,
      },
      {
        path: "/subcribed-channel",
        element: <Subcription/>,
      },
      {
        path: "/upload-video",
        element: <UploadVideo/>,
      },
      {
        path: "/upload-video/create-channel",
        element: <CreateChannel/>,
      },
      {
        path:'/search-page',
        element:<SearchPage/>
      },
      {
        path:'/play-video',
        element:<PlayVideo/>
      },
      {
        path:'/channel-page',
        element:<ChannelPage/>
      }
    ]
  },
  {
    path: '/Reauth-Password',
    element: <ReAuth />,
  },
  {
    path: '/Reauth-Information',
    element: <ReAuth />,
  },
  {
    path: "/creator-page",
    element: <CreatorPage/>,
    children:[
      {
        path:"/creator-page/video",
        element:<VideoPage/>
      },
      {
        path:"/creator-page",
        element:<Dashboard/>
      },
      {
        path:"/creator-page/upload-video",
        element:<UploadVideo/>
      }
    ]
  }
  // {
  //   path: "/upload-video",
  //   element: <UploadVideo/>,
  // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
