import mongoose from "mongoose";
const FeedbackSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serveyid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Servey",
        required:true
    },
   comments:{
         type:String
    },
    ratings:{
        type:Number,
        required:true
    }
   });
export const Feedback = mongoose.model("Feedback", FeedbackSchema);