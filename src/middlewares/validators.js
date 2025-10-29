import { validationResult } from "express-validator";
import {apiError} from "../utils/api-error.js"

export const validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next();
    }
    const extractedErrors=[]
    errors.array().map((err)=>extractedErrors.push({[err.path]:err.msg})) //it is used to check if the errors is an array and then map each error and push it in the array with the path
    throw new apiError(422,"Received data is not valid",extractedErrors);
};