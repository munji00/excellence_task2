class myError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode
        this.message=message;
    }
}


export const errorHandler = (res, statusCode ,errorMessage) => 
{
    const newError = new myError(statusCode, errorMessage)
    return  res.send(newError)
}