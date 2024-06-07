import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import movieReducer from '../features/movies/movieSlice';
import bookingReducer from '../features/bookings/bookingSlice';
import screenReducer from '../features/screenSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    bookings:bookingReducer,
    screens:screenReducer,
  },
});
