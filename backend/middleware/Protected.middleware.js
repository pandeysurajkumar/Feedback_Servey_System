import { asynchandler } from "../utils/asynchandeler.js";
import jwt from "jsonwebtoken";
import Error from "../utils/ApiError.js";

const verifyJwt = asynchandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      console.log("Token not found");
      return next(new Error(401, "Unauthorized You are not Valid User"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new Error(401, "Unauthorized You are not Valid User"));
      }
      req.user = user;
      
      next();
    });
  } catch (error) {
    throw new Error(401, "Unauthorized You are not logged in");
  }
});
export { verifyJwt };
