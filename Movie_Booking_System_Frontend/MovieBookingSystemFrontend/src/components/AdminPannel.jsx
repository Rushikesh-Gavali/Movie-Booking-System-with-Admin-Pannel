import React from 'react';
import AdminMovies from '../components/AdminMovies';
import AdminScreens from '../components/AdminScreen';

const AdminPanel = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
      <AdminMovies />
      <AdminScreens />
    </div>
  );
};

export default AdminPanel;