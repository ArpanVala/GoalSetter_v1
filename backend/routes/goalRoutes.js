const goalRoutes = require('express').Router();
const {protect} = require('../middleware/authMiddleware');
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController');

//@desc Get goals
//@route GET /api/goals
//@access Private
goalRoutes.get('/', protect, getGoals);

//@desc Set goal
//@route POST /api/goals
//@access Private
goalRoutes.post('/', protect, setGoal);

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
goalRoutes.put('/:id', protect, updateGoal);

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
goalRoutes.delete('/:id', protect, deleteGoal);

module.exports = goalRoutes;