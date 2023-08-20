import React, { useContext, useState, useMemo } from "react";
import "../../component/styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import $ from "jquery";
import axios from "axios";
import PersonContext from "../../context/app-context";

export default function Signup() {
  const { loggedin } = useContext(PersonContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [label, setLabel] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();

  const displayError = {
    display: error ? "block" : "none",
  };

  var errorModal = document.getElementById("error-container");

  function buttonClick(event) {
    if (event.keyCode === 13) {
      axios
        .post("http://localhost/traverse-backend/createAccount.php", {
          username,
          password,
          email,
          phone,
          repassword,
        })
        .then((data) => {
          if (data.data.response === "!choose username") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response === "!username already exist") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response === "!incorrect password") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response === "!choose password") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "!choose email") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "!choose phone") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "success") {
            document.getElementById("signup2").style.display = "flex";
            document.getElementById("signup").style.display = "none";
          }
        });
    }
  }

  function buttonClicked() {
    axios
      .post("http://localhost/traverse-backend/createAccount.php", {
        username,
        password,
        email,
        phone,
        repassword,
      })
      .then((data) => {
        if (data.data.response === "!choose username") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response === "!username already exist") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response === "!incorrect password") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response === "!choose password") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "!choose email") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "!choose phone") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "success") {
          document.getElementById("signup2").style.display = "flex";
          document.getElementById("signup").style.display = "none";
        }
      });
  }

  function submitclicked(event) {
    if (event.keyCode === 13) {
      axios
        .post("http://localhost/traverse-backend/createAccount2.php", {
          username,
          password,
          email,
          phone,
          repassword,
          name,
          birthday,
          nationality,
          gender,
        })
        .then((data) => {
          if (data.response == "!choose name") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.response);
          } else if (data.data.response == "!choose nationality") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "!choose gender") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "!child can't create account") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "!choose birthday") {
            errorModal.style.display = "block";
            $(".error-sentence").html(data.data.response);
          } else if (data.data.response == "signin") {
            loggedin(data.data.ID, "", data.data.name);
            navigate("/Traverse");
          }
        });
    }
  }

  function submitclick() {
    axios
      .post("http://localhost/traverse-backend/createAccount2.php", {
        username,
        password,
        email,
        phone,
        repassword,
        name,
        birthday,
        nationality,
        gender,
      })
      .then((data) => {
        if (data.response == "!choose name") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.response);
        } else if (data.data.response == "!choose nationality") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "!choose gender") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "!child can't create account") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "!choose birthday") {
          errorModal.style.display = "block";
          $(".error-sentence").html(data.data.response);
        } else if (data.data.response == "signin") {
          loggedin(data.data.ID, "", data.data.name);
          navigate("/Traverse");
        }
      });
  }
  return (
    <>
      <div className="sign-container" id="signup">
        <div className="account-content">
          <div>
            <h1 className="traverse-h1">Traverse</h1>
          </div>
          <form className="form_signup_container">
            <div className="account-form">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="input user_sign"
                placeholder="username"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input mail_sign"
                placeholder="email"
                required
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="input phone_sign"
                placeholder="phone"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input pass_sign"
                placeholder="password"
                required
              />
              <input
                type="password"
                name="repassword"
                value={repassword}
                onChange={(e) => {
                  setRepassword(e.target.value);
                }}
                className="input pass_sign"
                placeholder="re-enter password"
                required
              />
              <div className="details-signup">
                By signing up, you agree to our{" "}
                <span className="account-font">Terms</span> ,{" "}
                <span className="account-font">Privacy Policy</span> and{" "}
                <span className="account-font">Cookies Policy</span>.
              </div>
              <input
                className="next-input"
                type="submit"
                id="next"
                onClick={(e) => {
                  e.preventDefault();
                  buttonClicked();
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                  buttonClick();
                }}
                value="Next"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="signup-container" id="signup2">
        <div className="account-content">
          <div>
            <h1 className="traverse-h1">Traverse</h1>
          </div>
          <form method="post" className="form_signup_container">
            <div className="account-form">
              <div className="input-sign account_margin">
                <div className="gender-type">Enter your name:</div>
                <input
                  type="text"
                  className="input-date"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="input-sign account_margin">
                <div className="gender-type">Enter your birthday:</div>
                <input
                  type="date"
                  className="input-date"
                  name="birthday"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-sign account_margin">
                <label htmlFor="country-name" className="gender-type">
                  Enter your nationality:
                </label>
                {/* <select
                  name="type"
                  className="res-type"
                  id="country-name"
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
                    console.log(e.target.value);
                  }}
                  required
                >
                  <option value="Lebanon"></option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="US">US</option>
                  <option value="France">France</option>
                  <option value="England">England</option>
                  <option value="Germany">Germany</option>
                  <option value="UAE">UAE</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select> */}
                <Select
                  name="type"
                  className="res-type"
                  id="country-name"
                  options={options}
                  value={label}
                  onChange={(e) => {
                    setNationality(e.label);
                    setLabel(e);
                  }}
                  required
                />
              </div>
              <div className="input-sign account_margin gender">
                <div className="gender-type">Enter your gender:</div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    className="male"
                    id="male"
                    value={gender}
                    onChange={(e) => {
                      setGender("Male");
                    }}
                    required
                  />
                  <label htmlFor="male">Male</label>
                  <div className="female-input">
                    <input
                      type="radio"
                      name="gender"
                      className="female"
                      id="female"
                      value={gender}
                      onChange={(e) => {
                        setGender("Female");
                      }}
                      required
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="custom-container">
                  <input
                    type="radio"
                    name="gender"
                    className="custom"
                    id="custom"
                    value={gender}
                    onChange={(e) => {
                      setGender("Custom");
                    }}
                    required
                  />
                  <label htmlFor="custom">Custom</label>
                </div>
              </div>
              <input
                type="submit"
                name="signin"
                onClick={(e) => {
                  e.preventDefault();
                  submitclick();
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                  submitclicked();
                }}
                id="submit"
                className="input-sign signin-submit"
                value="Sign in"
              />
            </div>
          </form>
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
