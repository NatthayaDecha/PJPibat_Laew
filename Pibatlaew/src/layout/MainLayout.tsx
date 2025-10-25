import React from "react";
import "../css/MainLayout.css";

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  return (
    <div className="containerXL">
      <header className="header">
         <h1>Pibat Laew </h1>
         <nav>
          <a href="/Pibatlaew/src/page/FloodPage.tsx">ข้อควรระวัง</a>
          <a href="/Pibatlaew/src/page/Kuy.tsx">วิธีรับมือ</a>
          <a href="#">Help?</a>
          <a href="/Pibatlaew/src/page/FloodPage.tsx">ข้อควรระวัง</a>
          <a href="/Pibatlaew/src/page/Kuy.tsx">วิธีรับมือ</a>
          <a href="#">Help?</a>
         </nav>
      </header>
        

      <main className="content">{children}</main>
      {/* <footer className="footer">
          <p>© 2025 Pibat Laew Project</p>
      </footer> */}
    </div>
  );
}

export default MainLayout;
