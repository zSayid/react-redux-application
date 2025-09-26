// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // will save the user id
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };
