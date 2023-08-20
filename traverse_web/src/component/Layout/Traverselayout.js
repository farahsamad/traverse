import React, { useEffect } from "react";
import Header from "../../Pages/Navbar/Header";
// import "../traverse.css";
import { Outlet } from "react-router-dom";

export default function Friendlayout() {
  useEffect(() => {
    localStorage.setItem("userid", JSON.stringify(""));
    localStorage.setItem("username", JSON.stringify(""));
    localStorage.setItem("userimage", JSON.stringify(""));
  }, []);

  return (
    <div className="traverse-container" id="traverseContainer">
      <Header />
      <Outlet />
    </div>
  );
}
