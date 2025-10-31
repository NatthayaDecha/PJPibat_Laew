import React from "react";
import "../css/MainPage.css";
// import FloodPage from "../page/FloodPage";
function MainPage() {
  return (
    <>
      <div className="flex felx-col">
        <div className="flex-1 box1">1</div>
        <div className="flex-1 box2">2</div>
        <div className="flex-1 box3">3</div>
      </div>
      <div className="content flex felx-col">
        <div className="leftbar basis-1/4">เมนูทางซ้าย</div>
        <div className="basis-3/4">
          <div className="flex/ flex-1 items-center justify-center h-screen">
            {/* <FloodPage/> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
