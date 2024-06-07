import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ErrorMessage from '../../components/ErrorMessage';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);

  // Define the validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
  });

  // Initialize useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {status === 'failed' && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.name ? 'border-red-500' : ''}`}
            {...register('name')}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.email ? 'border-red-500' : ''}`}
            {...register('email')}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className={`border rounded w-full py-2 px-3 text-gray-700 ${errors.password ? 'border-red-500' : ''}`}
            {...register('password')}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
