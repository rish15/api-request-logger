function APILogger(req, res, next) {
  const startTime = process.hrtime();
  const requestId = require("crypto").randomBytes(16).toString("hex");
  req.headers["X-request-id"] = requestId;
  res.on("finish", () => {
    const elapsedTimeInMs = process.hrtime(startTime)[1] / 1000000; // Convert to milliseconds
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      method: req.method,
      userAgent: req.headers["user-agent"],
      xRequestId: req.headers["X-request-id"],
      apiLatency: elapsedTimeInMs,
      apiCalledAt: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV,
    };
    console.log(JSON.stringify(logData));
  });

  next();
}

module.exports = APILogger;
