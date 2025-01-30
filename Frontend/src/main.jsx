import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from "./Components/Auth.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './Components/Hero.jsx'
import Subcription from "./Components/Subcription.jsx"
import ReAuth from "./Components/ReAuth.jsx"

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
      // {
      //   path: "/CurrencyConverter",
      //   element: <Currency_converter/>,
      // },
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
