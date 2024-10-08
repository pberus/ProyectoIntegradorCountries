const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

server.use(router);

module.exports = server;
