import React, { useState, useRef, useEffect, useContext } from "react";
import "./traverse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import { FaSignOutAlt } from "react-icons/fa";
import PersonContext from "./context/app-context";
import {
  FaPlusCircle,
  FaSearch,
  FaEnvelopeOpenText,
  FaShoppingBasket,
  FaGripHorizontal,
  FaUser,
} from "react-icons/fa";

export default function Header() {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const userimage = useRef();

  function displayList() {
    setDisplay(!display);
  }

  const { id, name, image } = useContext(PersonContext);

  var imageprofile = image;
  if (image === "false") {
    var imageprofile = false;
  }

  console.log(typeof image);

  function signout() {
    console.log("vara", id);
    JSON.parse(localStorage.removeItem("ID"));
    JSON.parse(localStorage.removeItem("name"));
    JSON.parse(localStorage.removeItem("img"));
    JSON.parse(localStorage.removeItem("PID"));
  }

  window.addEventListener("click", function (event) {
    if (userimage.current && !userimage.current.contains(event.target)) {
      if (display == true) {
        setDisplay(!display);
      }
    }
  });

  const listStyle = {
    display: display ? "block" : "none",
  };

  return (
    <nav className="main-container">
      <div className="nav-bar-a">
        <div className="logo">
          <div className="traverse-logo">
            <h1 className="traverse-h">Traverse</h1>
          </div>
        </div>
        <div className="search-container"></div>

        <div className="search">
          <div className="seacrh-container">
            <div className="input-search">
              <input
                type="search"
                name=""
                className="search-type-input"
                placeholder="search"
              />
              <div className="search-logo">
                <i className="search-icon">
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </i>
              </div>
            </div>
          </div>
          <div className="search-list"></div>
        </div>
        <div className="account-logo">
          <div className="account-container">
            <div className="photo-circle-container">
              <div className="photo-circle">
                {imageprofile ? (
                  <input
                    type="image"
                    src={require(`./image/${image}`)}
                    alt=""
                    className="customer-pic customer-photo"
                    ref={userimage}
                    onClick={() => {
                      displayList();
                    }}
                  />
                ) : (
                  <input
                    type="image"
                    src={require(`./image/image1jpg.png`)}
                    alt=""
                    className="customer-pic customer-photo"
                    ref={userimage}
                    onClick={() => {
                      displayList();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="user-options">
              <div className="photo-click" style={listStyle}>
                <div className="display-element">
                  <div className="set-element">
                    <div className="profile">
                      <Link className="a-decoration" to="/Profile">
                        <div className="headericons">
                          <div>
                            <FaUser />
                          </div>
                          <div>Profile</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="set-element">
                    <div className="setting">
                      <a href="#" className="a-decoration">
                        <div className="headericons">
                          <div>
                            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                          </div>
                          <div>Setting</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="set-element">
                    <div className="logout">
                      <Link
                        onClick={() => {
                          signout();
                        }}
                        className="a-decoration"
                        to="/"
                      >
                        <div className="headericons">
                          <div>
                            <FaSignOutAlt />
                          </div>
                          <div className="logouts">Logout</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-bar-c">
        <div className="input-search-responsive">
          <div className="post-responsive">
            <FaPlusCircle />
            {/* <i className="fas fa-plus-circle search-icon"></i> */}
          </div>
          <div className="search-responsive-contant">
            <div className="search-responsive">
              <FaSearch />
              {/* <i className="fas fa-search search-icon"></i> */}
            </div>
          </div>
          <div className="message-responsive">
            <FaEnvelopeOpenText />
            {/* <i className="fas fa-envelope-open-text search-icon"></i> */}
          </div>
        </div>
      </div>
      {/* <div className="nav-bar-b">
        <div className="column-one">
          <div className="part-one">
            <div className="order-logo">
              <a href="#" className="social">
                <FaShoppingBasket />
                <i className="fas fa-shopping-basket basket-icon"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="part-two">
          <div className="social-logo">
            <a href="#" className="social">
              <FaGripHorizontal />
              <i className="fas fa-grip-horizontal horizontal-icon"></i>
            </a>
          </div>
        </div>
      </div> */}
    </nav>
  );
}
