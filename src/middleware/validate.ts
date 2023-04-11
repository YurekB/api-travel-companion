import { Request, Response, NextFunction } from "express"

export const validateLead = (ajvLeadSchema: any) => { 
    return (req: Request,res: Response,next:NextFunction) => { 
        const valid = ajvLeadSchema((req as any).body.lead)
        if(!valid){ 
            // NO awaits in this statement as the error will move on 
            const errors = ajvLeadSchema.errors
            res.status(400).json(errors)
        }

        next()


    }

}