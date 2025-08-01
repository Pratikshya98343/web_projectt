import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(req, res, next) {
  try {
    if (
      req.path === "/api/auth/login" ||
      req.path === "/api/auth/signup" ||
      req.path === "/api/auth/admin/login" ||
      req.path === "/api/auth/admin/register"
    ) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Access denied. No token provided." });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!token) {
      return res.status(401).send({ message: "Access denied. No token provided." });
    }

    if (!process.env.SECRET_KEY) {
      console.error('Missing secret key in environment variables');
      return res.status(500).send({ message: "Server configuration error" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: `Invalid or expired token: ${err.message}` });
      }

      console.log('✅ Decoded token:', decoded);
      req.user = decoded; // ✅ FIXED LINE
      next();
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).send({ message: "Internal server error during authentication" });
  }
}
