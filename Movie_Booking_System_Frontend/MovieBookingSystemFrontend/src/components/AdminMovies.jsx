import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../features/movies/movieSlice';
import { fetchScreens } from '../features/screenSlice'; // Import fetchScreens action

const AdminMovies = () => {
  const dispatch = useDispatch();
  const { movies, screens } = useSelector((state) => ({
    movies: state.movies.movies,
    screens: state.screens.screens,
  }));
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [showtimes, setShowtimes] = useState('');
  const [selectedScreen, setSelectedScreen] = useState('');

  useEffect(() => {
    dispatch(fetchScreens()); // Dispatch fetchScreens action when component mounts
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie({ title, genre, description, poster, showtimes: [showtimes], screens: [selectedScreen] }));
    // Optionally clear the form
    setTitle('');
    setGenre('');
    setDescription('');
    setPoster('');
    setShowtimes('');
    setSelectedScreen('');
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Movies</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Showtime</label>
          <input type="datetime-local" value={showtimes} onChange={(e) => setShowtimes(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select Screen</label>
          <select value={selectedScreen} onChange={(e) => setSelectedScreen(e.target.value)} className="border rounded w-full py-2 px-3">
            <option value="">Select a screen</option>
            {screens.map((screen) => (
              <option key={screen._id} value={screen._id}>{screen.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Add Movie</button>
      </form>
      </div>
      <h3 className="text-lg font-bold mb-2 text-center">Movies List</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </div>
    </div>
  );
};

export default AdminMovies;
