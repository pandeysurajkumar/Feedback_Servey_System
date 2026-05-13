import {Router} from "express";
import {createServey, addQustions,getServeys,showsurveybyId} from "../controllers/Servey.controller.js";
import {verifyJwt} from "../middleware/Protected.middleware.js";
import { showquestions,deletequestion } from "../controllers/question.controller.js";

const router = Router();
router.route("/profile/questions/:serveyId").get(verifyJwt,showquestions);
router.route("/profile/delete-questions/:questionId").delete(verifyJwt,deletequestion);

export {router as Question_routes};