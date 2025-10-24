import React from "react";
import FloodPage from "./page/FloodPage";
import MainLayout from "./layout/MainLayout";
// import Kuy52 from "./page/Kuy";

function App() {
  return (
    <div className="App">
    <MainLayout>
      <FloodPage/>
      {/* <Kuy52/> */}
    </MainLayout>
    </div>
  );
}

export default App;
