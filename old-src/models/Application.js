const mongoose = require("mongoose");
const config = require("server-config");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Types.ObjectId, ref: "Job" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },

    appliedAt: Date,

    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
