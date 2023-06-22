const winston = require("winston");
const { colorizeLevel } = require("./helpers/colorizeLevels");

const log = winston.createLogger({
  /** initialize requestId */
  defaultMeta: { requestId: "" },
  level: "info",
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

module.exports.Log = log;
