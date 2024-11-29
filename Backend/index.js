const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-com-react-4b613-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

const app = express();

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

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailQuery = await db
      .collection("signup")
      .where("email", "==", email)
      .get();
    if (emailQuery.empty) {
      res.status(400).send({ message: "Please Enter Correct Email" });
    }
    const userDoc = emailQuery.docs[0];
    const userData = userDoc.data();

    if (userData.password === password) {
      res.status(200).json({ message: "Sign in successful!", user: userData });
    } else {
      res.status(400).json({
        message:
          "Your authentication info is wrong, please enter correct details.",
      });
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post("/api/addProduct", (req, res) => {
  try {
    db.collection("newProduct").add(req.body);
    res.status(200).send({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const snapshot = await db.collection("newProduct").get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/api/getCategoryProducts/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const snapshot = await db
      .collection("newProduct")
      .where("category", "==", category)
      .get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
