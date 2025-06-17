import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getGoals, reset } from '../features/goals/goalSlice'
import {getCategories} from '../features/categories/categorySlice'
import CategoryList from '../components/CategoryList'

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
        dispatch(getCategories())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate,dispatch])

    const {categories} = useSelector((state)=>state.categories)

    const totalCategories = categories.length;
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.isCompleted).length;
    const dueGoals = goals.filter(goal => new Date(goal.dueDate) < new Date() && !goal.isCompleted).length;

    let goalCategories = []
    categories.map((c)=>{
      let totalGoals =  goals.filter(goal => goal.category._id === c._id).length
      let remGoals =  goals.filter(goal => goal.category._id === c._id && !goal.isCompleted).length
      goalCategories.push({
        id:c._id,
        name:c.name,
        totalGoals,
        remGoals,
        progress: Math.round(totalGoals > 0 ? ((totalGoals - remGoals) / totalGoals) * 100 : 0)
      })
    })

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
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>{totalCategories}</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Total Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>{totalGoals}</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Completed Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>{completedGoals}</h1>
            </div>
            <div className='bg-gradient-to-t from-gray-100 to-gray-200 px-4 py-6 rounded-lg md:border-3 border-transparent hover:border-gray-400 hover:cursor-pointer '>
                <h2 className='text-sm md:text-md font-medium text-gray-500 '>Due Goals</h2>
                <h1 className='text-md md:text-lg font-semibold text-gray-700'>{dueGoals}</h1>
            </div>
        </div>

        <div className='my-5'>
            <h1 className='text-lg md:text-xl  text-gray-700 font-medium'>Quick Actions</h1>
            <div className='space-x-2 mt-2'>
            <button className='text-sm md:text-lg   bg-blue-500 hover:bg-blue-600 text-blue-50 px-3 py-1 rounded-md'>Add New Goal</button>
            <button className='text-sm md:text-lg  md:border-2 border-transparent bg-blue-100 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md '>Add new Category</button>
            </div>
        </div>

        
      {/* List of Categories */}
      <div>
      <h3 className="text-lg md:text-xl font-medium mb-2 text-gray-700">List of Categories</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {goalCategories.length < 1 ? (
          // If no categories, show a message and button to create first category
          <div className='col-span-1 sm:col-span-2 md:col-span-3'>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 mb-2">No categories yet</p>
              <button
                className="bg-blue-500 text-sm md:text-md  text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Category
              </button>
            </div>
        </div>
        ): goalCategories.map((cat, index) => (
            <CategoryList key={index} cat={cat} />
        ))}
      </div>
      </div>

    </div>
  )
}

export default Dashboard
