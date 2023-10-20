"use client";
import { useState, useEffect } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/Login_User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.userId);
        window.location.replace("/Page/Home_login"); // ทำการเปลี่ยนหน้าเพจโดยใช้ window.location
      } else {
        setError("กรุณาตรวจสอบ อีเมล์ และ รหัสผ่าน");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Internal Server Error. Please try again later.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // ทำการ redirect ไปยังหน้าหลัก
      window.location.replace("/Page/Room.user");
    }
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <div className="border-t-4 border-[#E4965D] p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-xl font-bold my-4 text-center">เข้าสู่ระบบ</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="อีเมล์"
            required
          />
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="รหัสผ่าน"
            required
          />
          <button
            className="bg-[#E4965D] text-white font-bold cursor-pointer px-6 py-2"
            disabled={email === "" && password === ""}
          >
            เข้าสู่ระบบ
          </button>
          {error && (
            <div className="text-[#ff4747] w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
