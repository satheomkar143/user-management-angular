import jwt from "jsonwebtoken";

// Middleware for verifying that the logged-in user is an admin
const adminMiddleware = (req, res, next) => {
  // Get token from the request header
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token.split(" ")[1], "secretKey");
    req.user = decoded;

    // Check if the user has admin privileges
    if (
      req.user.privileges === "admin" ||
      req.user.privileges === "superadmin"
    ) {
      next(); // Allow access to the route
    } else {
      res.status(403).send({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

export default adminMiddleware;
