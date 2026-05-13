import mongoose from "mongoose";

const ServeySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timeStamps: true }
);
export const Servey = mongoose.model("Servey", ServeySchema);
