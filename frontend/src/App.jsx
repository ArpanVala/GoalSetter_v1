import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './pages/RegisterPage'
import Navbar from "./components/Navbar"
import React from 'react'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <>
     <div className="">
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <div>
        <button 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          Toggle Login State
        </button>
      </div> */}
    </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Navbar isLoggedIn={isLoggedIn}/>} />
      </Routes>
       <ToastContainer/>
    </>
  )
}

export default App
