"use strict";

var mongoose = require("mongoose");

var config = require("../server-config");

var jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalWorkersRequired: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  payPerHour: {
    type: Number,
    required: true
  },
  hoursPerDay: {
    type: Number,
    required: true
  },
  employer: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  openingExpiresOn: {
    type: Date,
    required: true
  },
  startsOn: {
    type: Date,
    required: true
  },
  endsOn: {
    type: Date,
    required: true
  },
  workerTagRequired: {
    type: String,
    "enum": config.WORKER_TAGS,
    required: true
  },
  appliedWorkers: [{
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    appliedAt: Date
  }] // comments: [Comment], // recursive comments

}, {
  timestamps: true
});
var Job = mongoose.model("Job", jobSchema);
module.exports = Job;