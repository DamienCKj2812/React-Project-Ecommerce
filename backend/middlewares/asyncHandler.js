const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
        res.status(500).json({message: error.message}); //error will look like this in json format {"message":"Please fill all the inputs."}
    })
}

export default asyncHandler;

// asyncHandler function is a middleware that wraps around asynchronous route handlers. 
// It ensures that any errors that occur during the asynchronous operation are caught and handled, preventing the need
// for explicit try/catch blocks in every asynchronous route handler