const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/error/customErrorHandler");
const path = require("path");
//Dotenv config ve env
dotenv.config({
  path: "./config/env/config.env",
});

//  mongo db connection
connectDatabase();

const app = express();

//epbress body middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routhers middle ware
app.use("/api", routers);

// Error handler
app.use(customErrorHandler);
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);
app.listen(PORT, () => {
  console.log(`Server startet PORT ${PORT} : ${process.env.NODE_ENV}`);
});
