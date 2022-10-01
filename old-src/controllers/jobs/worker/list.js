// Get List of suitable jobs for the workerTag

const Job = require("models/Job");

module.exports = async (req, res) => {
  const jobs = await Job.find({
    workerTagRequired: req.user.workerTag,
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
