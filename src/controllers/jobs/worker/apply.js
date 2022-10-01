// Apply for a job with a specific Job Id.
// TODO: Add check for workerTag match & make sure user hasn't applied for it already.

const Job = require("models/Job");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({ _id: mongoose.Types.ObjectId(jobId) });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const hasAppliedAlready = req.user.jobsApplied.exists({
    job: mongoose.Types.ObjectId(jobId),
  });
  if (hasAppliedAlready)
    return res.status(400).json({ success: false, error: "already-applied" });

  if (job.appliedWorkers.length >= job.totalWorkersRequired)
    return res.status(400).json({ success: false, error: "job-already-full" });

  const applicationTime = new Date();

  req.user.jobsApplied.push({
    job,
    appliedAt: applicationTime,
    accepted: false,
  });
  await req.user.save();

  job.appliedWorkers.push({
    worker: req.user,
    appliedAt: applicationTime,
  });
  await job.save();

  if (job.appliedWorkers.length >= job.totalWorkersRequired) {
    // Job Full. Mark as accepted.
  }

  return res.json({ success: true });
};
