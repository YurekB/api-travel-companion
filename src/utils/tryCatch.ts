import { Request, Response, NextFunction } from "express";



exports.tryCatch = (controller:any) => async (req:Request, res:Response,next:NextFunction) => { 
    try {
        await controller(req,res)
        
    } catch (error) {
        return next(error)
        
    }

}