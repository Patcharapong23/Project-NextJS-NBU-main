import React, { useState } from "react";
import axios from "axios";

const MoveRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    reason: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/ReportRepai", formData)
      .then((response) => {
        console.log("ได้ลงรายการย้ายห้องเรียบร้อย:", response.data);
        alert("ได้ลงรายการย้ายห้องเรียบร้อย");
        setFormData({
          roomNumber: "",
          reason: "",
        });
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="justify-center items-center h-full gap-6 sm:gap-6 p-10 grid">
      <h2 className=" text-center text-lg">แจ้งย้ายห้อง</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomNumber">หมายเลขห้อง : </label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            className="border-gray-300 border m-1"
          />
        </div>
        <div className="flex ">
          <label htmlFor="reason">เหตุผล : </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className="border-gray-300 border mt-2 m-10
            "
          />
        </div>
        <div className=" text-center text-lg mt-10">
          <button
            type="submit"
            className="bg-[#E4965D] text-white  rounded-lg shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-[#E4965D] duration-300 w-[100px]"
          >
            ส่ง
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoveRoom;
