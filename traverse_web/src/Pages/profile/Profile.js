import React, { useContext, useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Topbar from "./Topbar";
import Editpost from "./Editpost";
import PersonContext from "../../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import { faEarth, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import axios from "axios";
import {
  Functiondisplaycomment,
  Mypost,
  Likefunction,
  Likeload,
  Savefunction,
  Saveload,
  Deletepost,
} from "../../component/Api/Api";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { id, name, image, postid, bio, loggedin, commentclick } =
    useContext(PersonContext);
  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);
  const [postID, setPostID] = useState("");
  const navigate = useNavigate();

  async function displaysetting(pid) {
    const post = JSON.parse(localStorage.getItem("setting"));
    if (post != null && post != pid) {
      document.getElementById(`imagesetting${post}`).style.display = "none";
      document.getElementById(`imagesetting${pid}`).style.display = "block";
      localStorage.setItem("setting", JSON.stringify(pid));
    }
    if (post == pid) {
      document.getElementById(`imagesetting${pid}`).style.display = "block";
    }
    if (post == null) {
      document.getElementById(`imagesetting${pid}`).style.display = "block";
      localStorage.setItem("setting", JSON.stringify(pid));
    }
  }

  useEffect(() => {
    localStorage.removeItem("PID");
    localStorage.removeItem("setting");
  }, []);

  useEffect(() => {
    async function userpostsloaders() {
      const userposts = await Mypost(id);
      setUserpost(userposts.result);
      if (userposts.result.length === 0) {
        setZeropost(false);
      } else if (userposts.result.length !== 0) {
        setZeropost(true);
        let widonwheight = window.innerHeight;
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      }
    }
    userpostsloaders();
    let widonwheight = window.innerHeight;
    let containerheight = widonwheight - 222;
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

  function saverender(id, pid) {
    async function Saveloader() {
      const savereturn = await Savefunction(id, pid);
      if (savereturn.data == 1) {
        document.getElementById(`buttonSave${pid}`).style.color = "#22a900";
      } else if (savereturn.data == 0) {
        document.getElementById(`buttonSave${pid}`).style.color = "black";
      }
    }
    Saveloader();
  }

  async function clicklike(id, pid) {
    await Likeload(id, pid);
  }

  async function clicksave(id, pid) {
    await Saveload(id, pid);
  }

  const ppid = postid;

  async function displaycomment(pid, imag) {
    await Functiondisplaycomment(id, pid, imag, commentclick, setUserpost);
  }

  async function editpostfunction(PID) {
    setPostID(PID);
    setTimeout(() => {
      document.getElementById("editpostcontainer").style.visibility = "visible";
    }, 1500);
  }

  async function deletePost(pid) {
    const state = "delete";
    const deleteresult = await Deletepost(id, pid, state);
    if (deleteresult.result == "deleted") {
      navigate(window.location.reload());
    }
  }

  if (userpost == null) {
    var postlength = false;
  } else if (userpost.length > 0) {
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
                          src={require(`../../image/${image}`)}
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
                      <div className="uploader-setting">
                        <div
                          className="profile-post-setting"
                          id={`settingdot${data.PID}`}
                          onClick={() => {
                            displaysetting(data.PID);
                          }}
                        >
                          ...
                        </div>
                        <div className="image-setting-container">
                          <div
                            className="post-setting-click"
                            id={`imagesetting${data.PID}`}
                          >
                            <div className="display-element">
                              <div className="set-element">
                                <div className="profile">
                                  <Link className="a-decoration" to="#">
                                    <div
                                      className="headericons"
                                      onClick={() => {
                                        editpostfunction(data.PID);
                                      }}
                                    >
                                      <div className="icon-background">
                                        <FontAwesomeIcon icon={faEdit} />
                                      </div>
                                      <div className="option-nav">Edit</div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="line"></div>
                              <div className="set-element">
                                <div className="setting">
                                  <Link to="#" className="a-decoration">
                                    <div
                                      className="headericons delete-post"
                                      onClick={() => {
                                        deletePost(data.PID);
                                      }}
                                    >
                                      <div className="icon-background">
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                        ></FontAwesomeIcon>
                                      </div>
                                      <div className="option-nav">Delete</div>
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
                  <div className="second-layer" id={`secondlayer${data.PID}`}>
                    {data.sentence && (
                      <div className="post-caption">{data.sentence}</div>
                    )}
                    {images && (
                      <div className="posted-image-container">
                        <div className="posted-image">
                          <a href="#">
                            <img
                              src={require(`../../image/${data.picture}`)}
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
                            id={`buttoncomment${data.PID}`}
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
                      {saverender(id, data.PID)}
                      <FaRegBookmark
                        id={`buttonSave${data.PID}`}
                        className="save-icon"
                        onClick={() => {
                          clicksave(id, data.PID);
                        }}
                      />
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
              <Skeleton count={20} className="skeletonprofileclass" />
            </SkeletonTheme>
          ) : (
            <div id="nofollowercontainer"></div>
          )}
        </div>
      </div>
      <div
        className="edit-post-container"
        id="editpostcontainer"
        style={{ visibility: "hidden" }}
      >
        <Editpost id={id} PID={postID} />
      </div>
    </div>
  );
}
