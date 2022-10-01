module.exports = async (req, res) => {
  const userDetails = {
    phoneNumber: req.user.phoneNumber,

    name: req.user.name,
    userType: req.user.userType,

    // Workers
    workerTag: req.user.workerTag,
  };

  return res.json({
    success: true,
    user: userDetails,
  });
};
