import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import { getGoals, reset } from '../features/goals/goalSlice'
import {getCategories} from '../features/categories/categorySlice'
import ListCategoryGoals from '../components/ListCategoryGoals'
import { toast } from 'react-toastify'
import DeleteModal from '../components/DeleteModal'
import RenameCategoryModal from '../components/RenameCategoryModal'
import Loading from '../components/Loading'

const CategoryPage = () => {
  const [openDelete, setOpenDelete] = useState(false)
  const [openRename, setOpenRename] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

    const { id } = useParams()
    const {user} = useSelector((state) => state.auth);
   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {goals,  isLoading: goalsLoading, isError, message} = useSelector((state)=>state.goals)
    const {categories,  isLoading: categoriesLoading} = useSelector((state)=>state.categories)
    
    useEffect(()=>{
        if(!user){
            // If user is not logged in, redirect to login page or show an error
            navigate('/login')
        }
        if(isError)
        {
          toast.error(message)
          console.log(message)
        }
        dispatch(getGoals())
        dispatch(getCategories())
        return () => {
        dispatch(reset())
        }
    },[user, navigate, dispatch])

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
    const category = categories.find(c => c._id === id)
    if (!category) {
        return <div className='text-center text-gray-600'>Category not found</div>
    }
    const categoryName = category.name;
    const goalList = goals.filter(goal => goal?.category._id === id);
    const totalGoals = goals.filter(goal => goal?.category._id === id).length;
    const completedGoals = goals.filter(goal => goal?.category._id === id && goal?.isCompleted).length;
    const remainingGoals = totalGoals - completedGoals;
    const progress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : '--';
    

  return (
    <div className='max-w-[1048px] mx-auto px-4 my-5 md:my-8'>
      <div>
        <h1 className='text-lg md:text-2xl font-semibold text-gray-600'>{categoryName}</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-sm text-gray-600 font-medium'>Total Goals</h4>
                <p className='text-sm font-bold text-gray-600'>{totalGoals}</p>
            </div>
            
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-sm text-gray-600 font-medium'>Completed</h4>
                <p  className='text-sm font-bold text-gray-600'>{completedGoals}</p>
            </div>
            
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-sm text-gray-600 font-medium'>Remaining</h4>
                <p  className='text-sm font-bold text-gray-600'>{remainingGoals}</p>
            </div>
        </div>

        {/* Display progress bar */}
        <div className='my-5'>
        <ProgressBar progress={progress} />
        </div>

        {/* Add New Goal */}
        <div className='text-sm md:border-2 border-transparent bg-blue-100 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md flex items-center gap-2 w-fit' onClick={() =>  navigate(`/add-goal?category=${id}`)} >
            <button className=''>Add New Goal </button>
            <FaPlus size={12}/>
        </div>

        
        {/* display list of Goals */}
        <div className='my-5'>
            <ListCategoryGoals goals={goalList}/>
        </div>

        <div className='text-right space-x-2'>
          <button className='text-sm px-2 py-1 bg-gray-100 hover:bg-gray-200 hover:shadow-lg border rounded ' onClick={() => setOpenRename(true)} >Rename Category</button>
          <button className='text-sm px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-lg border border-red-700 rounded' onClick={() => setOpenDelete(true)}>Delete Category</button>

          <RenameCategoryModal isOpen={openRename} setIsOpen={setOpenRename} categoryId={id} />
          <DeleteModal isOpen={openDelete} setIsOpen={setOpenDelete} id={id} type={'category'}/>
        </div>
      </div>
    </div>
  )
}

const ProgressBar = ({ progress = 42 }) =>{
  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Completion</span>
        <span>{progress}%</span>
      </div>

      {/* Background bar */}
      <div className="w-full h-1 rounded-full bg-gray-200 overflow-hidden">
        {/* Progress bar */}
        <div
          className="h-1 bg-blue-300 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default CategoryPage
