import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user/'
// const API_URL = 'https://goalsetter-v1.onrender.com/api/user/'

// Register user
const register = async (userData) => {
    console.log("Registering with data:", userData);
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//Login user
const login = async(userData)=>{
    const response = await axios.post(API_URL + 'login', userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//Logout user
const logout = ()=>{
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;