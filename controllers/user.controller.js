const { User } = require("../model/user.model");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User doesn't found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current user error: ${error}` });
  }
};

module.exports = { getCurrentUser };
