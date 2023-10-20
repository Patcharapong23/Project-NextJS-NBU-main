import TestPage from "./TestPage"; // แนบ TestPage

// ต่อไปนี้จะมีโค้ดอื่น ๆ ที่มีอยู่ในไฟล์

export default function App() {
  return (
    <div className="flex flex-auto md:flex-row justify-center items-center h-full gap-6 sm:gap-6 p-10 mt-24 ">
      <TestPage /> {/* เพิ่ม TestPage ลงในการทดสอบ */}
      {/* ต่อไปนี้จะมีโค้ดอื่น ๆ */}
    </div>
  );
}
