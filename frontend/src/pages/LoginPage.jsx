import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import { FaGoogle } from 'react-icons/fa'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    "email":'',
    "password":''
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isSuccess, message} = useSelector((state) => state.auth)
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      // toast.success("Successfully Logged In")
      navigate('/dashboard')
    }
    dispatch(reset())
  },[isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) =>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }
  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8 flex justify-center">
    <div className="w-full max-w-md space-y-6">
      <div flex flex-col items-center justify-center gap-2>
        <h1 className="text-2xl font-bold text-center">Welcome Back!</h1>
        <p className="text-md text-gray-500 text-center "> Enter your credentials to login to your account</p>
      </div>

      <form onSubmit={onSubmit} className="login-form grid grid-cols-1 gap-5">
        <div className="grid gap-1">
         <label htmlFor="email">Email</label>
         <input id="email" type="email" name="email" value={email} onChange={onChange} required />
        </div>

        <div  className='grid gap-1'>
         <label htmlFor="password">Password</label>
         <input id="password" type="password" name="password" value={password} onChange={onChange} required />
        </div>

        <a href="#" className="mr-auto text-sm underline-offset-4 hover:underline">Forgot your password?</a>

        <button type="submit" className="text-white bg-black hover:rounded-full duration-200 transition-all font-semibold  w-full p-2 rounded-lg">Login</button>
      </form>

      <div className="flex flex-col justify-between items-center gap-1">
        <div className='grid grid-cols-3 items-center gap-2'>
          <div className='border border-gray-200 w-auto'></div>
          <p className='text-sm md:text-md text-gray-500 w-full'>or continue with</p>
          <div className='border border-gray-200 w-auto'></div>
        </div>
        
        <button className='text-black border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 flex items-center gap-2 font-semibold  p-2 rounded-lg'><FaGoogle className=''/>Login with Google</button>

        <div className='flex justify-between items-center gap-2 mt-3'>
          <p className='text-sm'>Don't have an account? <Link to="/register" className='font-semibold underline'>Sign up</Link></p>
        </div>
                
      </div>

    </div>
    
    </div>
  )
}

export default LoginPage
