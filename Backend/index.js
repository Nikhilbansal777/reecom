const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

// Path to your service account key file
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-com-react-4b613-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

const app = express();

// Increase the payload limit before other middlewares
app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(cors({ origin: true }));

app.post("/api/signup", async (req, res) => {
  try {
    const data = req.body;
    const email = req.body.email;
    const emailQuery = await db
      .collection("signup")
      .where("email", "==", email)
      .get();

    if (!emailQuery.empty) {
      res.status(400).send("Email already exist");
    } else {
      await db.collection("signup").add(data);
      res.status(200).send("User Add Succesfully");
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
