import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  movies: [],
  movie: null,
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/movies');
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData, { rejectWithValue }) => {
  try {
    const response = await api.post('/movies/add', movieData);
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      });
  },
});

export default movieSlice.reducer;
//---------------neww 2 