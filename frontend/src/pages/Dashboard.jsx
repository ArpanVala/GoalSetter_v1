import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import  {useEffect} from 'react'
import { toast } from 'react-toastify'


const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth) 
   
    useEffect(() => {
        if (!user) {
            toast.error('Please login or register')
            navigate('/login')
        }
    }, [user, navigate])
  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8">
        <div className='mb-4'>
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">Dashboard</h1>
        <p className='text-md text-blue-400 font-light'>Welcome back, <span className='font-medium'>{user.name}</span>!</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='bg-blue-50 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-lg font-medium text-gray-500 '>Goal Categories</h2>
                <h1 className='text-xl font-semibold text-gray-700'>5</h1>
            </div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-lg font-medium text-gray-500 '>Total Goals</h2>
                <h1 className='text-xl font-semibold text-gray-700'>20</h1>
            </div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-lg font-medium text-gray-500 '>Completed Goals</h2>
                <h1 className='text-xl font-semibold text-gray-700'>12</h1>
            </div>
            <div className='bg-blue-50 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-lg font-medium text-gray-500 '>Due Goals</h2>
                <h1 className='text-xl font-semibold text-gray-700'>8</h1>
            </div>
        </div>

        <div className='my-5'>
            <h1 className='text-lg md:text-xl  text-gray-700 font-semibold'>Quick Actions</h1>
            <div className='space-x-2 mt-2'>
            <button className='text-md md:text-lg  bg-blue-500 hover:bg-blue-600 text-blue-50 px-3 py-1 rounded-md'>Add New Goal</button>
            <button className='text-md md:text-lg md:border-2 border-transparent bg-blue-50 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md '>View all Goals</button>
            </div>
        </div>


    </div>
  )
}

export default Dashboard
