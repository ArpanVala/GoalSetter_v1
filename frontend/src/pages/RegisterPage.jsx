import React from 'react'
import { Link } from "react-router-dom"
import {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import {FaGoogle} from 'react-icons/fa'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    "name":"",
    "email":"",
    "password":"",
    "confirmPassword":""
  })

  const {name, email, password, confirmPassword} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isSuccess, message} = useSelector((state) => state.auth)
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      toast.success("Successfully Registered")
      navigate('/dashboard')
    }
    dispatch(reset())

  },[user, isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword)
    {
      toast.error("Passwords do not match")
    }
    else
    {
      const userData = {
        name,
        email,
        password,
        confirmPassword
      }
      dispatch(register(userData))
    }
  }
  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8 flex justify-center">
    <div className='w-full max-w-md'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-2xl font-bold'>Welcome !</h1>
        <p className='text-md text-gray-500 '>Register with your Google account</p>
        <div className=''>
          <button className='text-black border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 flex items-center gap-2  font-semibold  w-full p-2 rounded-lg'><FaGoogle className=''/>Register with Google</button>
        </div>
        <div className='grid grid-cols-3 items-center gap-2 my-4'>
          <div className='border border-gray-200 w-auto'></div>
          <p className='text-sm md:text-md text-gray-500 w-full'>or continue with</p>
          <div className='border border-gray-200 w-auto'></div>
        </div>
      </div>

      <div>
        <form onSubmit={onSubmit} className='register-form grid grid-cols-1 gap-6'>
        <div className='grid gap-1'>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Enter your name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className='grid gap-1'>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="m@example.com" name="email"  value={email} onChange={onChange} required />
        </div>
        <div className='grid gap-1'>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"  value={password} onChange={onChange} required />
        </div>
        <div className='grid gap-1'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" name="confirmPassword"  value={confirmPassword} onChange={onChange} required />
        </div>
        <button type="submit" className="text-white bg-black font-semibold  w-full p-2 rounded-lg">Register</button>
        </form>
      </div>

      <div className='flex justify-between items-center gap-2 mt-3'>
        <p className='text-sm'>Already have an account? <Link to="/login" className='font-semibold underline'>Login</Link></p>
      </div>
    </div>

    </div>
  )
}

export default RegisterPage
