const { performance } = require("perf_hooks");
const chalk = require("chalk");
const { log } = require("./logger/log");

function APILogger(req, res, next) {
  const startTime = performance.now();

  if (!req.headers["X-request-id"]) {
    const requestId = require("crypto").randomBytes(16).toString("hex");
    log.defaultMeta["requestId"] = requestId;
  }
  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      method: req.method,
      userAgent: req.headers["user-agent"],
      xRequestId: req.headers["X-request-id"],
      apiLatency: latency,
      apiCalledAt: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV,
    };
    console.log(
      `[${chalk.bgWhiteBright(chalk.black("API STATS"))}]`,
      chalk.blue.bold(JSON.stringify(logData))
    );
  });

  next();
}

module.exports = APILogger;
