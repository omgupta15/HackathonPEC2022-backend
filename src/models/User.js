const mongoose = require("mongoose");
const config = require("server-config");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },

    name: { type: String, default: null },
    userType: { type: String, enum: ["", ...config.USER_TYPES], default: "" },

    // language: { type: String, enum: [...] },

    // Workers
    workerTag: { type: String, enum: ["", ...config.WORKER_TAGS], default: "" },
    jobsApplied: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        appliedAt: Date,
      },
    ],

    // Employers
    jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
