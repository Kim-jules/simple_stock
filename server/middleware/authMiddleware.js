const User = require("../models/User");

const requireLogin = async (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized access" });
  const user = await User.findById({ _id: req.session.user.userId });
  if (!user) return res.status(401).json({ message: "User not found" });
  next();
};

const requireAdminPermission = async (req, res, next) => {
  if (req.session.user.role !== "admin")
    return res.status(403).json({ message: "Admin permission required." });
  next();
};

module.exports = { requireLogin, requireAdminPermission };
