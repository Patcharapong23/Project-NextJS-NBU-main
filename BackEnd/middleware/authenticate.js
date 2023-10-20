// middleware/authenticate.js

const jwt = require("jsonwebtoken");
const { secretKey } = require("../config"); // นำเข้า secretKey จาก config

module.exports = (req, res, next) => {
  const token = req.headers.token; // รับ Token จาก headers

  if (!token) {
    return res.status(401).json({ message: "Token ไม่ถูกต้อง" });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // ตรวจสอบ Token
    req.user = decoded; // นำข้อมูล user ที่ถูก encode จาก Token ไปใส่ใน req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token ไม่ถูกต้อง" });
  }
};
