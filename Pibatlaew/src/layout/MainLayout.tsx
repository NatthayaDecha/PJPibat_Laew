import React from "react";
import "../css/MainLayout.css";

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  return (
    <div className="containerXL">
      <header className="header">
         <h1>Pibat Laew E Dok</h1>
         <nav>
          <a href="#">Home</a>
          <a href="#">Flood</a>
          <a href="#">About</a>
         </nav>
      </header>
      <main className="contenr">{children}</main>
      <footer className="footer">
          <p>© 2025 Pibat Laew Project</p>
      </footer>
    </div>
  );
}

export default MainLayout;
