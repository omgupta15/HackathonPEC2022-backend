// Get details of a Job created by Employer and list all applied candidates.

const Job = require("models/Job");
const mongoose = require("mongoose");

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

  job.populate("appliedWorkers");

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

    appliedWorkers: job.appliedWorkers.map((data) => ({
      name: data.worker.name,
      phoneNumber: data.worker.phoneNumber,
      workerTag: data.worker.workerTag,
      appliedAt: data.appliedAt,
    })),
  };
  return res.json({ success: true, job: jobDetails });
};
