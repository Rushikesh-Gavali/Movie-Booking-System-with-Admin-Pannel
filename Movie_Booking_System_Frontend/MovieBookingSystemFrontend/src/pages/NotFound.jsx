import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <Link to="/" className="text-indigo-600 hover:text-indigo-800">Go to Home</Link>
    </div>
  );
};

export default NotFound;
