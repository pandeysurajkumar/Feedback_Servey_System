import { Servey } from "../models/servey.models.js";
import { User } from "../models/users.models.js";
import { asynchandler } from "../utils/asynchandeler.js";
import ApiError from "../utils/ApiError.js";
import { Question } from "../models/questions.models.js";

const showquestions = asynchandler(async (req, res, next) => {
  const serveyId = req.params.serveyId;
  if (!serveyId) {
    return next(new ApiError(400, "Please provide servey id"));
  }
  // 2. Get the servey details
  const servey = await Servey.findById(serveyId).populate("questions");
  console.log(servey);
  if (!servey) {
    return next(new ApiError(400, "Servey not found"));
  }
  // 3. Get the questions from the servey
  const questions = servey.questions.map((question) => {
    return {
      id: question._id,
      text: question.text,
      type: question.type,
      options: question.options,
    };
  });
  console.log(questions);
  // 4. Return the questions
  res.status(200).json({
    status: "success",
    data: {
      questions,
    },
  });
}); // show questions based on id of the servey in admin panel

const deletequestion = asynchandler(async (req, res, next) => {
  const questionId = req.params.questionId;
  if (!questionId) {
    return next(new ApiError(400, "Please provide question id"));
  }
  // 2. Get the question details

  // Delete reference from servey
  const deleteref = await Servey.updateMany(
    { questions: questionId },
    { $pull: { questions: questionId } }
  );
  console.log(deleteref);
  if (!deleteref) {
    return next(new ApiError(400, "Servey not found"));
  }

  const question = await Question.findByIdAndDelete(questionId);
  if (!question) {
    return next(new ApiError(400, "Question not found"));
  }
  // 3. Return the question
  res.status(200).json({
    status: "success",
    data: null,
  });
}); // delete questions based on id of the question in admin panel of survey and reference in servey
export { showquestions, deletequestion };
