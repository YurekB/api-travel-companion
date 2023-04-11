export class AppError extends Error {
    errorCode: number; 
    statusCode: number;
    constructor(errorCode:number, message:string, statusCode:number) { 
        super(message) // Run the base error constructor with error message 
        this.errorCode = errorCode;
        this.statusCode = errorCode

    }
}