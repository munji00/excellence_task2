import { Request, Response , NextFunction} from "express";
/*class myError extends Error {
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
}*/
 export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	// if no status or message in error use default 500 code and message
	const statusCode = 500;
	const message = err.message || "Something went wrong.";

	// returns error status code and message
	return res.status(statusCode).json({
		error: statusCode,
		message: message
	})
}


