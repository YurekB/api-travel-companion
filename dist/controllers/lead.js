"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var claimerData_1 = require("../utils/claimerData");
var emailTemplate_1 = require("../utils/emailTemplate");
var externalApi_1 = require("../utils/externalApi");
var google_1 = require("../utils/google");
var log_1 = require("../utils/log");
var mailgun_1 = require("../utils/mailgun");
var _a = require("../../models"), Lead = _a.Lead, Claim = _a.Claim, Address = _a.Address, Signature = _a.Signature, Partial = _a.Partial;
var uuid_1 = require("uuid");
var Resolver = require("dns").promises.Resolver;
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
// Leads
function createLead(req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var data, claimData, addressData, utmData, version, stage, existingLead, createdLead, createdClaim, createdAddress, googleData, err_1;
        var _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    console.log("Create Lead Run ***", req.body.data);
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 7, , 8]);
                    data = __assign(__assign({}, (_a = req.body) === null || _a === void 0 ? void 0 : _a.lead), { uuid: (0, uuid_1.v4)() });
                    claimData = (_b = req.body) === null || _b === void 0 ? void 0 : _b.claim;
                    addressData = (_c = req.body) === null || _c === void 0 ? void 0 : _c.address;
                    utmData = (_d = req.body) === null || _d === void 0 ? void 0 : _d.utmData;
                    version = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.lead) === null || _f === void 0 ? void 0 : _f.stage;
                    stage = (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.lead) === null || _h === void 0 ? void 0 : _h.stage;
                    return [4 /*yield*/, Lead.findOne({
                            where: {
                                email: (_j = {}, _j[Op.eq] = data === null || data === void 0 ? void 0 : data.email, _j),
                            },
                            raw: true,
                        }).catch(function (err) {
                            console.log("Lead Find Catch:", err);
                            (0, log_1.accessLog)("EMAIL CATCH ERROR:", err);
                            throw "Couldn't check for existing user.";
                        })];
                case 2:
                    existingLead = _k.sent();
                    if (existingLead)
                        throw "Email address already in use.";
                    return [4 /*yield*/, Lead.create(data).catch(function (err) {
                            console.log("Create Lead Catch:", err);
                            (0, log_1.accessLog)("Create Lead Catch", err);
                            throw "Create Lead Catch";
                        })];
                case 3:
                    createdLead = _k.sent();
                    // Update Table objects with Lead Id
                    claimData = {
                        leadId: createdLead === null || createdLead === void 0 ? void 0 : createdLead.id,
                    };
                    addressData = {
                        leadId: createdLead === null || createdLead === void 0 ? void 0 : createdLead.id,
                    };
                    return [4 /*yield*/, Claim.create(claimData).catch(function (err) {
                            console.log("Create Claim Catch:", err);
                            (0, log_1.accessLog)("Create Claim Catch", err);
                            throw "Create Claim Catch";
                        })];
                case 4:
                    createdClaim = _k.sent();
                    return [4 /*yield*/, Address.create(addressData).catch(function (err) {
                            console.log("Create Claim Catch:", err);
                            (0, log_1.accessLog)("Create Claim Catch", err);
                            throw "Create Claim Catch";
                        })];
                case 5:
                    createdAddress = _k.sent();
                    // addClaimData(claimerObj, createdLead?.id)
                    (0, claimerData_1.addUtmData)(req, utmData, createdLead === null || createdLead === void 0 ? void 0 : createdLead.id);
                    googleData = __assign(__assign(__assign(__assign({}, data), createdClaim), createdAddress), utmData);
                    return [4 /*yield*/, (0, google_1.addLeadToGoogleSheet)(googleData, "Stage-".concat(stage))];
                case 6:
                    _k.sent();
                    res.send({
                        success: true,
                        uuid: createdLead.uuid,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _k.sent();
                    res.status(400).send({
                        success: false,
                        message: err_1,
                    });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function updateLead(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var uuid, stage, leadData, claimData, updatedLead, updatedClaim, googleData, err_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Update Lead Run ***", req.body.data);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    uuid = (_a = req.body) === null || _a === void 0 ? void 0 : _a.uuid;
                    stage = (_b = req.body) === null || _b === void 0 ? void 0 : _b.lead.stage;
                    leadData = req.body.lead;
                    claimData = req.body.claim;
                    return [4 /*yield*/, Lead.update({ leadData: leadData, where: { uuid: uuid } }).catch(function (err) {
                            console.log("Update Lead Catch:", err);
                            (0, log_1.accessLog)("Update Lead Catch", err);
                            throw "Update Lead Catch";
                        })];
                case 2:
                    updatedLead = _c.sent();
                    return [4 /*yield*/, Claim.update(claimData).catch(function (err) {
                            console.log("Update Claim Catch:", err);
                            (0, log_1.accessLog)("Update Claim Catch", err);
                            throw "Update Claim Catch";
                        })];
                case 3:
                    updatedClaim = _c.sent();
                    googleData = __assign(__assign({}, updatedLead), { updatedClaim: updatedClaim });
                    return [4 /*yield*/, (0, google_1.addLeadToGoogleSheet)(googleData, "Stage-".concat(stage))];
                case 4:
                    _c.sent();
                    res.send({
                        success: true,
                        uuid: uuid,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _c.sent();
                    res.status(400).send({
                        success: false,
                        message: err_2,
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function saveSignature(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var uuid, stage, signatureData, updatedLead, createdSignature, googleData, err_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Update Lead Run ***", req.body.data);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    uuid = (_a = req.body) === null || _a === void 0 ? void 0 : _a.uuid;
                    stage = (_b = req.body) === null || _b === void 0 ? void 0 : _b.stage;
                    signatureData = req.body.signature;
                    return [4 /*yield*/, Lead.update({ stage: stage, where: { uuid: uuid } }).catch(function (err) {
                            console.log("Update Lead Catch:", err);
                            (0, log_1.accessLog)("Update Lead Catch", err);
                            throw "Update Lead Catch";
                        })];
                case 2:
                    updatedLead = _c.sent();
                    return [4 /*yield*/, Signature.create(signatureData).catch(function (err) {
                            console.log("Create Signature  Catch:", err);
                            (0, log_1.accessLog)("Create Signature  Catch", err);
                            throw "Create Signature  Catch";
                        })];
                case 3:
                    createdSignature = _c.sent();
                    googleData = __assign(__assign({}, updatedLead), createdSignature);
                    return [4 /*yield*/, (0, google_1.addLeadToGoogleSheet)(googleData, "Stage-".concat(stage))];
                case 4:
                    _c.sent();
                    res.send({
                        success: true,
                        uuid: uuid,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _c.sent();
                    res.status(400).send({
                        success: false,
                        message: err_3,
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function completeForm(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var uuid, stage, lastData, updatedLead, apiResponse, googleData, err_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Update Lead Run ***", req.body.data);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    uuid = (_a = req.body) === null || _a === void 0 ? void 0 : _a.uuid;
                    stage = (_b = req.body) === null || _b === void 0 ? void 0 : _b.stage;
                    lastData = req.body.lead;
                    return [4 /*yield*/, Lead.update({ lastData: lastData, where: { uuid: uuid } }).catch(function (err) {
                            console.log("Update Lead Catch:", err);
                            (0, log_1.accessLog)("Update Lead Catch", err);
                            throw "Update Lead Catch";
                        })];
                case 2:
                    updatedLead = _c.sent();
                    return [4 /*yield*/, (0, externalApi_1.sendToExternalApi)(lastData)];
                case 3:
                    apiResponse = _c.sent();
                    if (!apiResponse)
                        throw "External Api 0 response.";
                    googleData = __assign({}, updatedLead);
                    return [4 /*yield*/, (0, google_1.addLeadToGoogleSheet)(googleData, "Stage-".concat(stage))];
                case 4:
                    _c.sent();
                    // Email to user
                    return [4 /*yield*/, (0, mailgun_1.sendEmail)((lastData === null || lastData === void 0 ? void 0 : lastData.email) || updatedLead.email, "SUBJECT", (0, emailTemplate_1.createEmail)("Client Name"), "", null, null)];
                case 5:
                    // Email to user
                    _c.sent();
                    // Email to client
                    return [4 /*yield*/, (0, mailgun_1.sendEmail)("".concat(process.env.CLIENT_EMAIL), "SUBJECT", (0, emailTemplate_1.createEmail)("firstName"), "", null, null)];
                case 6:
                    // Email to client
                    _c.sent();
                    res.send({
                        success: true,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    err_4 = _c.sent();
                    res.status(400).send({
                        success: false,
                        message: err_4,
                    });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Partial Lead
function createPartial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, createdPartial, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Create Partial Run ***", req.body.data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    data = req.body.data;
                    return [4 /*yield*/, Partial.create(data).catch(function (err) {
                            console.log("Create Lead Catch:", err);
                            (0, log_1.accessLog)("Create Lead Catch", err);
                            throw "Create Lead Catch";
                        })];
                case 2:
                    createdPartial = _a.sent();
                    return [4 /*yield*/, (0, google_1.addLeadToGoogleSheet)(createdPartial, "Partial")];
                case 3:
                    _a.sent();
                    res.send({
                        success: true,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    res.status(400).send({
                        success: false,
                        error: err_5,
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function checkMxOfEmail(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var email, errors, emailCheck, dnsServers, _b, domain, resolver, errCheck_1, addressesMx, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
                    errors = ["ECONNREFUSED", "ENOTFOUND"];
                    emailCheck = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email) && !/\s/.test(email.trim());
                    if (!emailCheck) {
                        res.status(200).send({
                            success: false,
                            message: "Invalid Email",
                        });
                    }
                    dnsServers = [
                        "1.1.1.1",
                        "1.0.0.1",
                        "8.8.8.8",
                        "8.8.4.4",
                        "208.67.222.222",
                        "208.67.220.220", // OpenDNS
                    ];
                    _b = email.split("@"), domain = _b[1];
                    resolver = new Resolver();
                    errCheck_1 = true;
                    return [4 /*yield*/, resolver.resolveMx(domain).catch(function (err) {
                            errCheck_1 = err;
                        })];
                case 1:
                    addressesMx = _c.sent();
                    if (errCheck_1 === null || errCheck_1 === void 0 ? void 0 : errCheck_1.code) {
                        res.status(422).send({
                            success: false,
                            errCheck: errCheck_1,
                        });
                    }
                    else {
                        res.status(200).send({
                            success: true,
                            addressesMx: addressesMx,
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    console.log(error_1);
                    res.status(400).send({
                        success: false,
                        message: "Please try Data8",
                        error: error_1,
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    createLead: createLead,
    updateLead: updateLead,
    saveSignature: saveSignature,
    completeForm: completeForm,
    createPartial: createPartial,
    checkMxOfEmail: checkMxOfEmail,
};
