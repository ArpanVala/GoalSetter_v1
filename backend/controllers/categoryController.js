const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const Goal = require('../models/goalModel');


//@desc get categories
//@route GET /api/categories
//@access Private
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user._id });
    res.status(200).json({ categories });
});

//@desc set category
//@route POST /api/categories
//@access Private
const createCategory = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a category name');
    }
    const exist = await Category.findOne({name: req.body.name, user: req.user._id});
    if (exist) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name: req.body.name,
        user: req.user._id,
    });
    res.status(201).json({ category });
});

//@desc delete category
//@route DELETE /api/categories/:id
//@access Private
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }
    // Check for the logged in user
    if (category.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // delete category and Also delete all goals associated with that category
    await category.deleteOne();
    await Goal.deleteMany({  user: req.user._id, category: req.params.id });

    res.status(200).json({ id: req.params.id });
});

//@desc update category
//@route PUT /api/categories/:id
//@access Private
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }

    // Check if the category belongs to the logged-in user
    if (category.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to update this category');
    }
    
    if (!req.body.name || req.body.name.trim() === '') {
        res.status(400);
        throw new Error('Please add a category name');
    }
    //Check for duplicate category names
    const duplicate = await Category.findOne({
        name: req.body.name,
        user: req.user.id,
        _id: { $ne: req.params.id } // exclude self
    });
    if (duplicate) {
        res.status(400);
        throw new Error('Category with this name already exists');
    }
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );
    
    res.status(200).json({ updatedCategory });
});

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
};