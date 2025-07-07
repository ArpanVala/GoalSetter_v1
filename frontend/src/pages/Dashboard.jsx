import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getGoals, reset } from '../features/goals/goalSlice'
import {getCategories} from '../features/categories/categorySlice'
import CategoryList from '../components/CategoryList'
import CategoryModel from '../components/CategoryModel'
import Loading from '../components/Loading'
import SpotlightCard from '../Reactbits/SpotlightCard/SpotlightCard'


const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)
    const {goals, isLoading: goalsLoading, isError, message} = useSelector((state)=>state.goals)
    const {categories, isLoading: categoriesLoading} = useSelector((state)=>state.categories)
   
    useEffect(() => {
        if (!user) {
            toast.error('Please login or register')
            navigate('/login')
            return
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
    }, [user, navigate, dispatch])

    // Check if both goals and categories have finished loading
    useEffect(() => {
        if (!goalsLoading && !categoriesLoading && isInitialLoading) {
            // Add a small delay to ensure smooth transition
            const timer = setTimeout(() => {
                setIsInitialLoading(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [goalsLoading, categoriesLoading, isInitialLoading])

    // Show loading screen while data is being fetched
    if (isInitialLoading || goalsLoading || categoriesLoading) {
        return (
           <Loading/>
        )
    }

    const totalCategories = categories.length;
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal?.isCompleted).length;
    const dueGoals = goals.filter(goal => new Date(goal?.dueDate) < new Date() && !goal?.isCompleted).length;
    
    let goalCategories = []
    categories.map((c)=>{
      let totalGoals =  goals.filter(goal => goal?.category?._id === c._id).length
      let remGoals =  goals.filter(goal => goal?.category._id === c._id && !goal?.isCompleted).length
      goalCategories.push({
        id:c._id,
        name:c.name,
        totalGoals,
        remGoals,
        progress: Math.round(totalGoals > 0 ? ((totalGoals - remGoals) / totalGoals) * 100 : 0)
      })
    })

    return (
        <div className="max-w-[1048px] mx-auto px-4 my-5 md:my-8 animate-fadeIn">
            <div className='mb-4'>
                <h1 className="text-lg md:text-xl font-semibold text-gray-600">Dashboard</h1>
                <p className='text-md text-blue-400 font-light'>Welcome back, <span className='font-medium'>{user && user.name}</span>!</p>
            </div>
            
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            
                <SpotlightCard  spotlightColor="rgba(0, 0, 255, 0.15)" className="custom-spotlight-card  px-4 py-6 rounded-lg bg-violet-50 border-violet-300 border-2">
                    <h2 className='text-sm md:text-md font-medium text-gray-800'>Goal Categories</h2>
                    <h1 className='text-md md:text-lg font-semibold text-gray-900'>{totalCategories}</h1>
                </SpotlightCard>
                
                <SpotlightCard  spotlightColor="rgba(0, 0, 255, 0.15)" className="custom-spotlight-card  px-4 py-6 rounded-lg bg-violet-50 border-violet-300 border-2">
                    <h2 className='text-sm md:text-md font-medium text-gray-800'> Total Goals</h2>
                    <h1 className='text-md md:text-lg font-semibold text-gray-900'>{totalGoals}</h1>
                </SpotlightCard>
                
                <SpotlightCard  spotlightColor="rgba(0, 0, 255, 0.15)" className="custom-spotlight-card  px-4 py-6 rounded-lg bg-violet-50 border-violet-300 border-2">
                    <h2 className='text-sm md:text-md font-medium text-gray-800'>Completed Goals</h2>
                    <h1 className='text-md md:text-lg font-semibold text-gray-900'>{completedGoals}</h1>
                </SpotlightCard>
                
                <SpotlightCard  spotlightColor="rgba(0, 0, 255, 0.15)" className="custom-spotlight-card  px-4 py-6 rounded-lg bg-violet-50 border-violet-300 border-2">
                    <h2 className='text-sm md:text-md font-medium text-gray-800'>Due Goals</h2>
                    <h1 className='text-md md:text-lg font-semibold text-gray-900'>{dueGoals}</h1>
                </SpotlightCard>
            </div>
            
            <div className='my-5'>
                <h1 className='text-lg md:text-xl  text-gray-700 font-medium'>Quick Actions</h1>
                <div className='space-x-2 mt-2'>
                    <button className='bg-teal-500 hover:bg-teal-600 text-blue-50 px-3 py-1 rounded-md'>
                        <Link to='/add-goal'>Add New Goal</Link>
                    </button>
                    <button className='md:border-2 border-transparent bg-blue-100 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md' onClick={() => setIsOpen(true)}>
                        Add new Category
                    </button>
                    <CategoryModel isOpen={isOpen} setIsOpen={setIsOpen} />
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
                                <button onClick={() => setIsOpen(true)}
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