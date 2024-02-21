import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routers/users.js";
import adminRouter from "./src/routers/admin.js";
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
mongoose.connect(
  "mongodb+srv://andrew:password111@cluster0.k1lrhbw.mongodb.net/grad_prototype",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.listen(4000, () => {
  console.log(`the app is running on port 4000`);
});
