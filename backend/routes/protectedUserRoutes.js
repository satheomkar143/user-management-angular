import express from "express";
import User from "../models/user.js";
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists." });

    const newUser = new User({ name, email, password, age });
    await newUser.save();

    res
      .status(201)
      .send({ message: "User created successfully.", user: newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
