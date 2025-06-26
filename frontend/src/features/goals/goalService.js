import axios from 'axios';

const API_URL = 'http://localhost:3000/api/goals/'
// const API_URL = 'https://goalsetter-v1.onrender.com/api/goals/'

//create goal 
const createGoal = async(goalData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, goalData, config);
    return response.data.goal;//because the API returns object of array named goal
}

//get goals
const getGoals = async(token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data.goals; //because the API returns object of array named goals
}


// Get completed goals
const getCompletedGoals = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(API_URL + completed, config);
    return response.data.goals;
  };

//update goal
const updateGoal = async(goalData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    //apend /:id to the API_URL
    const response = await axios.put(API_URL + goalData._id, goalData, config);
    // Return the entire response data so you can access updatedGoal in the reducer
    return response.data.updatedGoal;
}

//update isCompleted status of goal
const updateIsCompleted = async(goalId, isCompleted, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    // Send a PATCH request to update the isCompleted status
    const response = await axios.patch(API_URL + goalId + '/completed', { isCompleted }, config);
    return response.data.updatedGoal; // Return the updated goal
}

//delete goal
const deleteGoal = async(goalId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + goalId, config);
    return response.data;
}

const goalService = {
    createGoal,
    getGoals,
    getCompletedGoals,
    updateGoal,
    deleteGoal,
    updateIsCompleted
}
export default goalService;