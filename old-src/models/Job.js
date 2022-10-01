const mongoose = require("mongoose");
const config = require("server-config");
const Application = require("./Application");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },

    totalWorkersRequired: { type: Number, required: true },

    location: { type: String, required: true },

    payPerHour: { type: Number, required: true },
    hoursPerDay: { type: Number, required: true },

    employer: { type: mongoose.Types.ObjectId, ref: "User" },

    // openingExpiresOn: { type: Date, required: true },

    startsOn: { type: Date, required: true },
    endsOn: { type: Date, required: true },

    workerTagRequired: {
      type: String,
      enum: config.WORKER_TAGS,
      required: true,
    },

    appliedWorkers: [{ type: mongoose.Types.ObjectId, ref: "Application" }],

    // comments: [Comment], // recursive comments
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
