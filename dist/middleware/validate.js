"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLead = void 0;
var validateLead = function (ajvLeadSchema) {
    return function (req, res, next) {
        var valid = ajvLeadSchema(req.body.lead);
        if (!valid) {
            // NO awaits in this statement as the error will move on 
            var errors = ajvLeadSchema.errors;
            res.status(400).json(errors);
        }
        next();
    };
};
exports.validateLead = validateLead;
