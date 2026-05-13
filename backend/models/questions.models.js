import mongoose from "mongoose";
const QuestionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["multiplechoice", "text", "rating"],
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
});

export const Question = mongoose.model("Question", QuestionSchema);
