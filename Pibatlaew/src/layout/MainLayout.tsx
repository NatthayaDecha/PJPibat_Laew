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
        {/* <img src="/Pibatlaew/public/Logo.png" alt="Logo" className="logo" /> */}
        <nav>
          <a href="#">ข้อควรระวัง</a>
          <a href="#">วิธีรับมือ</a>
          <a href="#">Help?</a>
        </nav>
      </header>
      <div className="sidebar">
        <nav>
          <a href="#">ข้อควรระวัง</a>
          <a href="#">วิธีรับมือ</a>
          <a href="#">Help?</a>
        </nav>
      </div>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>© 2025 Pibat Laew Project</p>
      </footer>
    </div>
  );
}

export default MainLayout;
