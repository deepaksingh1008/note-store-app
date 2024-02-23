import JWT from "jsonwebtoken";
import { userModel } from "../../modules/user/model/user-schema.js";

export const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).send({ success: false, message: "Invalid token" });
    }
    //  console.log(req.user);
    req.user = decode;
    // console.log(req);
    next();
  } catch (error) {
    console.log(error);
  }
};
