"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lead_1 = __importDefault(require("../controllers/lead"));
var router = (0, express_1.Router)();
// Leads
router.post("/create-lead", lead_1.default.createLead);
router.post("/update-lead", lead_1.default.updateLead);
router.post("/save-signature", lead_1.default.saveSignature);
router.post("/complete-form", lead_1.default.completeForm);
router.post("/check-email", lead_1.default.checkMxOfEmail);
// Partial
router.post("/partial", lead_1.default.createPartial);
exports.default = router;
