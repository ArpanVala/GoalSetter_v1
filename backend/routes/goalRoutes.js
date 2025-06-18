const goalRoutes = require('express').Router();
const {protect} = require('../middleware/authMiddleware');
const {getGoals, setGoal, updateGoal, deleteGoal, getCompletedGoals, updateIsCompleted} = require('../controllers/goalController');

//@desc Get goals
//@route GET /api/goals
//@access Private
goalRoutes.get('/', protect, getGoals);

//@desc Set goal
//@route POST /api/goals
//@access Private
goalRoutes.post('/', protect, setGoal);

//@desc Get completed goals
//@route GET /api/goals/completed
//@access Private
goalRoutes.get('/completed', protect, getCompletedGoals);
     
//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
goalRoutes.put('/:id', protect, updateGoal);

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
goalRoutes.delete('/:id', protect, deleteGoal);

// @desc Update isCompleted status of goal
// @route PATCH /api/goals/:id/completed
goalRoutes.patch('/:id/completed', protect, updateIsCompleted);


module.exports = goalRoutes;