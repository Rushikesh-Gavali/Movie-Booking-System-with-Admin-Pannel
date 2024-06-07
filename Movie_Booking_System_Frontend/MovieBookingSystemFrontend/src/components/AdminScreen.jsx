import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScreens, addScreen } from '../features/screenSlice';

const AdminScreens = () => {
  const dispatch = useDispatch();
  const { screens, status, error } = useSelector((state) => state.screens);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [seats, setSeats] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchScreens());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const seatsObject = seats.reduce((acc, seat) => {
      return { ...acc, [seat]: false };
    }, {});

    const newScreen = {
      name,
      capacity,
      seats: seatsObject,
      movies,
    };

    dispatch(addScreen(newScreen));

    setName('');
    setCapacity('');
    setSeats([]);
    setMovies([]);
  };

  return (
    <div className="container mx-auto p-4" >
      <h2 className="text-xl font-bold mb-4 text-center">Manage Screens</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label className="block text-gray-700">Screen Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Capacity</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Seats</label>
          <input type="text" placeholder='eg. A1,A2,B1,B2 etc' value={seats} onChange={(e) => setSeats(e.target.value.split(','))} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Movies</label>
          <input type="text" value={movies} onChange={(e) => setMovies(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Add Screen</button>
      </form>
      </div>
      {status === 'loading' && <p>Loading screens...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <h3 className="text-lg font-bold mb-2 text-center">Screens List</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screens.map(screen => (
          <li key={screen._id}>{screen.name} - {screen.capacity} seats</li>
        ))}
      </div>
    </div>
  );
};

export default AdminScreens;
