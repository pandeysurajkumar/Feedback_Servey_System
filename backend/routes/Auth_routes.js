import { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../middleware/Auth.middleware.js";
import {
  login,
  logout,
  signup,
  userdetails,
  checkConnection,
  changePassword,
} from "../controllers/Auth.controller.js";
import { verifyJwt } from "../middleware/Protected.middleware.js";

const router = Router();
router.route("/signup").post(signupValidation, signup);
router.route("/login").post(loginValidation, login);
router.route("/logout").get(verifyJwt, logout);
router.route("/checkconnection").get(checkConnection);

router.route("/protected").get(verifyJwt, userdetails);
router.route("/auth-check").get(verifyJwt, (req, res) => {
  res.status(200).json({ message: "You are logged in", loggedin: "true" });
});
router.route("/change-password").post(verifyJwt, changePassword);

export { router as Auth_routes };
