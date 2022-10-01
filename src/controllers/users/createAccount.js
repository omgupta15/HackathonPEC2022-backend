const firebase = require("firebase-admin");
const config = require("server-config");

module.exports = async (req, res) => {
  let { name, userType } = req.body;
  userType = userType?.toLowerCase();

  console.log(req.body);

  if (req.user.name)
    return res
      .status(400)
      .json({ success: false, error: "account-already-exists" });

  if (
    !name ||
    typeof name !== "string" ||
    !config.USER_TYPES.includes(userType)
  )
    return res.status(400).json({ success: false, error: "invalid-user-data" });

  name = name.slice(0, 50);

  if (userType === "worker") {
    const { workerTag } = req.body;

    if (!config.WORKER_TAGS.includes(workerTag))
      return res
        .status(400)
        .json({ success: false, error: "invalid-worker-tag" });

    req.user.workerTag = workerTag;
  }

  req.user.name = name;
  req.user.userType = userType;
  await req.user.save();

  return res.json({ success: true });
};
