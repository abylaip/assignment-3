const express = require("express");
const fs = require("fs");
const https = require("https");
const router = require("./routers/router");

const app = express();
app.use(express.json());
app.use("/api", router);

const credentials = {
  key: fs.readFileSync(__dirname + "/ssl/private.pem"),
  cert: fs.readFileSync(__dirname + "/ssl/certificate.pem"),
};

const server = https.createServer(credentials, app);

server.listen(3001, () => {
  console.log(
    "Working on port 3001, TO CHECK ENDPOINTS YOU CAN USE EXPORTED INSOMNIA JSON -> DOCUMENTATION"
  );
});

// import Insomnia_2024-03-04.json to your runtime environment and check endpoints
