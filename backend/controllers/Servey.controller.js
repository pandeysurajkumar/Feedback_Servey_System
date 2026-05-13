import { Servey } from "../models/servey.models.js";
import { User } from "../models/users.models.js";
import { asynchandler } from "../utils/asynchandeler.js";
import ApiError from "../utils/ApiError.js";
import { Question } from "../models/questions.models.js";

const createServey = asynchandler(async (req, res, next) => {
  try {
    // Steps to create the servey
    // 1. Get the servey details from the req.body
    const { title, description, startDate, endDate } = req.body;
    if (!title || !description || !startDate || !endDate) {
      return next(new ApiError(400, "Please provide all the details"));
    }
    
    const createdby = req.user.id;
    const userref = await User.findById(createdby);
    console.log(userref);
    if (!createdby) {
      return next(new ApiError(400, "Please login to create servey"));
    }
    // 2. Create the servey
    const servey = await Servey.create({
      title,
      description,
      startDate,
      endDate,
      createdby: userref._id,
    });
    // 3. Send the response
    res.status(201).json({
      id: servey._id,
      title: servey.title,
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Error in creating servey"));
  }
});  // done

const addQustions = asynchandler(async (req, res, next) => {
  try {
    // Steps to add questions
    // 1. Get the question details from the req.body
    const { questionTitle, questionType, options } = req.body;

    if (!questionTitle || !questionType) {
      return next(new ApiError(400, "Please provide all the required details"));
    }

    if (questionType === "multiplechoice" && (!options || !Array.isArray(options) || options.length === 0)) {
      return next(new ApiError(400, "Please provide valid options for the question"));
    }

    // 2. Create the question
    const questionData = {
      text: questionTitle,
      type: questionType,
    };

    if (options && Array.isArray(options)) {
      questionData.options = options;
    }

    const questionObj = await Question.create(questionData);

    // 3. Add the question to the survey
    const serveyId = req.params.serveyId;
    if (!serveyId) {
      return next(new ApiError(400, "Please provide a valid survey ID"));
    }

    const servey = await Servey.findById(serveyId);
    if (!servey) {
      return next(new ApiError(404, "Survey not found"));
    }

    servey.questions.push(questionObj._id);
    await servey.save();

    // 4. Send the response
    res.status(201).json({
      id: questionObj._id,
      text: questionObj.text,
      message: "Question added successfully",
    });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Error in adding questions"));
  }
});

const getServeys = asynchandler(async (req, res, next) => {
    try {
        // Steps to get the serveys
        // 1. Get the serveys
        const serveys = await Servey.find();
        if(!serveys){
            return next(new ApiError(404, "No Serveys found"));
        }

        // 2. Send the response
        res.status(200).json(serveys);
        
    } catch (error) {
        return next(new ApiError(500, "Error in getting Serveys"));
    }
}); // done

const editServeys = asynchandler(async (req, res, next) => {
    try {

        // Steps to edit the serveys
        const serveyId = req.params.serveyId;
        if(!serveyId){
            return next(new ApiError(400, "No servey made by you"));
        }
        
    } catch (error) {
        return next(new ApiError(500, "Error in editing Serveys"));
    }
}); // mongo Pipeline needed;

const deleteServeys = asynchandler(async (req, res, next) => {
    try {

        // Steps to delete the serveys
        const serveyId = req.params.serveyId;
        if(!serveyId){
            return next(new ApiError(400, "No servey made by you"));
        }
        const servey = await Servey.findByIdAndDelete(serveyId);
        if(!servey){
            return next(new ApiError(404, "Servey not found"));
        }
        // 2. Send the response
        res.status(200).json({
            message: "Servey deleted successfully",
        });
        
    } catch (error) {
        return next(new ApiError(500, "Error in deleting Serveys"));
    }
}); // mongo Pipeline needed;
const showsurveybyId = asynchandler(async (req, res, next) => {
 try {
    const user = req.user;
    const serveys = await Servey.find({createdby:user.id});
    if (!serveys) {
      return next(new ApiError(404, "No Serveys found"));
    }
    res.status(200).json(serveys);
    
 } catch (error) {
    return next(new ApiError(500, "Error in getting Serveys"));
  
 }
}); // mongo Pipeline needed;   // show list of survey bades on user id in admin panel

const surveydatabyId = asynchandler(async (req, res, next) => {
    const serveyId = req.params.serveyId;
    if (!serveyId) {
      return next(new ApiError(400, "Please provide a valid survey ID"));
    }
    const servey = await Servey.findById(serveyId).populate("questions");
    if (!servey) {
      return next(new ApiError(404, "Survey not found"));
    }
    res.status(200).json(servey);
}); // mongo Pipeline needed; // show survey details based on servey id in admin panel
export { createServey, addQustions, getServeys ,showsurveybyId,surveydatabyId};