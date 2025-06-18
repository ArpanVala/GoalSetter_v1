import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    goals:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// create goal
export const createGoal = createAsyncThunk('goal/create', async(goalData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//get goals
export const getGoals = createAsyncThunk('goal/getAll', async(_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get completed goals
export const getCompletedGoals = createAsyncThunk('goal/getCompleted', async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getCompletedGoals(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

//update Goal
export const updateGoal = createAsyncThunk('goal/update', async(goalData, thunkAPI)=> {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateGoal(goalData, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//update isCompleted status of goal
export const updateIsCompleted = createAsyncThunk('goal/updateIsCompleted', async({goalId, isCompleted}, thunkAPI) => {
    try {   
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateIsCompleted(goalId, isCompleted, token);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

    

//delete goal
export const deleteGoal = createAsyncThunk('goal/delete', async(goalId, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalId, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state) => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCompletedGoals.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getCompletedGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
              })
              .addCase(getCompletedGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              })
        

            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                 // Find the goal by ID and update it
                state.goals = state.goals.map(goal => goal._id === action.payload._id ? action.payload : goal);
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.goals = state.goals.filter(goal => goal._id !== action.payload.id);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
            .addCase(updateIsCompleted.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload; 
})

            .addCase(updateIsCompleted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }

})
 // Export the reset action to reset the state
export const {reset} = goalSlice.actions;
// Export the reducer to be used in the store
export default goalSlice.reducer;

