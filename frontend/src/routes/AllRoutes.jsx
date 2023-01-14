import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Policy from "../components/Policy";
import Illustration from "../components/Illustration";

const AllRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
