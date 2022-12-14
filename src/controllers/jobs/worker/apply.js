// Apply for a job with a specific Job Id.
// TODO: Add check for workerTag match & make sure user hasn't applied for it already.

const mongoose = require("mongoose");

// Models
const Application = require("models/Application");
const Job = require("models/Job");

module.exports = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({ _id: mongoose.Types.ObjectId(jobId) });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const hasAppliedAlready = await Application.exists({
    job: mongoose.Types.ObjectId(jobId),
    worker: mongoose.Types.ObjectId(req.user._id),
  });
  if (hasAppliedAlready)
    return res.status(400).json({ success: false, error: "already-applied" });

  if (job.appliedWorkersCount >= job.totalWorkersRequired)
    return res.status(400).json({ success: false, error: "job-already-full" });

  const application = new Application({
    job: job._id,
    worker: req.user._id,

    appliedAt: new Date(),
    accepted: false,
  });
  await application.save();

  job.appliedWorkersCount++;
  await job.save();

  if (job.appliedWorkersCount >= job.totalWorkersRequired) {
    await Application.updateMany(
      { job: job._id },
      { $set: { accepted: true } }
    );
  }

  return res.json({ success: true });
};
