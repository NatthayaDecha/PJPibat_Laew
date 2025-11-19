// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./layout/MainPage";
import FloodPage30day from "./page/FloodPage30day";
import FirePage from "./page/FirePage";
import HowPage from "./page/HowPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout หลัก */}
        <Route path="/" element={<MainPage />}>
          {/* หน้า default ตอนเข้าเว็บครั้งแรก ให้เป็นน้ำท่วม 30 วัน */}
          <Route index element={<FloodPage30day />} />
          <Route path="HowPage" element={<HowPage/>} />
          <Route path="flood30" element={<FloodPage30day />} />
          <Route path="fire30" element={<FirePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
