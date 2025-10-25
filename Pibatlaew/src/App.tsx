import React from "react";
import FloodPage from "./page/FloodPage";
import MainLayout from "./layout/MainLayout";


function App() {
  return (
    <div className="App">
    <MainLayout>
      <FloodPage/>
      
    </MainLayout>
    </div>
  );
}

export default App;
