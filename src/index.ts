import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/Routes";
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credencial: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);
dotenv.config();

export default app;
