const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { username, email, role, password } = req.body;
  console.log(req.body);
  try {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: "Email already taken." });
    }
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      role: role || "user",
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error occured.", err);
    return res.status(500).json({ message: "Registration failed." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      userId: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error occured.", error);
    res.status(500).json({ message: "Internal Server ." });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error: ", error);
      res.status(500).json({ message: "Failed to logout." });
    } else {
      res.status(200).json({ message: "Logged out successfully." });
    }
  });
};

const userProfile = (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile",
    user: req.session.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
};
