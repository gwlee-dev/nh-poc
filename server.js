import "dotenv/config";
import express from "express";
import morgan from "morgan";

const { SERVER_PORT } = process.env;

const app = express();
app.use(morgan("dev"));

app.use("/", express.static("client"));

app.listen(
    SERVER_PORT,
    console.log(
        `\n\n\n===============================\nServer Listening on: http://localhost:${SERVER_PORT}`
    )
);
