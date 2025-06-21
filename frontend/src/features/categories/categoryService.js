import axios from 'axios';

const API_URL = 'http://localhost:3000/api/categories/';
// const API_URL = 'https://goalsetter-v1.onrender.com/api/categories/';

// Create a new category
const createCategory = async(categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  const response = await axios.post(API_URL, categoryData, config);
  return response.data.category;
};

// Get all categories
const getCategories = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data.categories;
}

// Update a category
const updateCategory = async(categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + categoryData._id, categoryData, config);
    return response.data.updatedCategory;
}


// Delete a category
const deleteCategory = async(categoryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + categoryId, config);
    return response.data;
};

const categoryService = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
export default categoryService;