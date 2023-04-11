"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLead = exports.leadSchema = void 0;
var ajv_instance_1 = __importDefault(require("./ajv-instance"));
exports.leadSchema = {
    type: "object",
    properties: {
        version: { type: 'string' },
        title: {
            type: 'string',
            enum: ['Mr', "Mrs", "Miss", "Dr"]
        },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        dob: { type: 'string', format: 'date' },
    },
    required: ['version', 'title', 'firstName', 'lastName', 'email', 'phone', 'dob'],
    optionalProperties: true
};
var validateLead = ajv_instance_1.default.compile(exports.leadSchema);
exports.validateLead = validateLead;
