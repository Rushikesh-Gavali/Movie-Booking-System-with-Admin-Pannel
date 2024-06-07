import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetailPage from './pages/MovieDetailPage';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import AdminPanel from './components/AdminPannel';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;