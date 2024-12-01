import express from "express";
import cors from "cors";
import router from "./router";
import { connectDB } from "./config/db";
import "dotenv/config";
import { corsConfig } from "./config/cors";
connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
