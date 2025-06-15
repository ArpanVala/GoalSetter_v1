const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');


//@desc get goal
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async(req,res)=>{
    //populate() automatically replaces the category ObjectIdwith the full category document(but only the name field, due to 'name' as second argument).
    const goals = await Goal.find({user:req.user.id}).populate('category', 'name')
    res.status(200).json({goals});
})

//@desc set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.goal && !req.body.category  && !req.body.priority && !req.body.dueDate)
    {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const {goal, category, priority, dueDate} = req.body;

    // Check if category belongs to user
    const foundCategory = await Category.findOne({_id:category, user:req.user._id});
    if(!foundCategory){
        res.status(400);
        throw new Error('Category not found!');
    }


    const goalData = await Goal.create({
        user:req.user.id,
        goal,
        category,
        priority,
        dueDate,
    })
    res.status(200).json({goalData});
})

//@desc update goal
//@route POST /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not found');
    }
    // Check for the logged in user
    if(!req.user)
    {
        res.status(401);
        throw new Error('User not found');
    }
    // Check for the logged in user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error('User not authorized');
    }
    if(!req.body.goal && !req.body.priority && !req.body.dueDate && !req.body.category)
    {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const goalData = {
        goal:req.body.goal,
        category:req.body.category,
        priority:req.body.priority,
        dueDate:req.body.dueDate,
    
    }
    try{
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, goalData , {new:true});
        res.status(200).json({updatedGoal}); 
    }
    catch(err)
    {
        res.status(400);
        throw new Error('Error updating goal');
    }
})

//@desc delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not found');
    }
    // Check for the logged in user
    if(!req.user)
    {
        res.status(401);
        throw new Error('User not found');
    }
    // Check for the logged in user
    if(goal.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error('User not authorized');
    }
    try{
        await goal.deleteOne();
        res.status(200).json({id:req.params.id}); 
    }
    catch(err)
    {
        res.status(400);
        throw new Error('Error deleting goal');
    }
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };