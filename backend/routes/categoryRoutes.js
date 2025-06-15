const categoryRoutes = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getCategories, createCategory, deleteCategory, updateCategory} = require('../controllers/categoryController');

categoryRoutes.route('/')
    .post(protect, createCategory)
    .get(protect, getCategories);

    
categoryRoutes.route('/:id')
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = categoryRoutes;