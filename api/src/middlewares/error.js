class ApiError extends Error {
    constructor(err) {
        super(err);
        this.status = err.status;
        this.message = err.message;
    }
}

const errorHandler = (err, req, res, next) => {
    const {status, message} = err;
    (status) ? res.status(status).json(message) : res.status(500).json(message);
};

module.exports = {errorHandler, ApiError};