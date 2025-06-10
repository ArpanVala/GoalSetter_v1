import React from 'react'
import { useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import ListCategoryGoals from '../components/ListCategoryGoals'

const CategoryPage = () => {
    const { id } = useParams()
  return (
    <div className='max-w-[1048px] mx-auto px-4 my-5 md:my-8'>
      <div>
        <h1 className='text-lg md:text-2xl font-semibold text-gray-600'>{id}</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-md text-gray-600 font-medium'>Total Goals</h4>
                <p>12</p>
            </div>
            
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-md text-gray-600 font-medium'>Completed</h4>
                <p>5</p>
            </div>
            
            <div className='px-4 py-3 rounded-lg border-3 border-gray-200 hover:bg-gray-200 '>
                <h4 className='text-md text-gray-600 font-medium'>Remaining</h4>
                <p>7</p>
            </div>
        </div>

        {/* Add New Goal */}
        <div className='text-md md:border-2 border-transparent bg-blue-100 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md flex items-center gap-2 w-fit'>
            <button className=''>Add New Goal </button>
            <FaPlus size={12}/>
        </div>

        
        {/* Display progress bar */}
        <div className='my-5'>
        <ProgressBar progress={80} />
        </div>

        {/* display list of Goals */}
        <div>
            <ListCategoryGoals/>
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
