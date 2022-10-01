const Job = require("models/Job");
const mongoose = require("mongoose");
const config = require("server-config");

module.exports = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({
    _id: mongoose.Types.ObjectId(jobId),
    employer: mongoose.Types.ObjectId(req.user._id),
  });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  await Job.deleteOne({ _id: mongoose.Types.ObjectId(jobId) });

  // TODO: Remove job from user.

  return res.json({ success: true });
};
