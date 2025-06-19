import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
import { getCategories } from '../features/categories/categorySlice';
import { toast } from 'react-toastify';
import CategoryModel from '../components/CategoryModel';
import { useLocation, useNavigate } from 'react-router-dom';

const AddGoalPage = ({categoryId}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedCategory = new URLSearchParams(location.search).get('category');
  

  const { categories } = useSelector(state => state.categories);
  const { user } = useSelector(state => state.auth);

  const [goal, setGoal] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(preselectedCategory || '');
  const [dueDate, setDueDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onReset = () => {
    setGoal('');
    setPriority('');
    setCategory('');
    setDueDate('');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!goal || !priority || !category || !dueDate) return;
    dispatch(createGoal({ goal, priority, category, dueDate  }));
    toast.success('Goal added successfully!');
    onReset();
    navigate('/category/' + category);
  };
  
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsOpen(true);
    } else {
      setCategory(value);
    }
  };
  const handleCategoryModalClose = () => {
    setIsOpen(false);
    dispatch(getCategories()); // Refresh categories after modal closes
  };
  
  return (
    <div className='max-w-[1048px] mx-auto px-4 my-5 md:my-8'>
    <div className="max-w-xl mx-auto px-2 py-4 md:px-4 md:py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-xl md:text-xxl font-semibold text-gray-600 text-center mb-1">Add New Goal</h1>

      <form onSubmit={onSubmit} className="space-y-4 text-gray-600">
        {/* Goal Name */}
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Goal Name</label>
          <input
            type="text"
            placeholder="Enter your goal"
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            className="w-full border-1 border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full py-1 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
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
  );
};

export default AddGoalPage;
