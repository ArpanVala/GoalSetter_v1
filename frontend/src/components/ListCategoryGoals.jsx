import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import  {updateIsCompleted} from '../features/goals/goalSlice'

const  ListCategoryGoal = ({goals}) => {

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
  const handleCheckboxChange = (goal) => {
    dispatch(updateIsCompleted({ goalId: goal._id, isCompleted: !goal.isCompleted }));
  };

  return (
    <div className="">
      <table className="w-full text-sm text-left border border-gray-200 rounded-lg ">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Goal</th>
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
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{goal.goal}</td>
              <td className="px-4 py-3">{new Date(goal.dueDate).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-md text-sm ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </td>
              <td className='pe-6 py-3 flex gap-1  items-center justify-center text-center'>
                <div className=' text-amber-900'><FaPen/></div>
                <div className=' text-red-400'><FaTrashAlt/></div>
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
      </table>
    </div>
  );
}

export default ListCategoryGoal;