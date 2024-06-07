const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet')
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const responseHandler = require('./middlewares/responseHandler');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const movieRoutes = require('./routes/movieRoutes');
const screenRoutes = require('./routes/screenRoutes');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(responseHandler);

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
