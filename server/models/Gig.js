import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ["Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation", "Writing & Translation", "Music & Audio", "Business", "Data"],
      required: true
    },
    skills: {
      type: [String], // Array of skills
      required: false,
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
