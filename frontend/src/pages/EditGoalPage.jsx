import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoal } from '../features/goals/goalSlice';
import {getGoals} from '../features/goals/goalSlice';
import { getCategories } from '../features/categories/categorySlice';
import { toast } from 'react-toastify';
import CategoryModel from '../components/CategoryModel';
import { useNavigate, useParams } from 'react-router-dom'

const EditGoalPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const { categories } = useSelector(state => state.categories);
    const { user } = useSelector(state => state.auth);
    const { goals } = useSelector(state => state.goals);
    
      useEffect(() => {
        dispatch(getCategories());
          dispatch(getGoals());
      }, [dispatch]);
    
    const goalData = goals.filter((goal) => goal._id === id)[0];
    
    const [goal, setGoal] = useState(goalData ? goalData.goal : '');
    const [priority, setPriority] = useState(goalData ? goalData.priority : '');
    const [category, setCategory] = useState(goalData ? goalData.category._id : '');
    const [dueDate, setDueDate] = useState(goalData ? goalData.dueDate.slice(0, 10) : '');
    const [isOpen, setIsOpen] = useState(false);

    const onReset = () => {
      setGoal('');
      setPriority('');
      setCategory('');
      setDueDate('');
    }
  
    
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsOpen(true);
    } else {
      setCategory(value);
    }
  };
    const onSubmit = (e) => {
      e.preventDefault();
      if (!goal || !priority || !category || !dueDate) return;
      dispatch(updateGoal({ _id:id, goal, priority, category, dueDate  }));
      toast.success('Goal Updated successfully!');
      onReset();
      navigate('/category/' + category);
    };

    const handleCategoryModalClose = () => {
      setIsOpen(false);
      dispatch(getCategories()); // Refresh categories after modal closes
    };
    
  return (
    <div className='max-w-[1048px] mx-auto px-4 my-5 md:my-8  animate-fadeIn'>
    <div className="max-w-xl mx-auto px-2 py-4 md:px-4 md:py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-xl md:text-xxl font-semibold text-gray-600 text-center mb-1">Edit Goal</h1>

      <form onSubmit={onSubmit} className="space-y-4 text-gray-600">
        {/* Goal Name */}
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Goal Name</label>
          <input
            type="text"
            placeholder="Enter your goal"
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Priority</label>
          <select required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md"
          >
            <option value="" >Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Category</label>
          <select required
            value={category}
            onChange={handleCategoryChange}
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="new" className='bg-teal-50 py-2 text-teal-700'>Add New Category +</option>
            {categories.map((cat) => (
              
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
            <CategoryModel isOpen={isOpen} setIsOpen={handleCategoryModalClose} />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 text-gray-600 txet-sm">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full py-1 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="reset"
            onClick={() => onReset()}
            className=" py-1 sm:py-2  w-full bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default EditGoalPage
