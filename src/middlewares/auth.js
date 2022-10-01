const User = require("models/User");
const firebase = require("firebase-admin");
const config = require("server-config");

module.exports = async (req, res, next) => {
  let authHeader = req.get("Authorization"),
    idToken = null;

  if (authHeader) idToken = authHeader.split(" ")[1];

  if (!idToken)
    return res.status(403).json({ success: false, error: "invalid-token" });

  try {
    const firebaseResponse = await firebase.auth().verifyIdToken(idToken);
    console.log(firebaseResponse);

    if (!firebaseResponse?.uid) {
      console.log("Invalid firebaseResponse:", firebaseResponse);
      return res.status(403).json({ success: false, error: "invalid-token" });
    }

    const userId = firebaseResponse.uid;
    const phoneNumber = firebaseResponse.phone_number || "9876543210";

    console.log("userId:", userId);
    console.log("phoneNumber:", phoneNumber);

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({
        firebaseUid: firebaseResponse.uid,
        phoneNumber: phoneNumber,
      });
      await user.save();
    }

    if (!user.name && !config.NON_USER_ALLOWED_PATHS.includes(req.path))
      return res.status(403).json({ success: false, error: "invalid-user" });

    req.user = user;
    next();
  } catch (error) {
    console.log(
      "[firebase.auth().verifyIdToken()]",
      "Error while verifying id token:",
      error
    );

    return res.status(403).json({ success: false, error: "invalid-token" });
  }
};
