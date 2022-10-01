module.exports = (allowedUserType) => {
  return (req, res, next) => {
    if (req.user.userType !== allowedUserType)
      return res
        .status(400)
        .json({ success: false, error: "invalid-user-type" });

    next();
  };
};
