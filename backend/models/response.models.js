import mongoose from "mongoose";
const ResponseSchema = mongoose.Schema({
  serveyid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servey",
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: [
    {
      questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Response = mongoose.model("Response", ResponseSchema);
