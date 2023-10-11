import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './pages/Login'
import Qrcode from './pages/Qrcode'
// import PageNotFound from './components/PageNotFound.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    // element: <div>ihhckjcnkkjc</div> ,
    element: <Login></Login> ,
  },
  {
    path:'/qrcode',
    // element: <div>ihhckjcnkkjc</div> ,
    element: <Qrcode></Qrcode> ,
  },
  
  // {
  //   path:'*',
  //   element: <PageNotFound></PageNotFound> ,
  // },
  
])

export default function App() {
  return(
    <div>
      <RouterProvider router= {router}></RouterProvider>
      {/* <h1>cidbiweubciebc</h1> */}
    </div>
    )
  }