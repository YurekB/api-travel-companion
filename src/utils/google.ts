import lead from "../controllers/lead";
import { accessLog } from "./log";
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const {GoogleAuth, JWT, OAuth2Client} = require('google-auth-library');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

import moment from "moment";
import { iLead } from "../types";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./serviceAccountKey.json",
    scopes: SCOPES,
  });

  const authToken = await auth.getClient().catch((err:any) => console.log("AuthToken Catch", err))

  return authToken;
}

export async function appendSpreadSheetValues({ auth, spreadsheetId, range, values }:any) {
  const res = await sheets.spreadsheets.values.append({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    range, //sheet name and range of cells
    valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
    resource: {
      values,
    },
  });
  return res;
}

export async function addLeadToGoogleSheet(data:iLead, tabName: string = "Stage-1") {
  try {

    let valueSubArray : any[]=  Object.values(lead);
    valueSubArray = valueSubArray.map((val:any) => val === true ? "Yes" : val === false ? 'No': val); // Make booleans readable
    let now  = moment().format("DD/MM/YYYY HH:mm");
    valueSubArray.push(now);
    let appID;
    let auth = await getAuthToken();
    let range = `${tabName}`;
    let spreadsheetId = `${process.env.GOOGLE_SHEET_ID}`
    let values = [];
    appID = data?.id

    values = [valueSubArray];

    await appendSpreadSheetValues({
      auth,
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      values,
    }).catch((err: any) => {
      console.log("Append SpreadSheet Values 1 Err:", err);
      accessLog("Append SpreadSheet Values 1 Err:", err)  
      throw "Add lead to Google Issue error."
    });

    return true;
  } catch (err: any) {
    console.log("Catch Error Message GS:", err);
    accessLog("Catch Error Message GS:", err)  
    return false
  }
}

