import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import protectedUserRoutes from "./routes/protectedUserRoutes.js";
import adminMiddleware from "./middleware/authMiddleware.js";
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/users", adminMiddleware, protectedUserRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
