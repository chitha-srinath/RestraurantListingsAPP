import express from "express";
import "dotenv/config";
import CreateResponse from "./utilities/ResponseFormat.js";
import Routes from "./routes/Routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import DbConnection from "./db.js";

const app = express();

app.use(cors());

// db connection

DbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_, res) => {
  let output = CreateResponse(200, "success", "hurray, server is up");
  res.send(output);
});

// all routes
app.use("/v1/api", Routes);

app.listen(process.env.PORT, () =>
  console.log("server is running at port", process.env.PORT)
);
