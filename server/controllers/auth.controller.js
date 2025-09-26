import User from "../model/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name) errors.push("Name is required.");
  if (!email) errors.push("Email is required.");
  if (!password) errors.push("Password is required.");
  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ errors: ["User already exists."] });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push("Email is required.");
  if (!password) errors.push("Password is required.");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ errors: ["Invalid email or password."] });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // tokenni dekodlash
    const user = await User.findById(decoded.id).select("-password"); // parolni yubormaymiz

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};


