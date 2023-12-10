import React from "react";
import "../../component/styles/traverse.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaPlusCircle, FaRegBookmark, FaTable, FaImages } from "react-icons/fa";

export default function Leftbar() {
  const currentlocation = useLocation().pathname;
  if (currentlocation == "/Profile") {
    var directTo = true;
  } else {
    directTo = false;
  }

  return (
    <div className="left-side-container">
      <div className="traverse">
        <Link to="/Traverse" className="a-decoration">
          Traverse
        </Link>
      </div>
      {directTo ? (
        <div className="list-item-container">
          <div className="post-word-container">
            <NavLink
              to="/Profile"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="post-word" className="profile-word">
                <div
                  id="post-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaTable />
                  <span className="remove-post">Posts</span>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="add-word-container">
            <NavLink
              to="Add"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaPlusCircle />
                  <span className="remove-post">Post</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="add-word-container">
            <NavLink
              to="Save"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaRegBookmark />
                  <span className="remove-post">Save</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="add-word-container">
            <NavLink
              to="Photos"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaImages />
                  <span className="remove-post">Photos</span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="list-item-container">
          <div className="post-word-container">
            <NavLink to="/Profile">
              <div id="post-word" className="profile-word">
                <div
                  id="post-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaTable />
                  <span className="remove-post">Posts</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="add-word-container">
            <NavLink
              to="../Add"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaPlusCircle />
                  <span className="remove-post">Post</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="add-word-container">
            <NavLink
              to="../Save"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaRegBookmark />
                  <span className="remove-post">Save</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="add-word-container">
            <NavLink
              to="../Photos"
              id="navlink-container"
              className={({ isActive }) =>
                isActive ? "post-word-animation-bottom " : null
              }
            >
              <div id="add-post-word" className="profile-word">
                <div
                  id="add-word-list"
                  className="a-decoration word-decoration"
                >
                  <FaImages />
                  <span className="remove-post">Photos</span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
