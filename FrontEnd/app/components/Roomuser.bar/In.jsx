// Roomuser.bar/In.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const In = () => {
  // สร้าง state สำหรับเก็บ token
  const [token, setToken] = useState("");

  useEffect(() => {
    // เมื่อ component โหลดเสร็จ ให้ดึง token จาก local storage (หากมี)
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // ทำการใช้ token ใน request axios
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/student-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>ดึงข้อมูล</button>
    </div>
  );
};

export default In;
