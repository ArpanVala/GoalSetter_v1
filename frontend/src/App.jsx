import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './pages/RegisterPage'
import Navbar from "./components/menubar"

const App = () => {
  return (
    <>
    <BrowserRouter>
 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/dashboard" element={<Navbar />} />
      </Routes>
       <ToastContainer/>
    </BrowserRouter>
      
    </>
  )
}

export default App
