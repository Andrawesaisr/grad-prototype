import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routers/users.js";
import adminRouter from "./src/routers/admin.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "./config/.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/octet-stream", limit: "20mb" }));
app.use(userRouter);
app.use(adminRouter);
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(`${mongo_uri}/grad_prototype`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(port, () => {
  console.log(`the app is running on port ${port}`);
});
