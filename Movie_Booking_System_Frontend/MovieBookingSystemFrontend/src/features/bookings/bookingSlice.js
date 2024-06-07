import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  bookings: [],
  status: 'idle',
  error: null,
};

export const bookTickets = createAsyncThunk('bookings/bookTickets', async (bookingData, { rejectWithValue }) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
