import React, { useContext, useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Topbar from "./Topbar";
import PersonContext from "../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import axios from "axios";
import { Functiondisplaycomment, Mypost, Likefunction, Likeload } from "../Api";

export default function Profile() {
  const { id, name, image, postid, bio, loggedin, commentclick } =
    useContext(PersonContext);
  console.log("bio", bio);
  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);

  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);

  useEffect(() => {
    async function userpostsloaders() {
      const userposts = await Mypost(id);
      console.log("my post", userposts.result);
      setUserpost(userposts.result);
      if (userposts.result.length === 0) {
        setZeropost(false);
      } else if (userposts.result.length !== 0) {
        setZeropost(true);
        let widonwheight = window.innerHeight;
        console.log("widonwheight", widonwheight);
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      }
    }
    userpostsloaders();
    let widonwheight = window.innerHeight;
    let containerheight = widonwheight - 222;
    console.log("widonwheight", widonwheight);
    console.log("containerheight", containerheight);
    document.getElementById("myprofileContainer").style.height =
      widonwheight + "px";
  }, [id]);

  function likerender(id, pid) {
    async function Likeloader() {
      const likereturn = await Likefunction(id, pid);
      if (likereturn.data == 1) {
        document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
      } else if (likereturn.data == 0) {
        document.getElementById(`buttonLike${pid}`).style.color = "black";
      }
    }
    Likeloader();
  }

  async function clicklike(id, pid) {
    await Likeload(id, pid);
  }

  const ppid = postid;

  async function displaycomment(pid, imag) {
    await Functiondisplaycomment(id, pid, imag, commentclick, setUserpost);
  }

  if (userpost == null) {
    console.log(".............................");
    var postlength = false;
  } else if (userpost.length > 0) {
    console.log(".............................");
    var postlength = true;
  }

  return (
    <div className="myprofile-container" id="myprofileContainer">
      <div className="main-profile-container">
        <Leftbar />
        <Topbar id={id} image={image} name={name} bio={bio} />
      </div>
      <div className="right-container" id="rightContainer">
        <div className="profile-post-container">
          {postlength ? (
            userpost.map((data) => {
              var images = false;
              if (data.picture != "") {
                images = true;
              }
              var commentvalue = 1;
              return (
                <div
                  className="profile-post"
                  key={data.PID}
                  id={`profilepost${data.PID}`}
                >
                  <div className="first-layer">
                    <div className="uploader">
                      <div className="uploader-photo">
                        <input
                          type="image"
                          src={require(`../image/${image}`)}
                          alt=""
                          className="uploader-image"
                        />
                      </div>
                      <div className="upload-time-name">
                        <div className="uploader-name">
                          <a href="#" className="a-decoration">
                            {name}
                          </a>
                        </div>
                        <div className="uploaded-time">
                          {data.difference}
                          {data.unit}
                        </div>
                      </div>
                    </div>
                    <div className="uploader-manage">
                      <div className="uploader-setting">...</div>
                    </div>
                  </div>
                  <div className="second-layer" id={`secondlayer${data.PID}`}>
                    {data.sentence && (
                      <div className="post-caption">{data.sentence}</div>
                    )}
                    {images && (
                      <div className="posted-image-container">
                        <div className="posted-image">
                          <a href="#">
                            <img
                              src={require(`../image/${data.picture}`)}
                              alt="pic"
                              className="uploaded-image"
                            ></img>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="third-layer">
                    <div className="react">
                      <div className="like">
                        <form method="post">
                          <i>
                            {likerender(id, data.PID)}
                            <FontAwesomeIcon
                              id={`buttonLike${data.PID}`}
                              className="pizza-icon"
                              onClick={() => {
                                clicklike(id, data.PID);
                              }}
                              icon={faEarth}
                            ></FontAwesomeIcon>
                          </i>
                        </form>
                      </div>
                      <div className="comment">
                        <i className="far fa-comment comment-logo">
                          <FaComment
                            id={`buttonLike${data.PID}`}
                            onClick={() => {
                              displaycomment(data.PID, images);
                            }}
                          />
                        </i>
                      </div>

                      <div className="share">
                        <i className="fa fa-send share-logo">
                          <FaShare />
                        </i>
                      </div>
                    </div>
                    <div className="save">
                      <FaRegBookmark />
                    </div>
                  </div>
                  <Comment
                    id={id}
                    pid={data.PID}
                    userpost={userpost}
                    ppid={ppid}
                    images={images}
                    commentvalue={commentvalue}
                    displaycomment={displaycomment}
                    postid={postid}
                  />
                </div>
              );
            })
          ) : zeropost ? (
            <SkeletonTheme
              className="SkeletonThemecontainer"
              baseColor="#857875"
              highlightColor="#4444"
            >
              <p>
                <Skeleton count={20} className="skeletonprofileclass" />
              </p>
            </SkeletonTheme>
          ) : (
            <div id="nofollowercontainer"></div>
          )}
        </div>
      </div>
    </div>
  );
}
