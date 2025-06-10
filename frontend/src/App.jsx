import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './pages/RegisterPage'
import Navbar from "./components/Navbar"
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <ToastContainer/>
      {/* <div>
        <button 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          Toggle Login State
        </button>
      </div> */}

      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
       <ToastContainer/>
    </div>
  )
}

export default App
