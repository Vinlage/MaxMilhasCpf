import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cpfRoutes from "./routes/cpfRoutes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cpfRoutes);

const PORT: string | number = process.env.PORT || 3333;
const uri: string = process.env.URI || `mongodb://localhost:27017/database`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error;
  })
