// controllers/userController.js
const User = require("../models/๊user.models"); // นำเข้า Model

exports.getUserData = async (req, res) => {
  try {
    const userData = await User.findById(req.params.userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const updatedUserData = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// เพิ่ม controllers อื่น ๆ ตามที่ต้องการ
