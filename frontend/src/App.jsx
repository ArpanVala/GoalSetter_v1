import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from "./components/Navbar"
import Dashboard from './pages/Dashboard'
import CategoryPage from './pages/CategoryPage'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className="">
    <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/category/:id" element={<CategoryPage/>} />
      </Routes>
    </div>
  )
}

export default App
