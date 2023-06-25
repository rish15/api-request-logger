const winston = require("winston");
const { colorizeLevel } = require("./helpers/colorizeLevels");
require("dotenv").config();

const log = winston.createLogger({
  /** initialize requestId */
  defaultMeta: { requestId: "" },
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    colorizeLevel(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, requestId }) => {
      return `[${level}] [${timestamp}] [${requestId}] ${JSON.stringify(
        message
      )}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports.log = log;
