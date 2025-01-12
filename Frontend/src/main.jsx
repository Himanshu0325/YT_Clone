import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from "./Components/Auth.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './Components/Hero.jsx'

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
      // {
      //   path: "/PasswordGenerator",
      //   element: <Passwor_generator/>,
      // },
      // {
      //   path: "/CurrencyConverter",
      //   element: <Currency_converter/>,
      // },
      // {
      //   path: "/Digitalclock",
      //   element: <Digitalclock/>,
      // }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
