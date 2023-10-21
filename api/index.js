import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 3000;
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB connected success");
  })
  .catch((err) => console.log(`Error: ${err}`));

const app = express();
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
