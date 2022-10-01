const Joi = require("joi");
const Job = require("models/Job");
const config = require("server-config");

const schema = Joi.object({
  jobTitle: Joi.string().min(10).max(50).required(),
  description: Joi.string().min(100).max(5000).required(),

  totalWorkersRequired: Joi.number().integer().min(1).max(10000).required(),

  location: Joi.string().required(),

  payPerHour: Joi.number().integer().min(1).required(),
  hoursPerDay: Joi.number().integer().min(1).max(24).required(),

  // openingExpiresOn: Joi.date().greater("now").required(),

  startsOn: Joi.date().greater("now").required(),
  endsOn: Joi.date().greater(Joi.ref("startsOn")).required(),

  workerTagRequired: Joi.string()
    .valid(...config.WORKER_TAGS)
    .required(),
});

module.exports = async (req, res) => {
  const { jobId, formData } = req.body;

  if (!jobId)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  const job = await Job.findOne({
    _id: mongoose.Types.ObjectId(jobId),
    employer: mongoose.Types.ObjectId(req.user._id),
  });

  if (!job)
    return res.status(404).json({ success: false, error: "invalid-job-id" });

  let validationResponse;
  try {
    validationResponse = await schema.validateAsync(formData);
  } catch (validationError) {
    console.log(
      "[jobs/employer/create]",
      "formData validation error:",
      validationError
    );
    return res.status(400).json({ success: true, error: "invalid-data" });
  }

  if (validationResponse.error || !validationResponse.value) {
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
  job.totalWorkersRequired = updatedData.totalWorkersRequired;
  job.location = updatedData.location;
  job.payPerHour = updatedData.payPerHour;
  job.hoursPerDay = updatedData.hoursPerDay;
  // job.openingExpiresOn = updatedData.openingExpiresOn;
  job.startsOn = updatedData.startsOn;
  job.endsOn = updatedData.endsOn;
  job.workerTagRequired = updatedData.workerTagRequired;

  if (job.appliedWorkers.length >= job.totalWorkersRequired) {
    // const workersToRemove = job.appliedWorkers.slice(job.totalWorkersRequired);

    // workersToRemove.populate();
    // for (let worker of workersToRemove) {
    // }

    job.appliedWorkers = job.appliedWorkers.slice(0, job.totalWorkersRequired);
  }

  await job.save();

  return res.json({ success: true });
};
