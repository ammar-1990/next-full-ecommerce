export default function errorHandler (err,req,res,next){

    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'something went wrong'
  
    return res.status(errorStatus).send(errorMessage)
  }