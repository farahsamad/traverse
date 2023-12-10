import React, { useEffect, useState } from "react";
import Header from "../../Pages/Navbar/Header";
// import "../traverse.css";
import { Outlet, useLocation } from "react-router-dom";

export default function Friendlayout() {
  const [search, setSearch] = useState(true);
  useEffect(() => {
    localStorage.setItem("userid", JSON.stringify(""));
    localStorage.setItem("username", JSON.stringify(""));
    localStorage.setItem("userimage", JSON.stringify(""));
  }, []);
  const currentlocation = useLocation().pathname;
  useEffect(() => {
    if (currentlocation == "/Traverse/Search") {
      // console.log("yes");
      setSearch(false);
    } else {
      setSearch(true);
      // console.log("no");
    }
  }, [search]);

  return (
    <>
      {search ? (
        <div className="traverse-container" id="traverseContainer">
          <Header />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
