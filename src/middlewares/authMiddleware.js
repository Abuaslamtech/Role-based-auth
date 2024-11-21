import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;

  if (!authHeaders || !authHeaders.toLowerCase().startsWith("bearer ")) {
    res.status(400).json({ message: "Invalid authorization header" });
  }
  const token = authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token is provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.header = decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: " token has expired", err });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: " Invalid token", err });
    }
    return res
      .status(500)
      .json({ message: "Internal server error during token verification" });
  }
  next();
};

export default verifyToken;
