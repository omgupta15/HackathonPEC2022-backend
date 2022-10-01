// Get a job with a specific Job Id.
// TODO: Add check for workerTag match.

const Job = require("models/Job");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({ _id: mongoose.Types.ObjectId(jobId) });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const hasApplied = req.user.jobsApplied.exists({
    job: mongoose.Types.ObjectId(jobId),
  });

  const jobDetails = {
    jobTitle: job.jobTitle,
    description: job.description,

    appliedWorkersCount: job.appliedWorkers.length,
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
