import jwt from "jsonwebtoken";
import User from "../models/User.js";
const Auth = async (req, res, next) => {
  try {
    console.log("secret key", process.env.SECRET_KEY);
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decode._id, token: token });
    if (!user) {
      return res.send("this user is not Authorized");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

export default Auth;
