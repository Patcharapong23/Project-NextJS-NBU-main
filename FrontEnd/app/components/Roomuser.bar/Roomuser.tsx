import React, { useState } from "react";
import User from "@/app/components/Roomuser.bar/User";
import ReportRepair from "@/app/components/Roomuser.bar/ReportRepai"; // นำเข้าคอมโพเนนต์ ReportRepair
import Move_room from "@/app/components/Roomuser.bar/Move_room";
import Notifications from "./Notifications";
import { IoMdNotifications } from "react-icons/io";

const Roomuser = () => {
  const [selectedTab, setSelectedTab] = useState("members");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showContract, setShowContract] = useState(true);

  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationSelect = (type: any) => {
    if (type === "repair") {
      setSelectedTab("reportRepair");
      setIsDropdownOpen(false);
    } else if (type === "move") {
      setSelectedTab("move_room"); // เพิ่ม case สำหรับ "แจ้งย้ายห้อง"
      setIsDropdownOpen(false);
    }
  };

  // สร้างฟังก์ชันเพื่อทำการแสดงหน้า User หรือ ReportRepair ขึ้นอยู่กับ selectedTab
  const renderContent = () => {
    switch (selectedTab) {
      case "members":
        return <User />;
      case "reportRepair":
        return <ReportRepair />;
      case "move_room": // เพิ่ม case สำหรับ "แจ้งย้ายห้อง"
        return <Move_room />;
      case "Notifications": // เพิ่ม case สำหรับ "แจ้งย้ายห้อง"
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-auto md:flex-row justify-center items-center h-full gap-6 sm:gap-6 p-10 mt-24">
      <div className="flex list-none flex-wrap pt-3 pb-4 flex-row justify-center ">
        <div className="">
          <button
            className={`text-lg font-bold uppercase px-5 py-3 shadow-lg rounded-tl rounded-bl block leading-normal m-0 ${
              selectedTab === "members"
                ? showContract
                  ? " bg-orange-600 text-white"
                  : "bg-white text-orange-600"
                : "bg-white text-orange-600"
            }`}
            onClick={() => handleTabClick("members")}
          >
            <i className="fas fa-space-shuttle text-base mr-1"></i> สมาชิก
          </button>
        </div>
        <div className=" flex">
          <button
            onClick={toggleDropdown}
            className={`text-lg font-bold uppercase px-5 py-3 shadow-lg block leading-normal m-0 ${
              isDropdownOpen
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-600"
            }`}
          >
            {isDropdownOpen ? "แจ้งปัญหา" : "แจ้งปัญหา ▼"}
          </button>
          {isDropdownOpen && (
            <div className="absolute  mt-5 bg-white border border-gray-300 w-48 shadow-lg rounded-lg">
              <button
                onClick={() => handleNotificationSelect("repair")}
                className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                แจ้งซ่อม
              </button>
              <button
                onClick={() => handleNotificationSelect("move")}
                className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                แจ้งย้ายห้อง
              </button>
            </div>
          )}
        </div>
        <button
          className={`text-lg font-bold uppercase px-5 py-3 shadow-lg  rounded-r-lg block leading-normal  w-[64pxpx] m-0 ${
            selectedTab === "Notifications"
              ? showContract
                ? " bg-orange-600 text-white"
                : "bg-white text-orange-600"
              : "bg-white text-orange-600"
          }`}
          onClick={() => handleTabClick("Notifications")}
        >
          <IoMdNotifications />
        </button>

        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-4">
          <div className="px-4 py-5 flex-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Roomuser;
