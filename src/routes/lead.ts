import { Router } from "express";
import form from "../controllers/lead";
import { leadSchema, validateLead } from "../schema";

const router = Router();

// Leads
router.post("/create-lead", form.createLead);
router.post("/update-lead", form.updateLead);
router.post("/save-signature", form.saveSignature);
router.post("/complete-form", form.completeForm);
router.post("/check-email", form.checkMxOfEmail);

// Partial
router.post("/partial", form.createPartial);

export default router;
