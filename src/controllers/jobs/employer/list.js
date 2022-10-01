// Get List of Jobs created by Employer

const Job = require("models/Job");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const jobs = await Job.find({
    employer: mongoose.Types.ObjectId(req.user._id),
  });

  const jobsList = [];
  for (let job of jobs) {
    jobsList.push({
      jobTitle: job.jobTitle,

      location: job.location,

      payPerHour: job.payPerHour,
      hoursPerDay: job.hoursPerDay,

      workerTagRequired: job.workerTagRequired,

      startsOn: job.startsOn,
      endsOn: job.endsOn,
    });
  }

  return res.json({ success: true, jobs: jobsList });
};
