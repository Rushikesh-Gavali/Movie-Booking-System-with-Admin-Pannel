import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../features/movies/movieSlice';
import BookingForm from '../components/BookingForm';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, status, error } = useSelector((state) => state.movies);
  const [selectedScreenId, setSelectedScreenId] = useState('');

  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);

  const handleScreenChange = (e) => {
    setSelectedScreenId(e.target.value);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <img src={movie.poster} alt={movie.title} className="rounded-lg mb-4" />
        <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-600 mb-4">{movie.genre}</p>
        <p className="text-gray-600 mb-4">{movie.description}</p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Screen</label>
          <select value={selectedScreenId} onChange={handleScreenChange} className="border rounded w-full py-2 px-3 text-gray-700">
            <option value="">Select a screen</option>
            {movie.screens.map(screen => (
              <option key={screen._id} value={screen._id}>{screen.name}</option>
            ))}
          </select>
        </div>
      </div>
      {selectedScreenId && <BookingForm movie={movie} screenId={selectedScreenId} />}
    </div>
  );
};

export default MovieDetailPage;
