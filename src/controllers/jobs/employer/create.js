const Joi = require("joi");
const Job = require("models/Job");
const config = require("server-config");

const schema = Joi.object({
  jobTitle: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(5000).required(),

  totalWorkersRequired: Joi.number().integer().min(1).max(10000).required(),

  location: Joi.string().required(),

  payPerHour: Joi.number().integer().min(1).required(),
  hoursPerDay: Joi.number().integer().min(1).max(24).required(),

  // openingExpiresOn: Joi.date().greater("now").required(),

  startsOn: Joi.date().required(),
  endsOn: Joi.date().required(),

  workerTagRequired: Joi.string()
    .valid(...config.WORKER_TAGS)
    .required(),
});

module.exports = async (req, res) => {
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

  const newJob = new Job({
    ...validationResponse.value,
    employer: req.user._id,
  });
  await newJob.save();

  return res.json({ success: true, job: { id: newJob._id } });
};
