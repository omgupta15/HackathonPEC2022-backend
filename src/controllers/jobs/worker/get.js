// Get a job with a specific Job Id.
// TODO: Add check for workerTag match.

const mongoose = require("mongoose");

// Models
const Job = require("models/Job");
const Application = require("models/Application");

module.exports = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({ _id: mongoose.Types.ObjectId(jobId) });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const hasApplied = await Application.exists({
    job: mongoose.Types.ObjectId(jobId),
    worker: mongoose.Types.ObjectId(req.user._id),
  });

  const jobDetails = {
    jobId: job._id,

    jobTitle: job.jobTitle,
    description: job.description,

    appliedWorkersCount: job.appliedWorkersCount,
    totalWorkersRequired: job.totalWorkersRequired,

    location: job.location,

    payPerHour: job.payPerHour,
    hoursPerDay: job.hoursPerDay,

    openingExpiresOn: job.openingExpiresOn,

    startsOn: job.startsOn,
    endsOn: job.endsOn,

    workerTagRequired: job.workerTagRequired,

    applied: hasApplied,
  };
  return res.json({ success: true, job: jobDetails });
};
