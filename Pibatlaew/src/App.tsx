// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./layout/MainPage";
import FloodPage7day from "./page/FloodPage7day";
import FloodPage30day from "./page/FloodPage30day";
import FirePage from "./page/FirePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout หลัก */}
        <Route path="/" element={<MainPage />}>
          {/* หน้า default ตอนเข้าเว็บครั้งแรก ให้เป็นน้ำท่วม 30 วัน */}
          <Route index element={<FloodPage30day />} />

          {/* น้ำท่วม */}
          <Route path="flood7" element={<FloodPage7day />} />
          <Route path="flood30" element={<FloodPage30day />} />

          {/* ไฟป่า */}
          <Route path="fire30" element={<FirePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
