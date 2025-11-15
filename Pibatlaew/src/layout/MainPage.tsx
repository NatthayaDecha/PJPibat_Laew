import React from "react";
import "../css/MainPage.css";
// import FloodPage from "../page/FloodPage";
function MainPage() {
  return (
    <>
      <div className="flex felx-col  navbar">
        <div className="flex-1 box1 ">
          <img src="/Logowed.png" alt="logo" width={"250px"}  />
        </div>
        <div className="flex-1 box2"></div>
        <div className="flex-1 box3 text-center">
            <ul>
                  <li><a href="#">การเเจ้งเตือน</a></li>
                  <li><a href="#">วิธีรับมือ</a></li>
                  <li><a href="#">เกี่ยวกับเรา</a></li>
            </ul>
        </div>
      </div>
      <div className="content flex felx-col">
        <div className="leftbar ">
            <ul>
                  <li><a href="#">น้ำท่วม</a></li>
                  <li><a href="#">ไฟป่า</a></li>
                  <li><a href="#">ภัยเเล้ง</a></li>
                  <li><a href="#">เตือนภัย</a></li>
                  <li><a href="#">เเนะนำ</a></li>
            </ul>
        </div>
        <div className="basis-3/4">
          <div className="flex/ flex-1 items-center justify-center h-screen">
            <FloodPage/>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;

// basis-1/4