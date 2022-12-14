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

  await Application.deleteMany({ job: mongoose.Types.ObjectId(jobId) });
  await Job.deleteOne({ _id: mongoose.Types.ObjectId(jobId) });

  return res.json({ success: true });
};
