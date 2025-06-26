import { Link } from "react-router-dom"
import {useEffect, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import {UserPlus2, Eye, EyeOff, CheckCircle, XCircle} from "lucide-react"
import { LoadingSpinner } from "../components/LoadingSpinner"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    "name":"",
    "email":"",
    "password":"",
    "confirmPassword":""
  })

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {name, email, password, confirmPassword} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth)

  // Password validation regex - at least 1 uppercase, 1 lowercase, 1 digit, length > 6
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/

  // Function to validate individual password requirements
  const validatePasswordRequirements = (password) => {
    return {
      length: password.length > 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password)
    }
  }

  const passwordValidation = validatePasswordRequirements(password)
  const isPasswordValid = passwordRegex.test(password)

  useEffect(()=>{
    if(isError){
      toast.error(message)           
    }
    if(isSuccess || user){
      // toast.success("Successfully Registered")
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
    
    // Validate password requirements
    if (!isPasswordValid) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be longer than 6 characters")
      return
    }
    
    if(password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    const userData = {
      name,
      email,
      password,
      confirmPassword
    }
    dispatch(register(userData))
  }

  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8 flex justify-center">
    <div className='w-full max-w-md'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-2xl font-bold'>Welcome !</h1>
        <p className='text-md text-gray-500 flex gap-2'>Create new account to register<UserPlus2/></p>
      </div>

      <div>
        <form onSubmit={onSubmit} className='register-form grid grid-cols-1 gap-6'>
        <div className='grid gap-1'>
          <label htmlFor="name">Name</label>
          <input 
            id="name" 
            type="text" 
            placeholder="Enter your name" 
            name="name" 
            value={name} 
            onChange={onChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className='grid gap-1'>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            name="email"  
            value={email} 
            onChange={onChange} 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className='grid gap-1'>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              name="password"  
              value={password} 
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Password Requirements Indicator */}
          {password && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {passwordValidation.length ? 
                    <CheckCircle className="w-4 h-4 text-green-500" /> : 
                    <XCircle className="w-4 h-4 text-red-500" />
                  }
                  <span className={`text-xs ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                    More than 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.uppercase ? 
                    <CheckCircle className="w-4 h-4 text-green-500" /> : 
                    <XCircle className="w-4 h-4 text-red-500" />
                  }
                  <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.lowercase ? 
                    <CheckCircle className="w-4 h-4 text-green-500" /> : 
                    <XCircle className="w-4 h-4 text-red-500" />
                  }
                  <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.digit ? 
                    <CheckCircle className="w-4 h-4 text-green-500" /> : 
                    <XCircle className="w-4 h-4 text-red-500" />
                  }
                  <span className={`text-xs ${passwordValidation.digit ? 'text-green-600' : 'text-red-600'}`}>
                    At least one digit
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className='grid gap-1'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"  
              value={confirmPassword} 
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* Password Match Indicator */}
          {confirmPassword && (
            <div className="flex items-center gap-2 mt-1">
              {password === confirmPassword ? 
                <CheckCircle className="w-4 h-4 text-green-500" /> : 
                <XCircle className="w-4 h-4 text-red-500" />
              }
              <span className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </span>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className={`text-white bg-black hover:rounded-full duration-200 transition-all font-semibold w-full p-2 rounded-lg flex items-center justify-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isLoading}>
           {isLoading && <LoadingSpinner />}
           {isLoading ? 'Creating Account...' : 'Register'}
        </button>
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