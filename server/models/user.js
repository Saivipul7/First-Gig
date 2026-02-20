import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
      required: true
    },

    category: {
      type: String,
      enum: ["Graphics & Design", "Programming & Tech", "Digital Marketing", "Video & Animation", "Writing & Translation", "Music & Audio", "Business", "Data"],
      required: function () { return this.role === 'freelancer'; }
    },

    /* ================================
       🔥 Freelancer Fields
    ================================ */

    profession: {
      type: String,
      trim: true
    },

    skills: {
      type: [String],
      default: []
    },

    experience: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      trim: true
    }

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
