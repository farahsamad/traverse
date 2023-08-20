import React, { useState, useContext } from "react";
import "../../component/styles/traverse.css";
import PersonContext from "../../context/app-context";
import { FaArrowLeft, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { uploadpost, Followinglist } from "../../component/Api/Api";
import $ from "jquery";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Addpost() {
  const { id } = useContext(PersonContext);
  const [img, setImg] = useState("");
  const [picture, setPicture] = useState("Capture.png");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function changeimage(e) {
    setImg(e.target.files[0].name);
  }

  async function upload() {
    const uploadreturn = await uploadpost(id, img, caption, location, tag);
    if (uploadreturn.result == "uploaded") {
      navigate("/Profile");
    }
  }

  async function returnBack() {
    document.getElementById("phone-post-page").style.display = "block";
    document.getElementById("phone-information-add-page").style.display =
      "none";
    document.getElementById("phone-add-page-nav").style.display = "none";
  }

  async function photoChoosed() {
    document.getElementById("phone-post-page").style.display = "none";
    document.getElementById("phone-information-add-page").style.display =
      "block";
    document.getElementById("phone-add-page-nav").style.display = "block";
  }

  if (tag.length != 0) {
    $("#tagUser").html(
      tag.map((data) => {
        var nameselected = data + "\n";
        return nameselected;
      })
    );
  }
  if (tag.length != 0) {
    $("#tagUsers").html(
      tag.map((data) => {
        var nameselected = data + "\n";
        return nameselected;
      })
    );
  }

  // if (window.innerWidth < "500") {
  //   document.getElementById("phone-add-page-nav").style.display = "none";
  // }
  // if (window.innerWidth >= "500") {
  //   document.getElementById("phone-add-page-nav").style.display = "block";
  // }

  async function displayuser() {
    const returnedusers = await Followinglist(id);
    setUsers(returnedusers.result);
    document.getElementById("follower-user-container-add-page").style.display =
      "block";
  }

  async function displayusers() {
    const returnedusers = await Followinglist(id);
    setUsers(returnedusers.result);
    document.getElementById(
      "phone-follower-user-container-add-page"
    ).style.display = "block";
  }

  window.onclick = function (event) {
    if (
      document.getElementById("follower-user-container-add-page").style
        .display == "block"
    ) {
      if (
        event.target == document.getElementById("tageddpersonname") ||
        event.target == document.getElementById("tageddpersonphoto") ||
        event.target == document.getElementById("followerNameList") ||
        event.target == document.getElementById("taggedName")
        //       && event.target != document.getElementById(
        // "tagUsers"
        //       )
      ) {
        document.getElementById(
          "follower-user-container-add-page"
        ).style.display = "block";
      } else {
        document.getElementById(
          "follower-user-container-add-page"
        ).style.display = "none";
      }
    } else {
      document.getElementById(
        "follower-user-container-add-page"
      ).style.display = "none";
    }

    if (
      document.getElementById("phone-follower-user-container-add-page").style
        .display == "block"
    ) {
      if (
        event.target == document.getElementById("tageddpersonnames") ||
        event.target == document.getElementById("tageddpersonphotos") ||
        event.target == document.getElementById("followerNameLists") ||
        event.target == document.getElementById("taggedNames")
        //       && event.target != document.getElementById(
        // "tagUsers"
        //       )
      ) {
        document.getElementById(
          "phone-follower-user-container-add-page"
        ).style.display = "block";
      } else {
        document.getElementById(
          "phone-follower-user-container-add-page"
        ).style.display = "none";
      }
    } else {
      document.getElementById(
        "phone-follower-user-container-add-page"
      ).style.display = "none";
    }
  };

  var photo = picture;
  if (img != "") {
    photo = img;
  }
  return (
    <>
      <div className="post-page-container">
        <div className="add-post-container">
          <div className="picture-conatiner">
            <label className="label-add-page">
              <input
                type="file"
                className="selecte-photo"
                onChange={(e) => changeimage(e)}
                name="user_image"
                hidden
              />
              <img
                src={require(`../../image/${photo}`)}
                alt="pic"
                className="selected-photo"
              />
            </label>
          </div>
          <div className="configuration-container">
            <div className="enter-information">
              <div className="caption add-page-input">
                <input
                  type="text"
                  name="caption"
                  className="caption-input"
                  placeholder="Enter caption"
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                />
              </div>
              <div className="retaurant-name add-page-input">
                <input
                  type="text"
                  name="location"
                  className="restaurant-input"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
              <div className="tag-person add-page-input" id="tagPerson">
                <div
                  className="tag-user"
                  id="tagUser"
                  onClick={() => {
                    displayuser();
                  }}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  Tag user
                </div>
                <div
                  className="follower-name"
                  id="follower-user-container-add-page"
                  style={{ display: "none" }}
                >
                  <div className="follower-name-list" id="followerNameList">
                    {users.map((data) => {
                      return (
                        <div
                          className="tagged-person-name-container"
                          id="taggedName"
                          key={data.FID}
                          value={tag}
                          onClick={() => {
                            setTag((prev) => [...prev, data.followername]);
                          }}
                          // onClick={() => {
                          //   selectPerson();
                          // }}
                        >
                          <div className="tagged-person-photo-container">
                            <input
                              type="image"
                              src={require(`../../image/${data.followerimage}`)}
                              alt=""
                              className="tagged-person-photo"
                              id="taggedpersonphoto"
                            />
                          </div>
                          <div
                            className="tagged-person-name"
                            id="tageddpersonname"
                          >
                            {data.followername}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                className="submit"
                onClick={() => {
                  upload();
                }}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="phone-post-page-container" id="phone-post-page">
        <div className="phone-post-page-nav">
          <div className="phone-post-nav-icon-container">
            <Link className="a-decoration" id="close-icon"></Link>
            <div
              onClick={() => {
                photoChoosed();
              }}
              className=" right-arrow"
              id="right-icon"
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="phone-picture-conatiner">
          <label>
            <input
              type="file"
              name="phone-user_image"
              className="phone-selecte-photo"
              onChange={(e) => changeimage(e)}
              hidden
            />
            <img
              src={require(`../../image/${photo}`)}
              alt="pic"
              className="phone-selected-photo"
            />
          </label>
        </div>
      </div>

      <div
        className="phone-post-enter-information-container"
        id="phone-information-add-page"
      >
        <div
          className="phone-post-page-nav"
          id="phone-add-page-nav"
          style={{ display: "none" }}
        >
          <div className="phone-post-nav-icon-container">
            <div
              onClick={() => {
                returnBack();
              }}
              className=" right-arrow"
              id="left-icon"
            >
              <FaArrowLeft />
            </div>
            <div
              onClick={() => {
                upload();
              }}
              className=" right-arrow"
              id="submit-icon"
            >
              <FaCheckCircle />
            </div>
          </div>
        </div>
        <div className="phone-add-post-container">
          <div className="caption info-input">
            <input
              type="text"
              name=""
              className="phone-caption"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </div>
          <div className="retaurant-name info-input">
            <input
              type="text"
              name=""
              className="phone-restaurant-name"
              placeholder="Enter location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div className="tag-person info-input" id="tagPersons">
            <div
              className="tag-users"
              id="tagUsers"
              onClick={() => {
                displayusers();
              }}
              style={{ whiteSpace: "pre-wrap" }}
            >
              Tag user
            </div>
            <div
              className="phone-follower-name"
              id="phone-follower-user-container-add-page"
              style={{ display: "none" }}
            >
              <div className="phone-follower-name-list" id="followerNameLists">
                {users.map((data) => {
                  return (
                    <div
                      className="phone-tagged-person-name-container"
                      id="taggedNames"
                      key={data.FID}
                      value={tag}
                      onClick={() => {
                        setTag((prev) => [...prev, data.followername]);
                      }}
                      // onClick={() => {
                      //   selectPerson();
                      // }}
                    >
                      <div className="phone-tagged-person-photo-container">
                        <input
                          type="image"
                          src={require(`../../image/${data.followerimage}`)}
                          alt=""
                          className="phone-tagged-person-photo"
                          id="taggedpersonphotos"
                        />
                      </div>
                      <div
                        className="phone-tagged-person-name"
                        id="tageddpersonnames"
                      >
                        {data.followername}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
