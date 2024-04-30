import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRouter from "./routes/users.js";
import recipesRouter from "./routes/recipes.js";

config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "projectmern" })
  .then((c) => {
    console.log(`DB Connected To ${c.connection.host}`);
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Api working successfully",
    success: true,
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`App listening on port ${process.env.PORT}`);
});
