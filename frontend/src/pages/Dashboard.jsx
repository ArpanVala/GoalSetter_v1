import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getGoals, reset } from '../features/goals/goalSlice'


const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth) 
    const {goals, isLoading, isError, message} = useSelector((state)=>state.goals)
   
    useEffect(() => {
        if (!user) {
            toast.error('Please login or register')
            navigate('/login')
        }
        if(isError){
            toast.error(message)
            console.log(message)
        }
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate,dispatch])

    // if(isLoading){
    //     <FaSpinner/>
    // }
  return (
    <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8">
        <div className='mb-4'>
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">Dashboard</h1>
        <p className='text-md text-blue-400 font-light'>Welcome back, <span className='font-medium'>{user && user.name}</span>!</p>
        </div>


        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Goal Categories</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>5</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Total Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>{goals.length}</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Completed Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>12</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Due Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>8</h1>
            </div>
        </div>

        <div className='my-5'>
            <h1 className='text-lg md:text-xl  text-gray-700 font-semibold'>Quick Actions</h1>
            <div className='space-x-2 mt-2'>
            <button className='text-sm md:text-lg   bg-blue-500 hover:bg-blue-600 text-blue-50 px-3 py-1 rounded-md'>Add New Goal</button>
            <button className='text-sm md:text-lg  md:border-2 border-transparent bg-blue-100 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md '>View all Goals</button>
            </div>
        </div>


    </div>
  )
}

export default Dashboard
