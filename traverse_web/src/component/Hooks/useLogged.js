import React from "react";
import PersonContext from "../../context/app-context";
import { redirect } from "react-router-dom";

export default function useLogged() {
  // const { id, name, image, postid, isloggedin, loggedin, commentclick } =
  //   useContext(PersonContext);
  var isloggedin = JSON.parse(localStorage.getItem("isloggedin"));
  if (isloggedin == null && isloggedin != "true") {
    throw redirect("/?message=You must log in first.");
    // return <Navigate to="/" state={{message: "You must log in first."}} />
  }
  return null;
}
