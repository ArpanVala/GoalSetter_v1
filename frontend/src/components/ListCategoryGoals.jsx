import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  {updateIsCompleted} from '../features/goals/goalSlice'
import DeleteModal from './DeleteModal';
import { useNavigate } from 'react-router-dom';

const  ListCategoryGoal = ({goals}) => {
   const [openDelete, setOpenDelete] = useState(false)
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-black";
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCheckboxChange = (goal) => {
    dispatch(updateIsCompleted({ goalId: goal._id, isCompleted: !goal.isCompleted }));
  };

  const onGoalClick = (e) => {
    navigate(`/edit/${e}`)
  }

  return (
    <div className="">
    <h1 className='text-lg font-medium mb-1 text-gray-700'>Goal List</h1>
      {/* <table className="hidden w-full text-sm text-left border border-gray-200 rounded-lg ">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Goals</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Actions</th>
            <th className="px-4 py-3 text-center">Completed</th>
          </tr>
        </thead>
        <tbody className="bg-white">

          {goals.length > 0 ? goals.map((goal, index) => (
            <tr
              key={index}
              className={`border-t border-gray-400 hover:bg-gray-50 transition ${
                goal.isCompleted ? "line-through text-gray-900" : ""
              }`}
              onClick={() => handleCheckboxChange(goal)}
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{goal.goal}</td>
              <td className="px-4 py-3">{new Date(goal.dueDate).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-md text-sm ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </td>
              <td className='pe-6 py-3   flex gap-1  items-center  text-center'>
                <div className=' text-blue-900'>Edit</div> |
                <div className=' text-red-800'>Delete</div>
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={goal.isCompleted}
                  onChange={() => handleCheckboxChange(goal)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
              </td>
            </tr>
          )):(
            <tr>
              <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                No goals found!
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {goals.length > 0 ? goals.map((goal, index) => (
            <div key={index} className={`flex items-center justify-between cursor-pointer hover:shadow-lg border-2 rounded-lg border-gray-200 p-3 ${goal.isCompleted ? "text-gray-500 bg-gray-100" : "bg-white "}`} onClick={() => handleCheckboxChange(goal)}>
              <div className='flex-1'>
                <h1 className={`${goal.isCompleted ? 'line-through': ''}`}>{goal.goal}</h1>
                <p className='text-sm text-gray-400'>{new Date(goal.dueDate).toLocaleDateString()}</p>
                <div className='mt-2 flex items-center gap-2 '>
                  <button className='text-sm px-2 border-1 hover:bg-blue-200 hover:text-blue-700 bg-gray-100 font-light shadow-2xl rounded' onClick={()=> onGoalClick(goal._id)}>edit</button>
                  <button className='text-sm px-2 border-1 hover:bg-red-200 hover:text-red-700 bg-gray-100 font-light shadow-2xl rounded' onClick={() => setOpenDelete(true)}>delete</button>

                  <DeleteModal isOpen={openDelete} setIsOpen={setOpenDelete} id={goal._id} type={'goal'}/>
                </div>
              </div>
              <div className="flex items-center gap-4 ">

                <span className={`px-3 py-1 rounded-md text-sm  ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
                <input
                  type="checkbox"
                  checked={goal.isCompleted}
                  onChange={() => handleCheckboxChange(goal)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
            </div>
          )) : (
            <div className="text-center w-full bg-white border-2 border-gray-300 rounded-lg sm:col-span-2 text-gray-500 py-4">
              No goals found!
            </div>
          )}  
      </div>
    </div>
  );
}

export default ListCategoryGoal;