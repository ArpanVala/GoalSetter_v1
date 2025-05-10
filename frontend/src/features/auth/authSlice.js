import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { create } from "domain";

//question: why is this line necessary?
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Register user
export const register = createAsyncThunk('auth/register',async (user, thunkAPI) => {
    try
    {
        return await authService.register(user);
    }
    catch(error)
    {
        const meassage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(meassage);
    }
})

//login user
export const login = createAsyncThunk('auth/login', async(user, thubkAPI) => {
    try
    {
        return await authService.login(user)
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thubkAPI.rejectWithValue(message);
    }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout();
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(logout.fulfilled,(state)=>{
            state.user = null
        })
        .addCase(logout.rejected,(state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})

// export reset action to reset the state
export const {reset} = authSlice.actions
// export the auth slice reducer to be used in the store
export default authSlice.reducer