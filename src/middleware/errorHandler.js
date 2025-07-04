function errorHandler(err, req, res, next) {
    console.error('An error occurred:');
    console.error(err.stack || err);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

export default errorHandler;