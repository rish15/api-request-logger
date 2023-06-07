const { performance } = require("perf_hooks");

function APILogger(req, res, next) {
  const startTime = performance.now();

  const requestId = require("crypto").randomBytes(16).toString("hex");
  req.headers["x-spintly-id"] = requestId;
  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      requestMethod: req.method,
      userAgent: req.headers["user-agent"],
      'x-request-id': req.headers["x-spintly-id"],
      apiLatency: latency,
      time: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV,
      msg: 'api_stats'
    };
    console.log(JSON.stringify(logData));
  });

  next();
}

module.exports = APILogger;
