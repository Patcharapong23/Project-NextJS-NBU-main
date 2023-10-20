"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const [nickname, setNickname] = useState(""); // เพิ่ม state สำหรับเก็บข้อมูล nickname
  const [isEditing, setIsEditing] = useState(false);

  // ... (โค้ดอื่น ๆ)

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token missing");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/student-info",
        {
          nickname: nickname, // ส่ง nickname ไปในรูปแบบของ object
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setIsEditing(false);
        setUserInfo(res.data);
      } else {
        console.error("Error saving nickname:", res.data.message);
      }
    } catch (error) {
      console.error("Error saving nickname:", error);
    }
  };

  return (
    <div className="flex flex-auto md:flex-row justify-center items-center h-full gap-6 sm:gap-6 p-10 mt-[300px] text-gray-400 text-lg ">
      <h1>คุณไม่มีข้อมูลห้องในนี้</h1>
      <p>กรุณาทำสัญญาเช่าห้องพักก่อน</p>
    </div>
  );
};
export default DisplayInfo;
// {userInfo && <div>Email: {userInfo.name}</div>}
// {userInfo && <div>Email: {userInfo.faculty}</div>}
// {isEditing ? (
//   <div>
//     <input
//       type="text"
//       value={nickname}
//       onChange={(e) => setNickname(e.target.value)} // อัพเดท state ของ nickname
//     />
//     <button onClick={handleSaveClick}>Save</button>
//   </div>
// ) : (
//   <button onClick={handleEditClick}>Edit Nickname</button>
// )}
