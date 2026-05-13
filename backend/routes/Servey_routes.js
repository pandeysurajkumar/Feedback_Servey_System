import {Router} from "express";
import {createServey, addQustions,getServeys,showsurveybyId} from "../controllers/Servey.controller.js";
import {verifyJwt} from "../middleware/Protected.middleware.js";


const router = Router();

router.route("/profile/create-servey").post(verifyJwt,createServey);
router.route("/profile/add-question/:serveyId").post(verifyJwt,addQustions);
router.route("/").get(getServeys);
router.route("/:serveyId").get(verifyJwt,showsurveybyId);






export {router as Servey_routes};
