import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("DB connected success");
}).catch((err) => console.log(`Error: ${err}`));

const app = express();

app.listen(3000, () => console.log("Server running"));
