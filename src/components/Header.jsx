import React from "react";

function Header() {
  return (
    <div className="navbar bg-violet-800">
     <div className="flex-1">
      <a href="/" className="btn btn-ghost text-stone-200 text-xl">ตารางปฏิบัติงานทันตแพทย์คลินิกทันตกรรมผู้ป่วยนอก (OPD)</a>
     </div>
       <div className="flex-none flex gap-2">
          <a href="/" className="btn">ตารางเวร</a>
          <a href="/act" className="btn">Act</a>
          <a href="/summary" className="btn" >สรุป</a>
          <a href="/member" className="btn">รายชื่อ</a>
       </div>
    </div>
  );
}

export default Header;
