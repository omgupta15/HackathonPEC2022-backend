const Job = require("models/Job");

module.exports = async (req, res) => {
  const { searchTerm } = req.body;

  const searchResult = await Job.find({
    $or: [
      { jobTitle: { $search: searchTerm, $caseSensitive: false } },
      { workerTagRequired: { $search: searchTerm, $caseSensitive: false } },
    ],
  });

  const jobsList = [];
  for (let job of searchResult) {
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
