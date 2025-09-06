// // filepath: c:\Users\lenovo\Desktop\HackProj\EcoFinds\backend\middleware\errorHandler.js
// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack.red);

//     res.status(err.statusCode || 500).json({
//         success: false,
//         error: err.message || 'Server Error'
//     });
// };

// module.exports = errorHandler;

const colors = require('colors');

const errorHandler = (err, req, res, next) => {
    // Log error for server-side debugging
    console.error(err.stack.red);

    // Determine status code (prioritize explicitly set statusCode on error)
    const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        // Include stack trace only in development
        ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack })
    });
};

module.exports = errorHandler;