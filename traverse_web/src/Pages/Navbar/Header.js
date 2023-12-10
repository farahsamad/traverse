import React, { useState, useRef, useEffect, useContext } from "react";
import "../../component/styles/traverse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  faSearch,
  faGear,
  faBell,
  faArrowRightFromBracket,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import PersonContext from "../../context/app-context";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [display, setDisplay] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [home, setHome] = useState(false);
  const navigate = useNavigate();
  const currentlocation = useLocation().pathname;
  useEffect(() => {
    if (currentlocation == "/Traverse") {
      setHome(true);
    } else {
      setHome(false);
    }
  }, [home]);

  const userimage = useRef();

  function displayList() {
    setDisplay(!display);
  }

  const { id, name, image } = useContext(PersonContext);

  const NavStyle = {
    borderBottom: "1px solid white",
    color: "white",
  };

  var imageprofile = image;
  if (image === "false") {
    var imageprofile = false;
  }

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
    <>
      <nav className="main-container">
        <div className="nav-bar-a">
          <div className="logo">
            <div className="traverse-logo">
              <h1 className="traverse-h">Traverse</h1>
            </div>
          </div>
          <div className="header-icons-container">
            <div className="header-icons-containers">
              <div
                className="header-icons"
                onClick={() => {
                  setHome(true);
                }}
              >
                <NavLink
                  to="."
                  className="a-decoration icon-link"
                  // style={home ? NavStyle : null}
                  style={({ isActive }) => (isActive && home ? NavStyle : null)}
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    className="headerIcons"
                    style={{ "--fa-secondary-opacity": "0.9" }}
                  />
                </NavLink>
              </div>
              <div
                className="header-icons"
                onClick={() => {
                  setHome(false);
                }}
              >
                <NavLink
                  style={({ isActive }) => (isActive ? NavStyle : null)}
                  to="Message"
                  className="a-decoration icon-link"
                >
                  <FontAwesomeIcon
                    className="headerIcons"
                    icon={faEnvelope}
                    style={{ "--fa-secondary-opacity": "0.9" }}
                  />
                </NavLink>
              </div>
              <div
                className="header-icons"
                onClick={() => {
                  setHome(false);
                }}
              >
                <NavLink
                  to="Notification"
                  style={({ isActive }) => (isActive ? NavStyle : null)}
                  className="a-decoration icon-link"
                >
                  <FontAwesomeIcon
                    className="headerIcons"
                    icon={faBell}
                    style={{ "--fa-secondary-opacity": "0.9" }}
                  />
                </NavLink>
              </div>

              <div className="search-logo">
                <i
                  className="search-icon"
                  id="searchiconheader"
                  onClick={() => {
                    document.getElementById("searchContainer").style.display =
                      "block";
                    setSearchIcon((prev) => !prev);
                    // console.log("HELLO");
                  }}
                >
                  <NavLink
                    to="#"
                    style={searchIcon ? NavStyle : null}
                    className="a-decoration icon-link"
                  >
                    <FontAwesomeIcon
                      id="searchiconfont"
                      icon={faSearch}
                      className="headerIcons"
                    ></FontAwesomeIcon>
                  </NavLink>
                </i>
              </div>
            </div>
          </div>
          {/* <div className="search">
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
        </div> */}
          <div className="account-logo">
            <div className="account-container">
              <div className="photo-circle-container">
                <div className="photo-circle">
                  {imageprofile ? (
                    <input
                      type="image"
                      src={require(`../../image/${image}`)}
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
                      src={require(`../../image/Capture.png`)}
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
            </div>
            <div className="user-options">
              <div className="photo-click" style={listStyle}>
                <div className="display-element">
                  <div className="set-element">
                    <div className="profile">
                      <Link className="a-decoration" to="/Profile">
                        <div className="headericons">
                          <div className="icon-background">
                            <FaUser />
                          </div>
                          <div className="option-nav">Profile</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="set-element">
                    <div className="setting">
                      <a href="#" className="a-decoration">
                        <div className="headericons">
                          <div className="icon-background">
                            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                          </div>
                          <div className="option-nav">Setting</div>
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
                          <div className="icon-background">
                            {/* <FaSignOutAlt /> */}
                            <FontAwesomeIcon
                              icon={faArrowRightFromBracket}
                              style={{ color: "#000000" }}
                            />
                          </div>
                          <div className="logouts option-nav">Logout</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bar-c">
          <div className="input-search-responsive">
            <div
              className="header-icons-mobile"
              onClick={() => {
                setHome(true);
              }}
            >
              <NavLink
                to="."
                className="a-decoration icon-link-mobile"
                // style={home ? NavStyle : null}
                style={({ isActive }) => (isActive && home ? NavStyle : null)}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  className="headerIcons"
                  style={{ "--fa-secondary-opacity": "0.9" }}
                />
              </NavLink>
              {/* <i className="fas fa-plus-circle search-icon"></i> */}
            </div>
            <div
              className="header-icons-mobile"
              onClick={() => {
                setHome(false);
              }}
            >
              <NavLink
                to="Notification"
                onClick={() => {
                  setHome(false);
                }}
                style={({ isActive }) => (isActive ? NavStyle : null)}
                className="post-responsive icon-link-mobile"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="headerIcons"
                  style={{ "--fa-secondary-opacity": "0.9" }}
                />
                {/* <i className="fas fa-plus-circle search-icon"></i> */}
              </NavLink>
            </div>
            <div
              className="header-icons-mobile"
              onClick={() => {
                setHome(false);
              }}
            >
              <NavLink
                to="Search"
                onClick={() => {
                  setHome(false);
                }}
                style={searchIcon ? NavStyle : null}
                className="a-decoration icon-link-mobile"
              >
                <div className="search-responsive">
                  <FontAwesomeIcon
                    id="searchiconfont"
                    className="headerIcons"
                    icon={faSearch}
                  ></FontAwesomeIcon>
                  {/* <i className="fas fa-search search-icon"></i> */}
                </div>
              </NavLink>
            </div>

            <div
              className="header-icons-mobile"
              onClick={() => {
                setHome(false);
              }}
            >
              <NavLink
                onClick={() => {
                  setHome(false);
                }}
                style={({ isActive }) => (isActive ? NavStyle : null)}
                to="Message"
                className="a-decoration icon-link-mobile"
              >
                <div className="message-responsive">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ "--fa-secondary-opacity": "0.9" }}
                    className="headerIcons"
                  />
                  {/* <i className="fas fa-envelope-open-text search-icon"></i> */}
                </div>
              </NavLink>
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
    </>
  );
}
