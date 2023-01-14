import React from "react";
import AllRoutes from "./routes/AllRoutes";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <div className="h-full bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <Header />
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
