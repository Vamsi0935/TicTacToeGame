const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, "123456789", {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      userId: user._id,
      message: "User registered successfully",
    });
  } catch (err) {
    //console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, "123456789", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, userId: user._id, message: "Login successful" });
  } catch (err) {
    //console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get authenticated user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
