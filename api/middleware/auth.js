const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the header
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure your JWT secret is correct
    req.firebaseUid = decoded.firebaseUid; // Attach firebaseUid to the request
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { verifyToken };
