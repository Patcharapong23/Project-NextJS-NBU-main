import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [userData, setUserData] = useState({
    email: "",
    faculty: "",
    department: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in first");
          return;
        }

        const res = await axios.get("http://localhost:4000/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { email, faculty, department } = res.data;
        setUserData({
          email,
          faculty,
          department,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className=" flex  gap-4 min-w-0 break-words bg-white w-full mb-6  border-gray-400 border rounded mt-4  text-xl text-center  justify-center  p-5">
        <div className=" text-center">แจ้งซ่อม</div>
        <div className=" text-center">ก๊อกน้ำพัง</div>
        <div className=" text-center border-gray-300 border">
          🔴รับเรื่องแล้ว
        </div>
      </div>
    </div>
  );
};

export default Notifications;
{
  /* <p>Faculty: {userData.faculty}</p>
        <p>Department: {userData.department}</p>
        <p>Email: {userData.email}</p> */
}
