import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./styles.css";
import PersonContext from "./context/app-context";
import { userAuth } from "./Api";

export default function Userlogin() {
  const { isloggedin, loggedin, addbio } = useContext(PersonContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [usernamelabel, setUsernamelabel] = useState({
    transform: "",
    backgroundColor: "",
    marginLeft: "",
    fontWeight: "",
    border: "",
    borderRadius: "",
  });
  const [passwordlabel, setPasswordlabel] = useState({
    transform: "",
    backgroundColor: "",
    marginLeft: "",
    fontWeight: "",
    border: "",
    borderRadius: "",
  });
  const [error, setError] = useState(false);
  const message = useLoaderData();
  const displayError = {
    display: error ? "block" : "none",
  };

  if (
    JSON.parse(localStorage.getItem("ID")) != null ||
    JSON.parse(localStorage.getItem("ID")) == null
  ) {
    localStorage.removeItem("name");
    localStorage.removeItem("img");
    localStorage.removeItem("ID");
    localStorage.removeItem("PID");
    localStorage.removeItem("bio");
    localStorage.removeItem("isloggedin");
  }
  // localStorage.setItem("isloggedin", JSON.stringify("false"));

  function usernameclicked() {
    setUsernamelabel({
      ...usernamelabel,
      transform: "translateY(-12px)",
      backgroundColor: "white",
      marginLeft: "3px",
      fontWeight: "bold",
    });
  }

  function passwordclicked() {
    setPasswordlabel({
      ...passwordlabel,
      transform: "translateY(-12px)",
      backgroundColor: "white",
      marginLeft: "3px",
      fontWeight: "bold",
    });
  }

  var errorModal = document.getElementById("error-container");
  function signin(event) {
    if (event.key === 13) {
      console.log("Userlogin.js");
      if ($("#user").val() !== "") {
        if ($("#pass").val() !== "") {
          async function loadAuth() {
            const returnedData = await userAuth(
              $("#user").val(),
              $("#pass").val()
            );
            try {
              if (
                returnedData.response == "!Incorrect username" ||
                returnedData.response == "!Incorrect password"
              ) {
                errorModal.style.display = "block";
                $(".error-sentence").html(returnedData.response);
              } else if (returnedData.response == "success") {
                loggedin(
                  returnedData.id,
                  returnedData.profile,
                  returnedData.name
                );
                addbio(returnedData.bio);
                localStorage.setItem("isloggedin", JSON.stringify("true"));
                if (isloggedin != null && isloggedin == "true") {
                  navigate("/Traverse");
                }
              }
            } catch (error) {
              setErr(error);
            } finally {
            }
          }
          loadAuth();
        } else {
          $("button").on("click", function () {
            errorModal.style.display = "inline-block";
            $(".error-sentence").html("!Please enter a password");
          });
        }
      }
    }
  }
  function buttonClicked() {
    if ($("#user").val() !== "") {
      if ($("#pass").val() !== "") {
        async function loadAuth() {
          const returnedData = await userAuth(
            $("#user").val(),
            $("#pass").val()
          );
          try {
            if (
              returnedData.response == "!Incorrect username" ||
              returnedData.response == "!Incorrect password"
            ) {
              errorModal.style.display = "block";
              $(".error-sentence").html(returnedData.response);
            } else if (returnedData.response == "success") {
              loggedin(
                returnedData.id,
                returnedData.profile,
                returnedData.name
              );
              addbio(returnedData.bio);
              localStorage.setItem("isloggedin", JSON.stringify("true"));
              if (isloggedin != null && isloggedin == "true") {
                navigate("/Traverse");
              }
            }
          } catch (error) {
            setErr(error);
          } finally {
          }
        }
        loadAuth();
      } else {
        $("button").on("click", function () {
          errorModal.style.display = "inline-block";
          $(".error-sentence").html("!Please enter a password");
        });
      }
    }
  }

  // function messagealert() {
  // if (message != null) {
  //   console.log("hiiiiiiiiiiiiiiiii");
  //   document.getElementsByClassName(
  //     ".traverse-logo-container"
  //   ).style.marginTop = "-50";
  // }
  //   console.log("MESSAGE ", message);
  // }
  // messagealert();

  return (
    <>
      <div className="login-container">
        <div className="form-content">
          <div className=".traverse-logo-container" id="travserseContainer">
            <h1 className="traverse-h1">Traverse</h1>
            {message && (
              <div className="message-error-container">
                <h1 className="error-message">{message}</h1>
              </div>
            )}
          </div>
          <form>
            <div className="input-form">
              <div className="username-container">
                <label className="username-label" style={usernamelabel}>
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  className="user"
                  id="user"
                  value={username}
                  onClick={() => {
                    usernameclicked();
                  }}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="password-container">
                <label className="password-label" style={passwordlabel}>
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  className="pass"
                  id="pass"
                  value={password}
                  onClick={() => {
                    passwordclicked();
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <input
                type="submit"
                name="signin"
                onClick={(e) => {
                  e.preventDefault();
                  buttonClicked();
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                  signin();
                }}
                id="submit"
                className="enter sign-submit"
                value="Log in"
              />
            </div>
          </form>
          <div className="details-signin">
            Don't hesitate!
            <Link className="create-account" to="/Signup">
              Create <span className="account-font">Account</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="error-container"
        id="error-container"
        style={displayError}
      >
        <div className="error-modal">
          <div className="error-modal-container">
            <div className="error-sentence"></div>
            <div
              className="ok-sentence"
              onClick={() => setError((prev) => !prev)}
            >
              OK
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
