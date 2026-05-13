import {Router} from "express";
import {createServey, addQustions,getServeys,showsurveybyId , surveydatabyId} from "../controllers/Servey.controller.js";
import {verifyJwt} from "../middleware/Protected.middleware.js";
import { addResponse, showResponse } from "../controllers/response.controller.js";

const router = Router();

router.route("/:serveyId").get(verifyJwt,surveydatabyId);
router.route('/serveyId').post(verifyJwt,addResponse);
router.route('/serveyId/:surveyId').get(verifyJwt,showResponse);
export {router as Response_routes};