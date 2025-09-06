// filepath: c:\Users\lenovo\Desktop\HackProj\EcoFinds\backend\server.js
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Security middleware
if (process.env.NODE_ENV === 'production') {
    // Set security headers
    app.use(helmet());

    // Prevent XSS attacks
    app.use(xss());

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000, // 10 mins
        max: 100 // 100 requests per 10 mins
    });
    app.use(limiter);

    // Prevent http param pollution
    app.use(hpp());
} else {
    // Dev logging middleware
    app.use(morgan('dev'));
}

// Mount routers - these will be created later
// app.use('/api/v1/auth', require('./routes/authRoutes'));
// app.use('/api/v1/users', require('./routes/userRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to EcoFinds API' });
});

// Error handler middleware - should be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});