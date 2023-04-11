import moment from "moment";
const fs = require("fs");
const path = require("path");
import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
const accessLogStream = fs.createWriteStream(path.join("access.log"), {
  flags: "a",
});

// Accees log to local file
export const accessLog = (name: string, data: any): void => {
  data = fixData(data);

  accessLogStream.write(
    `${name}: ${moment().format("DD/MM/YYY HH:mm")} ${data + "\n \n"}`
  );
};

// Logging in Aws Cloudwatch
export const loggerAWS = (data: any, type: string = "info") => {
  data = fixData(data);

  winston.add(
    new WinstonCloudWatch({
      awsOptions: {
        credentials: {
          accessKeyId: process.env?.AWS_ACCESS_ID as string,
          secretAccessKey: process.env?.AWS_ACCESS_KEY as string,
        },
        region: process?.env?.AWS_ACCESS_REGION as string,
      },
      logGroupName: process.env?.AWS_CLOUDWATCH_GROUP,
      logStreamName: "aris-test",
    })
  );

  if (type === "error") {
    winston.error(data);
  } else {
    winston.info(data);
  }
};

// Fixing Different types of data to string
const fixData = (data: any) => {
  let seenObjects: any[] = [];

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
  } else {
    if (typeof data === "object") {
      data = JSON.stringify(data, null, 2);
    } else if (typeof data === "symbol" || typeof data === "function") {
      data = data?.toString();
    }
  }

  return data;
};

// Checking if is a circular Data
const isCircular = (obj: any): boolean => {
  let seenObjects: any[] = [];

  function detect(obj: any): boolean {
    if (obj && typeof obj === "object") {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (let key in obj) {
        if (
          Object.prototype?.hasOwnProperty.call(obj, key) &&
          detect(obj[key])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
};
