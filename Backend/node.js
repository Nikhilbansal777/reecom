const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "150mb" }));
app.use(express.json());

const URI =
  "mongodb+srv://nikhilsarojbansal:nikhilbansal@cluster0.ytyzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: String, required: true },
});

const signupSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
const Signup = mongoose.model("Signup", signupSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Admin = mongoose.model("Admin", adminSchema);

app.post("/api/addProduct", async (req, res) => {
  const { productName, price, category, description, image } = req.body;

  const newProduct = new Product({
    productName,
    price,
    category,
    description,
    image,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Error saving product" });
  }
});

app.post("/api/saveProductInCart", async (req, res) => {
  const { productName, price, category, description, email, image, productId } =
    req.body;

  try {
    const existingCartItem = await Cart.findOne({ email, productId });
    if (existingCartItem) {
      return res.status(400).json({ message: "Product already in cart" });
    }
    const cartProduct = new Cart({
      productName,
      price,
      category,
      description,
      image,
      productId,
      email,
    });
    const saveProduct = await cartProduct.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error saving product in cart" });
  }
});

app.get("/api/getCartProducts/:email", async (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      res.status(400).json({ message: "Please Enter Email" });
    }
    const cartProducts = await Cart.find({ email });
    res.status(200).send(cartProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting cart product" });
  }
});

app.delete("/api/deleteCartProduct/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cartProduct = await Cart.findByIdAndDelete(id);
    if (!cartProduct) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting cart product" });
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ message: "Error getting products" });
  }
});

app.delete("/api/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.put("/api/editProduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { productName, price, category, description, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        price,
        category,
        description,
        image,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error editing product" });
  }
});

app.get("/api/getCategoryProducts/:category", async (req, res) => {
  const category = req.params.category;
  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const products = await Product.find({ category });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({ message: "Error getting Category wise products" });
  }
});

app.get("/api/getProductById/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ message: "Error getting product by Id" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { fullName, email, contact, password, confirmPassword } = req.body;
  try {
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    const newUser = new Signup({
      fullName,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "your_jwt_secret", {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error signing up" });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error Signin in" });
  }
});

app.post("/api/adminSignup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "your_jwt_secret", {
      expiresIn: "24h",
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error signing up" });
  }
});

app.post("/api/adminSignin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Admin Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error in admin Sign in" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
