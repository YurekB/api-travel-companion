"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerAWS = exports.accessLog = void 0;
var moment_1 = __importDefault(require("moment"));
var fs = require("fs");
var path = require("path");
var winston_1 = __importDefault(require("winston"));
var winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
var accessLogStream = fs.createWriteStream(path.join("access.log"), {
    flags: "a",
});
// Accees log to local file
var accessLog = function (name, data) {
    data = fixData(data);
    accessLogStream.write("".concat(name, ": ").concat((0, moment_1.default)().format("DD/MM/YYY HH:mm"), " ").concat(data + "\n \n"));
};
exports.accessLog = accessLog;
// Logging in Aws Cloudwatch
var loggerAWS = function (data, type) {
    var _a, _b, _c, _d;
    if (type === void 0) { type = "info"; }
    data = fixData(data);
    winston_1.default.add(new winston_cloudwatch_1.default({
        awsOptions: {
            credentials: {
                accessKeyId: (_a = process.env) === null || _a === void 0 ? void 0 : _a.AWS_ACCESS_ID,
                secretAccessKey: (_b = process.env) === null || _b === void 0 ? void 0 : _b.AWS_ACCESS_KEY,
            },
            region: (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.AWS_ACCESS_REGION,
        },
        logGroupName: (_d = process.env) === null || _d === void 0 ? void 0 : _d.AWS_CLOUDWATCH_GROUP,
        logStreamName: "aris-test",
    }));
    if (type === "error") {
        winston_1.default.error(data);
    }
    else {
        winston_1.default.info(data);
    }
};
exports.loggerAWS = loggerAWS;
// Fixing Different types of data to string
var fixData = function (data) {
    var seenObjects = [];
    if (isCircular(data)) {
        data = JSON.stringify(data, function (key, value) {
            if (typeof value === "object" && value !== null) {
                if (seenObjects.indexOf(value) !== -1) {
                    return;
                }
                seenObjects.push(value);
            }
            return value;
        });
    }
    else {
        if (typeof data === "object") {
            data = JSON.stringify(data, null, 2);
        }
        else if (typeof data === "symbol" || typeof data === "function") {
            data = data === null || data === void 0 ? void 0 : data.toString();
        }
    }
    return data;
};
// Checking if is a circular Data
var isCircular = function (obj) {
    var seenObjects = [];
    function detect(obj) {
        var _a;
        if (obj && typeof obj === "object") {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (((_a = Object.prototype) === null || _a === void 0 ? void 0 : _a.hasOwnProperty.call(obj, key)) &&
                    detect(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    }
    return detect(obj);
};
