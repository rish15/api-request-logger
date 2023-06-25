const { performance } = require("perf_hooks");
const chalk = require("chalk");
const { log } = require("./logger/log");

const APILogger = (req, res, next) => {
  const startTime = performance.now();
  processRequestId(req);

  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      requestMethod: req.method,
      userAgent: req.headers["user-agent"],
      xRequestId: req.headers["X-request-id"],
      apiLatency: latency,
      time: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV,
      msg: "api_stats",
    };
    console.log(
      `[${chalk.bgWhiteBright(chalk.black("API STATS"))}]`,
      chalk.blue.bold(JSON.stringify(logData))
    );
  });

  next();
}
module.exports.APILogger = APILogger;
/**
 * @description generates `[X-request-id]` if not present in headers and appends it to the `req.headers` & log instance
 * @param {object} req - express req instance
 * @returns {string} requestId - 
 */
const processRequestId = (req) => {
  if (!req.headers["X-request-id"]) {
    const requestId = require("crypto").randomBytes(16).toString("hex");
    log.defaultMeta["requestId"] = requestId;
    return requestId;
  } else if (req.headers["X-request-id"]) {
    log.defaultMeta["requestId"] = req.headers["X-request-id"];
  }
}
