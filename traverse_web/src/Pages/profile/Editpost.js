import React, { useState, useEffect } from "react";
import "../../component/styles/traverse.css";
import { Thispost, Updatepost } from "../../component/Api/Api";
import { useNavigate } from "react-router-dom";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Editpost({ id, PID }) {
  const [img, setImg] = useState("");
  const [picture, setPicture] = useState("Capture.png");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function editpostloaders() {
      const userposts = await Thispost(id, PID);
      userposts.result.map((data) => {
        setImg(data.picture);
        setCaption(data.sentence);
      });
    }
    editpostloaders();
  }, [id, PID]);

  // console.log("caption: ", caption);
  // console.log("image: ", img);
  var photo = picture;
  if (img != "") {
    photo = img;
  }

  function changeimage(e) {
    setImg(e.target.files[0].name);
    photo = picture;
    if (img != "") {
      photo = img;
    }
  }
  async function edit() {
    const state = "update";
    const updatereturn = await Updatepost(
      id,
      PID,
      img,
      caption,
      location,
      tag,
      state
    );
    if (updatereturn.result == "updated") {
      document.getElementById("editpostcontainer").style.visibility = "hidden";
      navigate(window.location.reload());
      // history.push(path.pathname);
    }
  }

  async function edits(event) {
    if (event.key === 13) {
      const state = "update";
      const updatereturn = await Updatepost(
        id,
        PID,
        img,
        caption,
        location,
        tag,
        state
      );
      if (updatereturn.result == "updated") {
        document.getElementById("editpostcontainer").style.visibility =
          "hidden";
        navigate(window.location.reload());
        // history.push(path.pathname);
      }
    }
  }

  async function displayuser() {
    //   const returnedusers = await Followinglist(id);
    //   setUsers(returnedusers.result);
    //   document.getElementById(
    //     "follower-user-container-add-page"
    //   ).style.display = "block";
  }

  return (
    <>
      <div
        className="close-container"
        onClick={() => {
          document.getElementById("editpostcontainer").style.visibility =
            "hidden";
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <form className="second-edit-post-container" id="secondEditContainer">
        <div className="third-edit-post-container ">
          <div className="edit-picture-conatiner">
            <label className="edit-label-add-page">
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
                className="edit-selected-photo"
              />
            </label>
          </div>
          <div className="edit-configuration-container">
            <div className="edit-enter-information">
              <div className="edit-caption">
                <input
                  type="text"
                  name="caption"
                  className="caption-input"
                  placeholder={caption}
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                />
              </div>
              <div className="edit-caption">
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
              <div className="edit-tag edit-caption" id="tagPerson">
                <div
                  className="edit-tag-user"
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
                className="edit-submit"
                onClick={(e) => {
                  e.preventDefault();
                  edit();
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                  edits();
                }}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
