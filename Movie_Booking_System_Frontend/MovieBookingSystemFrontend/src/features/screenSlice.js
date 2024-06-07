import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  screens: [],
  screen: null,
  status: 'idle',
  error: null,
};

export const fetchScreens = createAsyncThunk('screens/fetchScreens', async (_, { rejectWithValue }) => {
    console.log('heyy im called from fetchScreenes')
  try {
    // console.log('screens= ',screens);
    const response = await api.get('/screens');
    console.log('response.data from fetchscreenes= ',response.data.data);
    // console.log('screens= ',screens);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addScreen = createAsyncThunk('screens/addScreen', async (screenData, { rejectWithValue }) => {
  try {
    const response = await api.post('/screens/add', screenData);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const screenSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreens.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScreens.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.screens = action.payload;
      })
      .addCase(fetchScreens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addScreen.fulfilled, (state, action) => {
        state.screens.push(action.payload);
      });
  },
});

export default screenSlice.reducer;
//------------new---------