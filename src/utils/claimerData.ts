const { UTM } = require("../../models");
import { Request } from "express";
import { iUtm } from "../types";
import { accessLog } from "./log";
const DeviceDetector = require("node-device-detector");
const geoip = require("geoip-lite");
const { ClaimerData } = require("../../models");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});



async function addUtmData(req:Request,utmData: iUtm, leadId: number) {
  try {

    const userAgent = req.get("user-agent");
    const result = detector.detect(userAgent);

    // NGINX -> LEAVE THIS LINE ALONE !!!!!!!! JOEL -> LEAVE ME ALONE... YOU'VE BEEN WARNED
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    let claimerObj = {
      leadId: 1,
      os: result?.os || "N/A",
      device: result?.device || "N/A",
      client: result?.client || "N/A",
      ip: ip || "N/A",
      city: geo?.city || "N/A",
      country: geo?.country || "N/A",
    };


    const data = {
        leadId,
        utmSource: utmData?.utmSource,
        utmMedium: utmData?.utmMedium,
        utmCampaign: utmData?.utmCampaign,
        utmContent: utmData?.utmContent,
    };
    await UTM.create(data).catch((err: any) => {
        console.log("UTM Create Error", err);
        accessLog("UTM Create Error", err)  

        throw "UTM CATCH"

    });
  } catch (err) {
    console.log("err", err);
    accessLog("UTM MAIN ERROR", err)  
    throw "UTM MAIN ERROR"
  }
}



async function addClaimData(req: Request, leadId: number) {
  const userAgent = req.get("user-agent");
  const result = detector.detect(userAgent);
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const geo = geoip.lookup(ip);

  try {
    const dataObj = {
      leadId,
      os: result?.os || "N/A",
      device: result?.device || "N/A",
      client: result?.client || "N/A",
      ip: ip || "N/A",
      city: geo?.city || "N/A",
      country: geo?.country || "N/A",
    };

    await ClaimerData.create(dataObj).catch((err: any) => {
      console.log("Claimer Data Create Error", err);
      accessLog("Claimer Data Create Error", err)  

      throw "CLAIMER DATA CATCH"

    });
  } catch (err) {
    console.log("err", err);
    accessLog("CLAIMER DATA ERROR", err)  

    throw "CLAIMER DATA ERROR"

  }
}
export { addClaimData, addUtmData };
