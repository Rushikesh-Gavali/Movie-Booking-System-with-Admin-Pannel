import api from './api';

export const login = async (userData) => {
  return api.post('/auth/login', userData);
};

export const register = async (userData) => {
  return api.post('/auth/register', userData);
};
