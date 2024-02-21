import express from "express";
import Admin from "../models/Admin.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

// signin
router.post("/admin/signin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.send("This email is not existing !!");
  }
  if (admin.password !== password) {
    return res.send("The password is not correct!!");
  }
  try {
    const token = await admin.generateAuthToken();
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send("Signed in Successfull");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

//signout
router.post("/admin/signout", adminAuth, async (req, res) => {
  try {
    req.admin.token = "";
    await req.admin.save();
    res.status(200).send("signed out successfully");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
