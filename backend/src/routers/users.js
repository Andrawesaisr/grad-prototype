import express from "express";
import User from "../models/User.js";
import Auth from "../middleware/auth.js";
const router = express.Router();

// sign up
router.post("/user/signup", async (req, res) => {
  const { email, username } = req.body;
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.send("This email is already exist!!");
  }
  const checkUsername = await User.findOne({ username });
  if (checkUsername) {
    return res.send("This username is already exist!!");
  }
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send("Sign up Successfully");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// signin
router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("This email is not existing !!");
  }
  if (user.password !== password) {
    return res.send("The password is not correct!!");
  }
  try {
    const token = await user.generateAuthToken();
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send("Signed in Successfull");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

//signout
router.post("/user/signout", Auth, async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.status(200).send("signed out successfully");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
