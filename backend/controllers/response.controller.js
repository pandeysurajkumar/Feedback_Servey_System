import { Response } from "../models/response.models.js";
import ApiError from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandeler.js";
import { Servey } from "../models/servey.models.js";
import { Question } from "../models/questions.models.js";

const addResponse = asynchandler(async (req, res, next) => {
  try {
    const { serveyid, answer } = req.body;
    const userid = req.user.id;
    console.log(serveyid, answer, userid);
    const formattedAnswers = Object.entries(answer).map(
      ([questionid, ans]) => ({
        questionid,
        answer: String(ans), // ensure it's stored as string
      })
    );

    // Basic validation
    if (
      !serveyid ||
      !Array.isArray(formattedAnswers) ||
      formattedAnswers.length === 0
    ) {
      return next(
        new ApiError(400, "Please provide survey ID and at least one answer")
      );
    }

    // Check if survey exists
    const servey = await Servey.findById(serveyid);
    if (!servey) {
      return next(new ApiError(404, "Survey not found"));
    }

    // Check for existing response by user
    const existingResponse = await Response.findOne({ serveyid, userid });
    if (existingResponse) {
      return next(
        new ApiError(
          400,
          "You have already submitted a response for this survey"
        )
      );
    }

    // Optional: Validate that all answers have both questionid and answer fields
    for (const a of formattedAnswers) {
      if (!a.questionid || typeof a.answer !== "string") {
        return next(
          new ApiError(
            400,
            "Each answer must include a questionid and answer text"
          )
        );
      }
    }

    // Create and save response
    const response = await Response.create({
      serveyid,
      userid,
      answer: formattedAnswers,
    });

    res.status(201).json({
      message: "Response submitted successfully",
      responseId: response._id,
    });
  } catch (error) {
    console.error("Error in submitting response:", error);
    return next(new ApiError(500, "Error in submitting response"));
  }
});
const showResponse = asynchandler(async (req, res, next) => {
  try {
    console.log("Fetching responses for survey ID:", req.params.surveyId); // Debugging line
    const { surveyId } = req.params;

    console.log("Survey ID:", surveyId); // Debugging line

    // Validate survey ID
    if (!surveyId) {
      return next(new ApiError(400, "Survey ID is required"));
    }

    // Check if the survey exists
    const survey = await Servey.findById(surveyId);
    if (!survey) {
      return next(new ApiError(404, "Survey not found"));
    }

    // Find responses for the survey
    const responses = await Response.find({ serveyid: surveyId })
    //   .populate("userid", "name email") // populate user info
      .populate("answer.questionid", "text type options"); // populate question info, fixed "questionid" to "questionId"

    if (responses.length === 0) {
      return res.status(200).json({
        message: "No responses found for this survey",
        responses: [],
      });
    }

    res.status(200).json({
      message: "Responses fetched successfully",
      responses,
    });
  } catch (error) {
    next(error);
  }
});

export { addResponse, showResponse };
