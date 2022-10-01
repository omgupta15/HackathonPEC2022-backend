const FIREBASE_API_KEY = "AIzaSyBV3TuwXqz1pxu2JHxidNYXvt7BOn_DB7U";
const axios = require("axios").default;

const admin = require("firebase-admin");
const firebaseKey = require("./keys/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
});

const createIdTokenfromCustomToken = async (uid) => {
  try {
    const customToken = await admin.auth().createCustomToken(uid);

    const res = await axios({
      url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FIREBASE_API_KEY}`,
      method: "post",
      data: {
        token: customToken,
        returnSecureToken: true,
      },
      json: true,
    });

    console.log(res.data);

    return res.data.idToken;
  } catch (e) {
    console.log(e);
  }
};

createIdTokenfromCustomToken("KsUQbtYJrefmZFqxIadsZu9l7wg1")
  .then((response) => console.log(response))
  .catch((err) => console.log("Error:", err));

// console.log(JSON.stringify(require("./keys/firebase.json")));
