const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 4000;

require("dotenv").config();

const UserRoute = require("./routes/uset.routes");
const Room_info = require("./models/room.management.models");
const Student_info = require("./models/user.Student.models");
const User = require("./models/๊user.models");
const fetch_user_data = require("./models/๊user.models");
const MoveRoom = require("./models/Move_room.models");
const ReportRepai = require("./models/ReportRepai.models");
const userController = require("./controllers/userController"); // นำเข้า Controller

const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", UserRoute);

// Middleware สำหรับตรวจสอบ token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
};

app.post("/admin-create-room", async (req, res) => {
  try {
    const { floor, roomNumber, type, cost, quantity } = req.body;

    // สร้างข้อมูลห้องใหม่
    const newRoom = new Room_info({
      floor,
      roomNumber,
      type,
      cost,
      quantity,
    });

    // บันทึกข้อมูลลงในฐานข้อมูล
    const savedRoom = await newRoom.save();

    res.json(savedRoom); // ส่งข้อมูลที่บันทึกแล้วกลับไป
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user-info/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ใน Endpoint /student-info
app.get("/student-info", authenticateToken, async (req, res) => {
  const user = req.user;

  // นำ user.email ไปใช้ในการดึงข้อมูลนักศึกษาจากฐานข้อมูลของคุณ
  try {
    const studentInfo = await Student_info.findOne({ email: user.email });

    if (!studentInfo) {
      return res.status(404).json({ message: "ไม่พบข้อมูลนักศึกษา" });
    }

    res.json(studentInfo);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ใน Endpoint /student-info
app.get("/student-info", authenticateToken, async (req, res) => {
  // ตรวจสอบ req.user เพื่อดูข้อมูลผู้ใช้
  const user = req.user;

  // ใช้ข้อมูลผู้ใช้ในการดึงข้อมูลนักศึกษา (เช่น ใช้ user.email)
  // ...
});
// app.get("/student-info", (req, res) => {
//   // ตัวอย่างการส่งข้อมูลกลับไปหน้าบ้าน
//   const data = {
//     studentId: "123456",
//     faculty: "Engineering",
//     department: "Computer Science",
//   };
//   res.json(data);
// });

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}

app.post("/student-info", authenticateToken, async (req, res) => {
  const {
    studentId,
    name,
    faculty,
    department,
    telephoneNumber,
    contractDate,
    nickname,
  } = req.body;

  try {
    const data = new Student_info({
      studentId,
      name,
      faculty,
      department,
      telephoneNumber,
      contractDate,
      nickname,
    });

    await data.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/admin-create-room", (req, res) => {
  const roomData = req.body;

  // ทำการบันทึกข้อมูลห้องลงในฐานข้อมูล หรือทำการดำเนินการตามที่คุณต้องการ

  // ส่งคำตอบกลับไปยัง frontend
  res.json({ message: "Room created successfully!" });
});
app.post("/Manage_User", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "อีเมล์นี้มีผู้ใช้อยู่แล้ว! กรุณาใช้อีเมล์ใหม่ในการลงทะเบียน",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/Login_User", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    checkUserAndGenerateToken(user, req, res);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/move-room", async (req, res) => {
  try {
    const { roomNumber, reason } = req.body;
    const moveRoom = new MoveRoom({ roomNumber, reason });
    await moveRoom.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/ReportRepai", async (req, res) => {
  try {
    const { roomNumber, reason } = req.body;
    const moveRoom = new ReportRepai({ roomNumber, reason });
    await moveRoom.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fetch_user_data", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const decodedToken = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    const user = await fetch_user_data.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/Info", async (req, res) => {
  const { floor, roomNumber } = req.query;

  try {
    let query = {};

    if (floor) {
      query.floor = floor;
    }

    if (roomNumber) {
      query.roomNumber = roomNumber;
    }

    const rooms = await Room_info.find(query);

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user-info/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/user-info", authenticateToken, async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const decodedToken = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
