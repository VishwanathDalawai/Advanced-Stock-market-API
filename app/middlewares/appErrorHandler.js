const response = require('./../libs/responseLib')

//generic error that is returned if there is error in parsing json or some other issues
let errorHandler = (err,req, res, next) => {
    console.log("application error handler called");
    console.log(err);

    let apiResponse = response.generate(true, 'Some error occured at global level',500, null)
    res.send(apiResponse)
    
}// end request ip logger function 

//if route is not handled/present in the application
let notFoundHandler = (req,res,next)=>{

    console.log("Global not found handler called");
    let apiResponse = response.generate(true, 'Route not found in the application',404, null)
    res.status(404).send(apiResponse)

}// end not found handler

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}
