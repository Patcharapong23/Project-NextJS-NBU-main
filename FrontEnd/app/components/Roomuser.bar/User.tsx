"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [userData, setUserData] = useState({
    email: "",
    faculty: "",
    department: "",
    studentId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in first");
          return;
        }

        const res = await axios.get("http://localhost:4000/student-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="text-center  relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-4 border border-gray-500">
        คณะ: {userData.faculty}
        สาขา: {userData.department}
      </div>
      <div className="text-center  relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-4 border border-gray-500">
        คณะ: พยาบาลศาสตร์ สาขา: ผู้ช่วยพยาบาล
      </div>
      <div className="text-center  relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-4 border border-gray-500">
        คณะ: ศึกษาศาสตร์ สาขา: การศึกษาปฐมวัย
      </div>
      <div className="text-center  relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-4 border border-gray-500 ">
        คณะ: ศึกษาศาสตร์ สาขา: การศึกษาปฐมวัย
      </div>
    </div>
  );
};

export default User;
