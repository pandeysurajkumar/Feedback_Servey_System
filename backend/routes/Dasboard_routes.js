import {Router} from 'express';
import { verifyJwt } from '../middleware/Protected.middleware.js';
import { userdetails } from '../controllers/Auth.controller.js';

const router = Router();
router.route('/dashboard').get(verifyJwt, userdetails);

export { router as Dashboard_routes };