// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./layout/MainPage";
import FloodPage30day from "./page/FloodPage30day";
import FirePage30day from "./page/FirePage30day";
import FirePage7day from "./page/FirePage7day";
import FirePage3day from "./page/FirePage3day";
import FirePage1day from "./page/FriePage1day";
import FloodPage7day from "./page/FloodPage7day";
import FloodPage3day from "./page/FloodPage3day";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout หลัก */}
        <Route path="/" element={<MainPage />}>
          {/* หน้า default ตอนเข้าเว็บครั้งแรก ให้เป็นน้ำท่วม 30 วัน */}
          <Route index element={<FloodPage30day />} />
          <Route path="flood3" element={<FloodPage3day/>} />
          <Route path="flood7" element={<FloodPage7day/>}/>
          <Route path="flood30" element={<FloodPage30day/>} />
          <Route path="fire1" element={<FirePage1day/>} />
          <Route path="fire3" element={<FirePage3day/>} />
          <Route path="fire7" element={<FirePage7day/>} />
          <Route path="fire30" element={<FirePage30day/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
