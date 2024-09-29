import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import adminMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin signup
router.post("/signup", async (req, res) => {
  const { username, email, password, privileges } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).send("Admin already exists.");

    const newAdmin = new Admin({ username, email, password, privileges });
    await newAdmin.save();

    res
      .status(201)
      .send({ message: "admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).send({ message: "Invalid email or password." });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid email or password." });

    const token = jwt.sign(
      { _id: admin._id, privileges: admin.privileges },
      "secretKey",
      { expiresIn: "1h" }
    );
    res.status(200).send({ token, admin, message: "login successful." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Protected admin route (requires login)
router.get("/dashboard", adminMiddleware, async (req, res) => {
  res.status(200).send({ message: "Welcome to the Admin Dashboard." });
});

export default router;
