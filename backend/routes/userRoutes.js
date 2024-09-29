import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists." });

    const newUser = new User({ name, email, password, age });
    await newUser.save();

    res.status(201).send({ message: "sing up successful.", user: newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ message: "Invalid email or password." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid email or password." });

    const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
    res.status(200).send({ token, user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
