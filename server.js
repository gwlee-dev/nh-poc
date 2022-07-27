import "dotenv/config";
import express from "express";
import morgan from "morgan";

const { SERVER_PORT } = process.env;

const app = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + `/src/view`);
app.use(morgan("dev"));

app.use("/assets", express.static("client/assets"));
app.use("/css", express.static("client/css"));
app.use("/fonts", express.static("client/fonts"));
app.use("/js", express.static("client/js"));
app.get("/", (req, res) => res.render("index"));

app.listen(
    SERVER_PORT,
    console.log(
        `\n\n\n===============================\nServer Listening on: http://localhost:${SERVER_PORT}`
    )
);
