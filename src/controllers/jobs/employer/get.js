// Get details of a Job created by Employer and list all applied candidates.

const mongoose = require("mongoose");

// Models
const Application = require("models/Application");
const Job = require("models/Job");

module.exports = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({
    _id: mongoose.Types.ObjectId(jobId),
    employer: mongoose.Types.ObjectId(req.user._id),
  });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const appliedWorkers = await Application.find({
    job: mongoose.Types.ObjectId(jobId),
  }).populate("user");

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

    appliedWorkers: appliedWorkers.map((data) => ({
      name: data.worker.name,
      phoneNumber: data.worker.phoneNumber,
      workerTag: data.worker.workerTag,
      appliedAt: data.appliedAt,
    })),
  };
  return res.json({ success: true, job: jobDetails });
};
