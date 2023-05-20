const { performance } = require("perf_hooks");

function APILogger(req, res, next) {
  const startTime = performance.now();

  const requestId = require("crypto").randomBytes(16).toString("hex");
  req.headers["X-request-id"] = requestId;
  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    console.log(`API latency: ${latency.toFixed(2)} ms`);
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
    console.log(JSON.stringify(logData));
  });

  next();
}

module.exports = APILogger;
