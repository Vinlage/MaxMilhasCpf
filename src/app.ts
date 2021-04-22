import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cpfRoutes from "./routes/cpfRoutes";
import { connect } from "./connection";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cpfRoutes);

connect(app);

export { app }