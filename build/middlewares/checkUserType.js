"use strict";

module.exports = function (allowedUserType) {
  return function (req, res, next) {
    if (req.user.userType !== allowedUserType) return res.status(400).json({
      success: false,
      error: "invalid-user-type"
    });
    next();
  };
};