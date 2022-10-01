// Get List of Jobs created by Employer

const Job = require("models/Job");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const jobs = await Job.find({
    employer: mongoose.Types.ObjectId(req.user._id),
  }).sort({ createdAt: -1 });

  const jobsList = [];
  for (let job of jobs) {
    jobsList.push({
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

      appliedWorkers: [],
    });
  }

  return res.json({ success: true, jobs: jobsList });
};
