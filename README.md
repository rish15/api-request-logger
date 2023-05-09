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
