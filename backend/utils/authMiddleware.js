const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from either "Authorization" header or "x-auth-token" header
  let token = req.header("Authorization") || req.header("x-auth-token");

  console.log("Token received:", token); // Debugging: Check if token is received

  // Check if token is provided in either header
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // If token is in "Authorization" header, strip the "Bearer" prefix if it exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft(); // Removes "Bearer " from the token
  }

  console.log("Token after Bearer strip:", token); // Debugging: Check token after strip

  // Verify the token
  try {
    const decoded = jwt.verify(token, "123456789");
    req.user = decoded; // Attach the decoded user info to the request object
    next();
  } catch (err) {
    console.error("Token verification error:", err); // Debugging: Check token verification error
    res.status(401).json({ message: "Token is not valid" });
  }
};
