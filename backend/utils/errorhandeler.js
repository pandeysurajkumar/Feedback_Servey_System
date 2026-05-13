import ApiError from "./ApiError.js";

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            error: err.message
        });
    }

    // If not a CustomError, it's an internal server error
    return res.status(500).json({
        error: 'Something went wrong'
    });
}
export default  errorHandler;