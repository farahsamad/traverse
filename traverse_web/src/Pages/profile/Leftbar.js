import React from "react";
import "../../component/styles/traverse.css";
import { Link, useLocation } from "react-router-dom";
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
            <span
              id="post-word-left"
              className="post-word-animation-left"
            ></span>
            <div id="post-word" className="profile-word">
              <Link
                to="/Profile"
                id="post-word-list"
                className="a-decoration word-decoration"
              >
                <FaTable />
                <span className="remove-post">Posts</span>
              </Link>
            </div>
            <span
              id="post-word-bottom"
              className="post-word-animation-bottom"
            ></span>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="Add"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaPlusCircle />
                <span className="remove-post">Post</span>
              </Link>
            </div>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="Save"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaRegBookmark />
                <span className="remove-post">Save</span>
              </Link>
            </div>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="Photos"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaImages />
                <span className="remove-post">Photos</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="list-item-container">
          <div className="post-word-container">
            <span
              id="post-word-left"
              className="post-word-animation-left"
            ></span>
            <div id="post-word" className="profile-word">
              <Link
                to="/Profile"
                id="post-word-list"
                className="a-decoration word-decoration"
              >
                <FaTable />
                <span className="remove-post">Posts</span>
              </Link>
            </div>
            <span
              id="post-word-bottom"
              className="post-word-animation-bottom"
            ></span>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="../Add"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaPlusCircle />
                <span className="remove-post">Post</span>
              </Link>
            </div>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="../Save"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaRegBookmark />
                <span className="remove-post">Save</span>
              </Link>
            </div>
          </div>
          <div className="add-word-container">
            <div id="add-post-word" className="profile-word">
              <Link
                to="../Photos"
                id="add-word-list"
                className="a-decoration word-decoration"
              >
                <FaImages />
                <span className="remove-post">Photos</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
