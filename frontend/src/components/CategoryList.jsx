import React from 'react'
import { Link,useNavigate} from 'react-router-dom'


const CategoryList = ({cat}) => {
  const navigate = useNavigate()
  const onCategoryClick = (e) => {
    navigate(`/category/${e}`)
  }
  return (
    <div onClick={() => onCategoryClick(cat.id)}>
      <div className="bg-violet-50 border-1 border-violet-600 rounded p-4 grid grid-cols-3 cursor-pointer hover:shadow-lg hover:scale-101 transition-transform duration-300">
            <div className='col-span-2'>
                <h4 className="font-medium text-md md:text-lg text-gray-800 mb-2">{cat.name}</h4>
                <p className='text-sm md:text-md'>{cat.totalGoals} goals</p>
                <p className='text-sm md:text-md text-red-900'>{cat.remGoals} left</p>
             </div>
            {/* Progress circle */}
            <div className='flex items-center justify-center'> {/*This div is used to center progress horizontally */}
            <div className="relative w-20 h-20">
              <svg className="absolute top-0 left-0" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-violet-400"
                  stroke="currentColor"
                  strokeWidth="3 "
                  strokeDasharray={`${cat.progress}, 100`}
                  fill="none"
                  //add rounded corners to the stroke
                  strokeLinecap="round"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {cat.totalGoals > 0 ? `${cat.progress}%` : '--'}
              </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default CategoryList
