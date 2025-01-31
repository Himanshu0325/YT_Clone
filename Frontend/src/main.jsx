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
      // {
      //   path: "/Digitalclock",
      //   element: <Digitalclock/>,
      // }
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
