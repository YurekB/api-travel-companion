import { Request, Response, NextFunction } from "express";
import { leadSchema, validateLead } from "../schema";
import { iClaim, iLead, iUtm } from "../types";
import { addUtmData } from "../utils/claimerData";
import { createEmail } from "../utils/emailTemplate";
import { sendToExternalApi } from "../utils/externalApi";
import { addLeadToGoogleSheet } from "../utils/google";
import { accessLog } from "../utils/log";
import { sendEmail } from "../utils/mailgun";
const { Lead, Claim, Address, Signature, Partial } = require("../../models");

import { v4 as uuidv4 } from "uuid";
const { Resolver } = require("dns").promises;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Leads

async function createLead(req: Request, res: Response, next: NextFunction) {
  console.log("Create Lead Run ***", req.body.data);
  try {
    let data: iLead = { ...req.body?.lead, uuid: uuidv4() };
    let claimData: iClaim = req.body?.claim;
    let addressData = req.body?.address;

    let utmData: iUtm = req.body?.utmData;
    const version: string = req.body?.lead?.stage;
    const stage: number = req.body?.lead?.stage;

    // validateLead(leadSchema) // Delete when cloned done - Not stable

    let existingLead = await Lead.findOne({
      where: {
        email: { [Op.eq]: data?.email },
      },
      raw: true,
    }).catch((err: any) => {
      console.log("Lead Find Catch:", err);
      accessLog("EMAIL CATCH ERROR:", err);
      throw "Couldn't check for existing user.";
    });

    if (existingLead) throw "Email address already in use.";

    let createdLead = await Lead.create(data).catch((err: any) => {
      console.log("Create Lead Catch:", err);
      accessLog("Create Lead Catch", err);
      throw `Create Lead Catch`;
    });
    // Update Table objects with Lead Id
    claimData = {
      leadId: createdLead?.id,
    };
    addressData = {
      leadId: createdLead?.id,
    };

    let createdClaim = await Claim.create(claimData).catch((err: any) => {
      console.log("Create Claim Catch:", err);
      accessLog("Create Claim Catch", err);
      throw `Create Claim Catch`;
    });

    let createdAddress = await Address.create(addressData).catch((err: any) => {
      console.log("Create Claim Catch:", err);
      accessLog("Create Claim Catch", err);
      throw `Create Claim Catch`;
    });

    // addClaimData(claimerObj, createdLead?.id)
    addUtmData(req, utmData, createdLead?.id);

    let googleData = {
      ...data,
      ...createdClaim,
      ...createdAddress,
      ...utmData,
    };

    await addLeadToGoogleSheet(googleData, `Stage-${stage}`);

    res.send({
      success: true,
      uuid: createdLead.uuid,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

async function updateLead(req: Request, res: Response, next: NextFunction) {
  console.log("Update Lead Run ***", req.body.data);

  try {
    const uuid: number = req.body?.uuid;
    const stage: number = req.body?.lead.stage;

    let leadData = req.body.lead;
    let claimData = req.body.claim;

    let updatedLead = await Lead.update({ leadData, where: { uuid } }).catch(
      (err: any) => {
        console.log("Update Lead Catch:", err);
        accessLog("Update Lead Catch", err);
        throw `Update Lead Catch`;
      }
    );

    let updatedClaim = await Claim.update(claimData).catch((err: any) => {
      console.log("Update Claim Catch:", err);
      accessLog("Update Claim Catch", err);
      throw `Update Claim Catch`;
    });

    let googleData = {
      ...updatedLead,
      updatedClaim,
    };

    await addLeadToGoogleSheet(googleData, `Stage-${stage}`);

    res.send({
      success: true,
      uuid,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

async function saveSignature(req: Request, res: Response, next: NextFunction) {
  console.log("Update Lead Run ***", req.body.data);

  try {
    const uuid: number = req.body?.uuid;
    const stage: number = req.body?.stage;
    let signatureData = req.body.signature;

    let updatedLead = await Lead.update({ stage, where: { uuid } }).catch(
      (err: any) => {
        console.log("Update Lead Catch:", err);
        accessLog("Update Lead Catch", err);
        throw `Update Lead Catch`;
      }
    );

    let createdSignature = await Signature.create(signatureData).catch(
      (err: any) => {
        console.log("Create Signature  Catch:", err);
        accessLog("Create Signature  Catch", err);
        throw `Create Signature  Catch`;
      }
    );

    let googleData = {
      ...updatedLead,
      ...createdSignature,
    };

    await addLeadToGoogleSheet(googleData, `Stage-${stage}`);

    res.send({
      success: true,
      uuid,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

async function completeForm(req: Request, res: Response, next: NextFunction) {
  console.log("Update Lead Run ***", req.body.data);

  try {
    const uuid: number = req.body?.uuid;
    const stage: number = req.body?.stage;
    let lastData = req.body.lead;

    let updatedLead = await Lead.update({ lastData, where: { uuid } }).catch(
      (err: any) => {
        console.log("Update Lead Catch:", err);
        accessLog("Update Lead Catch", err);
        throw `Update Lead Catch`;
      }
    );

    const apiResponse: number = await sendToExternalApi(lastData);

    if (!apiResponse) throw "External Api 0 response.";

    let googleData = {
      ...updatedLead,
    };

    await addLeadToGoogleSheet(googleData, `Stage-${stage}`);

    // Email to user
    await sendEmail(
      lastData?.email || updatedLead.email,
      "SUBJECT",
      createEmail("Client Name"),
      "",
      null,
      null
    );
    // Email to client
    await sendEmail(
      `${process.env.CLIENT_EMAIL}`,
      "SUBJECT",
      createEmail("firstName"),
      "",
      null,
      null
    );

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

// Partial Lead

async function createPartial(req: Request, res: Response, next: NextFunction) {
  console.log("Create Partial Run ***", req.body.data);
  try {
    let data = req.body.data; // This is reliant on consistent naming of db columns and frontend keys

    let createdPartial = await Partial.create(data).catch((err: any) => {
      console.log("Create Lead Catch:", err);
      accessLog("Create Lead Catch", err);
      throw `Create Lead Catch`;
    });

    await addLeadToGoogleSheet(createdPartial, `Partial`);

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err,
    });
  }
}

async function checkMxOfEmail(req: Request, res: Response, next: NextFunction) {
  try {
    let email = req.body?.email;
    let errors = ["ECONNREFUSED", "ENOTFOUND"];

    let emailCheck =
      /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email) && !/\s/.test(email.trim());

    if (!emailCheck) {
      res.status(200).send({
        success: false,
        message: "Invalid Email",
      });
    }

    const dnsServers = [
      "1.1.1.1", // Cloudflare
      "1.0.0.1", // Cloudflare
      "8.8.8.8", // Google
      "8.8.4.4", // Google
      "208.67.222.222", // OpenDNS
      "208.67.220.220", // OpenDNS
    ];

    const [, domain] = email.split("@");

    const resolver = new Resolver();
    let errCheck: any = true;
    const addressesMx = await resolver.resolveMx(domain).catch((err: any) => {
      errCheck = err;
    });
    if (errCheck?.code) {
      res.status(422).send({
        success: false,
        errCheck: errCheck,
      });
    } else {
      res.status(200).send({
        success: true,
        addressesMx: addressesMx,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).send({
      success: false,
      message: "Please try Data8",
      error: error,
    });
  }
}

export default {
  createLead,
  updateLead,
  saveSignature,
  completeForm,
  createPartial,
  checkMxOfEmail,
};
