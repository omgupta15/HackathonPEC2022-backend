// Get List of suitable jobs for the workerTag

const mongoose = require("mongoose");

// Models
const Application = require("models/Application");
const Job = require("models/Job");

module.exports = async (req, res) => {
  let { filter, searchTerm } = req.query;

  if (!filter) filter = "all";

  const validFilters = ["all", "my-tag", "applied", "search"];

  if (!validFilters.includes(filter))
    return res.status(400).json({ success: false, error: "invalid-filter" });

  if (filter === "search") {
    if (!searchTerm || typeof searchTerm !== "string")
      return res
        .status(400)
        .json({ success: false, error: "invalid-search-term" });
  }

  let jobs;
  if (filter === "all") jobs = await Job.find();
  else if (filter === "my-tag")
    jobs = await Job.find({
      workerTagRequired: req.user.workerTag,
    });
  else if (filter === "applied") {
    const applications = await Application.find({
      worker: mongoose.Types.ObjectId(req.user._id),
    }).populate("job");
    jobs = applications.map((application) => application.job);
  } else if (filter === "search") {
    jobs = await Job.find({
      $or: [
        { jobTitle: { $match: new RegExp(searchTerm, "i") } },
        { workerTagRequired: { $match: new RegExp(searchTerm, "i") } },
      ],
    });
  }

  const jobsList = [];
  for (let job of jobs) {
    if (
      filter !== "applied" &&
      job.totalWorkersRequired <= job.appliedWorkersCount
    )
      continue;

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
