"use client";
// ทำการ import ส่วนที่จำเป็น
import React, { useState, useEffect } from "react";

export default function TestPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token missing");
          return;
        }

        const res = await fetch("http://localhost:4000/fetch_user_data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {userData && <div>Email: {userData.email}</div>}
    </div>
  );
}
