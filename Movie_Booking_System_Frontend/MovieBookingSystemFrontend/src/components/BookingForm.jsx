import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookTickets } from '../features/bookings/bookingSlice';
import ErrorMessage from './ErrorMessage';

const BookingForm = ({ movie, screenId }) => {
  const dispatch = useDispatch();
  const { status, error, bookings } = useSelector((state) => state.bookings || {});
  const [seats, setSeats] = useState([]);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (seats.length === 0) {
      setFormError('Please select at least one seat.');
      return;
    }

    const bookingData = {
      movieId: movie._id,
      screenId: screenId,
      seats,
      totalPrice: seats.length * 20,
    };

    const result = await dispatch(bookTickets(bookingData));

    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess(true);
      setBookingDetails(result.payload.data);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {formError && <ErrorMessage message={formError} />}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <ErrorMessage message={error} />}
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Seats</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={seats}
              onChange={(e) => setSeats(e.target.value.split(','))}
              placeholder="e.g. A1,A2,A3"
            />
          </div>
          <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
            Book Now
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">Booking Successful!</h2>
          {console.log(bookingDetails)}
          <p>Movie: {movie.title}</p>
          <p>Screen: {bookingDetails.screen.name}</p>
          <p>Seats: {bookingDetails.seats.join(', ')}</p>
          <p>Total Price: ${bookingDetails.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
