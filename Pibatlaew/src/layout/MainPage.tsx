// MainPage.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/MainPage.css";

function MainPage() {
  return (
    <>
      <div className="flex felx-col navbar">
        <div className="flex-1 box1 ">
          <img src="/Logowed.png" alt="logo" width={"250px"}  />
        </div>
        <div className="flex-1 box2"></div>
        <div className="flex-1 box3 text-center">
          <ul>
             {/* <li>
              <Link to="/HowPage">เเนะนำ</Link>
            </li>
            <li>
              <Link to="/howto">วิธีรับมือ</Link>
            </li>
            <li>
              <Link to="/">เกี่ยวกับเรา</Link>
            </li> */}
            
          </ul>
        </div>
      </div>

      <div className="content flex felx-col">
        {/* เมนูด้านซ้าย */}
        <div className="leftbar">
          <ul>
        
            <li>
              <Link to="/flood3">น้ำท่วมในรอบ3วัน</Link>
            </li>
            <li>
              <Link to="/flood7">น้ำท่วมในรอบ7วัน</Link>
            </li>
            <li>
              <Link to="/flood30">น้ำท่วมในรอบ30วัน</Link>
            </li>
            <li>
              <Link to="/fire1">ไฟป่าในรอบ1วัน </Link>
            </li>
             <li>
              <Link to="/fire3">ไฟป่าในรอบ3วัน </Link>
            </li>
            <li>
              <Link to="/fire7">ไฟป่าในรอบ7วัน </Link>
            </li>
            <li>
              <Link to="/fire30">ไฟป่าในรอบ30วัน </Link>
            </li>
             
          </ul>
        </div>

        {/* พื้นที่แสดงหน้าแต่ละหน้า (FloodPage, FirePage) */}
        <div className="basis-3/4">
          <div className="flex flex-1 items-start justify-center">
            <Outlet /> {/* ตรงนี้แหละที่แต่ละ Route จะมาแสดง */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
