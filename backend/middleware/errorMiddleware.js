// Error handler middleware
const errorHandler = (err, req, res, next) => {    
    const statusCode = res.statusCode ? res.statusCode: 500;

    res.status(statusCode);

    res.json({
        error:err.message,
        stack:err.stack
    })
}
module.exports = {errorHandler}