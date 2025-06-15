import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import categoryService from './categoryService'

const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  };

// Create new category
export const createCategory = createAsyncThunk('category/create', async(categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.createCategory(categoryData, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});

// Get all categories
export const getCategories = createAsyncThunk('category/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.getCategories(token);
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});

// Update category
export const updateCategory = createAsyncThunk('category/update', async(categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.updateCategory(categoryData, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});

// Delete category
export const deleteCategory = createAsyncThunk('category/delete', async(categoryId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.deleteCategory(categoryId, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});

export const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers:(builder) => {
        builder
        .addCase(createCategory.pending, (state) => { state.isLoading = true; })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.categories.push(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        .addCase(getCategories.pending, (state) => { state.isLoading = true; })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        .addCase(updateCategory.pending, (state) => { state.isLoading = true; })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.categories = state.categories.map(c => c._id === action.payload._id ? action.payload : c);
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        .addCase(deleteCategory.pending, (state) => { state.isLoading = true; })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.categories = state.categories.filter(c => c._id !== action.payload.id);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
});

export const {reset} = categorySlice.actions;
export default categorySlice.reducer;