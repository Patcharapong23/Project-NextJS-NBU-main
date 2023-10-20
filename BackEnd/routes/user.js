import React, { useState, useEffect } from "react";

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
        const res = await fetch("http://localhost:4000/student-info");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData.email) {
    return <div>Loading...</div>; // หรือใส่ UI ที่แสดง Loading ได้ตามต้องการ
  }

  return (
    <div>
      <div className="text-center">Email: {userData.email}</div>
      <div className="text-center">รหัสนักศึกษา: {userData.studentId}</div>
      <div className="text-center">คณะ: {userData.faculty}</div>
      <div className="text-center">สาขา: {userData.department}</div>
    </div>
  );
};

export default User;
