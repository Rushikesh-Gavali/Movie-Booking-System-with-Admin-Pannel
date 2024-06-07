import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-600 mb-2">{movie.genre}</p>
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold mb-2">Showtimes:</h3>
            <ul className="text-gray-600 list-disc list-inside">
              {movie.showtimes.map((time, index) => (
                <li key={index}>
                  {format(new Date(time), 'yyyy-MM-dd HH:mm')}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Link to={`/movies/${movie._id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
