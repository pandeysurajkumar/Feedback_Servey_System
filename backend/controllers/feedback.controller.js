import {Feedback} from '../models/feedback.models.js';
import ApiError from '../utils/ApiError.js';
import { asynchandler } from '../utils/asynchandeler.js';

const giveFeedback = asynchandler(async (req, res, next) => {
    try {
        const {userid, serveyid, comments, ratings} = req.body;
        if (!userid || !serveyid || !comments || !ratings) {
            return next(new ApiError(400, "Please provide all the details"));
        }
        const feedback = await Feedback.create({
            userid,
            serveyid,
            comments,
            ratings
        });
        res.status(201).json({
            id: feedback._id,
            userid: feedback.userid,
            serveyid: feedback.serveyid,
            comments: feedback.comments,
            ratings: feedback.ratings
        });
    } catch (error) {
        return next(new ApiError(500, "Error in giving feedback"));
    }
});

export { giveFeedback };