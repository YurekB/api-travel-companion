"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLeadToGoogleSheet = exports.appendSpreadSheetValues = exports.getAuthToken = void 0;
var lead_1 = __importDefault(require("../controllers/lead"));
var log_1 = require("./log");
var google = require('googleapis').google;
var sheets = google.sheets('v4');
var _a = require('google-auth-library'), GoogleAuth = _a.GoogleAuth, JWT = _a.JWT, OAuth2Client = _a.OAuth2Client;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var moment_1 = __importDefault(require("moment"));
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
function getAuthToken() {
    return __awaiter(this, void 0, void 0, function () {
        var auth, authToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = new google.auth.GoogleAuth({
                        keyFile: "./serviceAccountKey.json",
                        scopes: SCOPES,
                    });
                    return [4 /*yield*/, auth.getClient().catch(function (err) { return console.log("AuthToken Catch", err); })];
                case 1:
                    authToken = _a.sent();
                    return [2 /*return*/, authToken];
            }
        });
    });
}
exports.getAuthToken = getAuthToken;
function appendSpreadSheetValues(_a) {
    var auth = _a.auth, spreadsheetId = _a.spreadsheetId, range = _a.range, values = _a.values;
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sheets.spreadsheets.values.append({
                        auth: auth,
                        spreadsheetId: spreadsheetId,
                        range: range,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: values,
                        },
                    })];
                case 1:
                    res = _b.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.appendSpreadSheetValues = appendSpreadSheetValues;
function addLeadToGoogleSheet(data, tabName) {
    if (tabName === void 0) { tabName = "Stage-1"; }
    return __awaiter(this, void 0, void 0, function () {
        var valueSubArray, now, appID, auth, range, spreadsheetId, values, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    valueSubArray = Object.values(lead_1.default);
                    valueSubArray = valueSubArray.map(function (val) { return val === true ? "Yes" : val === false ? 'No' : val; }); // Make booleans readable
                    now = (0, moment_1.default)().format("DD/MM/YYYY HH:mm");
                    valueSubArray.push(now);
                    appID = void 0;
                    return [4 /*yield*/, getAuthToken()];
                case 1:
                    auth = _a.sent();
                    range = "".concat(tabName);
                    spreadsheetId = "".concat(process.env.GOOGLE_SHEET_ID);
                    values = [];
                    appID = data === null || data === void 0 ? void 0 : data.id;
                    values = [valueSubArray];
                    return [4 /*yield*/, appendSpreadSheetValues({
                            auth: auth,
                            spreadsheetId: spreadsheetId,
                            range: range,
                            valueInputOption: "USER_ENTERED",
                            values: values,
                        }).catch(function (err) {
                            console.log("Append SpreadSheet Values 1 Err:", err);
                            (0, log_1.accessLog)("Append SpreadSheet Values 1 Err:", err);
                            throw "Add lead to Google Issue error.";
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_1 = _a.sent();
                    console.log("Catch Error Message GS:", err_1);
                    (0, log_1.accessLog)("Catch Error Message GS:", err_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addLeadToGoogleSheet = addLeadToGoogleSheet;
