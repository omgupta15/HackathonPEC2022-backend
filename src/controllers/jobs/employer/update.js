const mongoose = require("mongoose");
const Joi = require("joi");

const config = require("server-config");

const Job = require("models/Job");

const schema = Joi.object({
  jobTitle: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(5000).required(),

  totalWorkersRequired: Joi.number().integer().min(1).max(10000).required(),

  location: Joi.string().required(),

  payPerHour: Joi.number().integer().min(1).required(),
  hoursPerDay: Joi.number().integer().min(1).max(24).required(),

  // openingExpiresOn: Joi.date().greater("now").required(),

  startsOn: Joi.date().min("now").required(),
  endsOn: Joi.date().greater(Joi.ref("startsOn")).required(),

  workerTagRequired: Joi.string()
    .valid(...config.WORKER_TAGS)
    .required(),
});

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

  const formData = req.body;

  let validationResponse;
  try {
    validationResponse = schema.validate(formData);
  } catch (validationError) {
    console.log(
      "[jobs/employer/create]",
      "formData validation error:",
      validationError
    );
    return res.status(400).json({ success: true, error: "invalid-data" });
  }

  console.log("validationResponse:", validationResponse);

  if (
    !validationResponse ||
    validationResponse.error ||
    !validationResponse.value
  ) {
    console.log(
      "[jobs/employer/create]",
      "formData validation error:",
      validationResponse
    );
    return res.status(400).json({ success: true, error: "invalid-data" });
  }

  const updatedData = validationResponse.value;

  job.jobTitle = updatedData.jobTitle;
  job.description = updatedData.description;

  if (updatedData.totalWorkersRequired >= job.totalWorkersRequired)
    job.totalWorkersRequired = updatedData.totalWorkersRequired;

  job.location = updatedData.location;

  if (updatedData.payPerHour >= job.payPerHour)
    job.payPerHour = updatedData.payPerHour;
  if (updatedData.hoursPerDay >= job.hoursPerDay)
    job.hoursPerDay = updatedData.hoursPerDay;

  // job.openingExpiresOn = updatedData.openingExpiresOn;
  job.startsOn = updatedData.startsOn;
  job.endsOn = updatedData.endsOn;
  job.workerTagRequired = updatedData.workerTagRequired;

  await job.save();

  return res.json({ success: true });
};
