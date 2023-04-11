"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var appError_1 = require("../appError");
var errorHandler = function (error, req, res, next) {
    console.log(error);
    if (error.name === "ValidationError") {
        return res.status(400).send({
            type: error.name,
            details: error.message,
        });
    }
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
        });
    }
    return res.status(500).send({
        success: false,
        message: error,
    });
};
exports.errorHandler = errorHandler;
