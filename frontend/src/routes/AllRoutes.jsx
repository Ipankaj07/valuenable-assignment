import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Policy from "../components/Policy";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
