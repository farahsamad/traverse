import React, { useState, useRef, useEffect, useContext } from "react";
import "../../component/styles/traverse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
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
              <div className="header-icons">
                <Link to="." className="a-decoration">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="headerIcons"
                    style={{ "--fa-secondary-opacity": "0.9" }}
                  />
                </Link>
              </div>
              <div className="header-icons">
                <Link to="Message" className="a-decoration">
                  <FontAwesomeIcon
                    className="headerIcons"
                    icon={faEnvelope}
                    style={{ "--fa-secondary-opacity": "0.9" }}
                  />
                </Link>
              </div>
              <div className="header-icons">
                <FontAwesomeIcon
                  className="headerIcons"
                  icon={faBell}
                  style={{ color: "#000000" }}
                />
              </div>

              <div className="search-logo">
                <i
                  className="search-icon"
                  id="searchiconheader"
                  onClick={() => {
                    document.getElementById("searchContainer").style.display =
                      "block";
                    console.log("HELLO");
                  }}
                >
                  <FontAwesomeIcon
                    id="searchiconfont"
                    icon={faSearch}
                    className="headerIcons"
                  ></FontAwesomeIcon>
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
                      src={require(`../../image/image1jpg.png`)}
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
            <div className="post-responsive">
              <Link to="." className="a-decoration">
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ "--fa-secondary-opacity": "0.9" }}
                />
              </Link>
              {/* <i className="fas fa-plus-circle search-icon"></i> */}
            </div>
            <Link to="/Traverse" className="post-responsive">
              <FontAwesomeIcon icon={faBell} style={{ color: "#000000" }} />
              {/* <i className="fas fa-plus-circle search-icon"></i> */}
            </Link>
            <Link
              to="Search"
              className="a-decoration search-responsive-contant"
            >
              <div className="search-responsive">
                <FontAwesomeIcon
                  id="searchiconfont"
                  icon={faSearch}
                ></FontAwesomeIcon>
                {/* <i className="fas fa-search search-icon"></i> */}
              </div>
            </Link>
            <div className="message-responsive">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ "--fa-secondary-opacity": "0.9" }}
              />
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
    </>
  );
}
