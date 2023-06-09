# api-request-logger

`maintainer: Rishu Shrivastav (rish15)`

## Introduction

### The why ?

So we wanted to track every request that comes to the server with some metadata such as userAgent, reqBody, apiPath, apiLatency so I put together a simple minimilistic middleware which can be injected in one liner and start giving data to be analysed.

## Getting started

#### 1. Installation

`npm i api-request-logger`

## Usage

##### import the module

`const apiLogger = require('api-request-logger');`

`app.use(apiLogger)` add this line before the routes in the entry file


Logging format 

```json
{
  "requestUrl": "http://localhost:2000/serviceName/v1/users/list",
  "requestMethod": "GET",
  "userAgent": "PostmanRuntime/7.28.4",
  "xRequestId": "f584d507e38a9f3a2e88b02e7ab7e81b",
  "apiLatency": 51.71452800184488,
  "time": "2023-06-09T05:54:45.901Z",
  "reqBody": {},
  "env": "local",
  "msg": "api_stats"
}
```
