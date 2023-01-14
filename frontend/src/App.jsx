import React from "react";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <div className="h-full bg-gradient-to-b from-gray-900 to-slate-800 flex flex-col text-white">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
