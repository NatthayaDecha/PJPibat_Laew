import React from "react";
import "../css/MainLayout.css";

function MainLayout() {
  return (
    <>
      <div className="navbar">
        <div className="Box1">
          <img src="/Logowed.png" alt="Logo" />
        </div>
        <div className="Box2"></div>
        <div className="Box3">
          <ul>
            <li className="link1">
              <a href="#">ข้อระมัดระวัง</a>
            </li>
            <li className="link2">
              <a href="#">วิธีรับมือ</a>
            </li>
            <li className="link3">
              <a href="#">เกี่ยวกับเรา</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="content">

      </div>
   

      


      <div className="content">
        <div className="slidbar">1</div>
        <div className="content">
          <div>1</div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;

{
  /* <ul>
            <li>
              <a href="#">น้ำท่วมตายห่าเเล้ว</a>
            </li>
            <li>
              <a href="#">ไฟป่าไหม้ละ</a>
            </li>
            <li>
              <a href="#">ภัยเเล้งย่างตาย</a>
            </li>
          </ul> */
}
