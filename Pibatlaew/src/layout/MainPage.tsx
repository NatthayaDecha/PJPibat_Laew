// MainPage.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/MainPage.css";
function MainPage() {
  return (
    <>
      {/* การสรา้งตัวหลักของเว็บ */}
      <div className="flex felx-col navbar">
        <div className="flex-1 box1 ">
          <img src="/Logowed.png" alt="logo" width={"250px"}  />
        </div>
      </div>
      <div className="content flex felx-col"> 
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
              <Link to="/fire1">จุดเกิดไฟป่าในรอบ 1วัน </Link>
            </li>
             <li>
              <Link to="/fire3">จุดเกิดไฟป่าในรอบ 3วัน </Link>
            </li>
            <li>
              <Link to="/fire7">จุดเกิดไฟป่าในรอบ 7วัน </Link>
            </li>
            <li>
              <Link to="/fire30">จุดเกิดไฟป่าในรอบ30วัน </Link>
            </li>    
          </ul>
        </div>
        {/* พื้นที่แสดงหน้าแต่ละหน้า (FloodPage, FirePage) */}
        <div className="basis-3/4">
          <div className="flex flex-1 items-start justify-center">
            <Outlet /> {/*  Route จะมาแสดง */}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
