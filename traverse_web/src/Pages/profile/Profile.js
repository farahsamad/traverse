import React, { useContext, useEffect, useState, createContext } from "react";
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
import Commentlist from "../interaction/Commentlist";
import axios from "axios";
import {
  Functiondisplaycomment,
  FollowerPost,
  Mypost,
  Likefunction,
  Likeload,
  Savefunction,
  Saveload,
  Deletepost,
} from "../../component/Api/Api";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const {
    id,
    name,
    image,
    postid,
    bio,
    names,
    tag,
    loggedin,
    commentclick,
    tagednamesClick,
  } = useContext(PersonContext);

  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);
  const [tagedperson, setTagedperson] = useState([]);
  const [postID, setPostID] = useState("");
  // const [tagid, setTagid] = useState("");
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
    localStorage.removeItem("tags");
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

  useEffect(() => {
    window.onclick = function (event) {
      // console.log("window onclick:  ", event.target);
      const setting = JSON.parse(localStorage.getItem("setting"));
      // console.log("setting:  ", setting);

      if (postid != null) {
        if (
          document.getElementById(`commentlayer${postid}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`commentlayer${postid}`) ||
            event.target == document.getElementById(`buttoncomment${postid}`) ||
            event.target == document.getElementById(`commenttext${postid}`) ||
            event.target == document.getElementById(`commentsend${postid}`) ||
            event.target == document.getElementById(`commentlist${postid}`) ||
            event.target == document.getElementById(`commentername${postid}`) ||
            event.target ==
              document.getElementById(`commententeredtext${postid}`) ||
            event.target == document.getElementById(`commenttime${postid}`) ||
            event.target == document.getElementById(`commenterinfo${postid}`) ||
            event.target == document.getElementById(`commenterimage${postid}`)
          ) {
            document.getElementById(`commentlayer${postid}`).style.display =
              "block";
          } else {
            document.getElementById(`commentlayer${postid}`).style.display =
              "none";
            document.getElementById(`uploadpost${postid}`).style.position = "";
            localStorage.removeItem("PID");
          }
        }
        if (
          document.getElementById(`commentlayer${postid}`).style.display !=
          "block"
        ) {
          document.getElementById(`commentlayer${postid}`).style.display =
            "none";
          document.getElementById(`uploadpost${postid}`).style.position = "";
          localStorage.removeItem("PID");
        }
      }
      if (setting != null) {
        if (
          document.getElementById(`imagesetting${setting}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`imagesetting${setting}`) ||
            event.target == document.getElementById(`settingdot${setting}`)
          ) {
            document.getElementById(`imagesetting${setting}`).style.display =
              "block";
          } else {
            document.getElementById(`imagesetting${setting}`).style.display =
              "none";
            localStorage.removeItem("setting");
          }
        } else {
          if (
            document.getElementById(`tagContainer${setting}`).style
              .visibility != "visible"
          ) {
            localStorage.removeItem("setting");
          }
          // console.log("66666666666666666");
          document.getElementById(`imagesetting${setting}`).style.display =
            "none";
        }
      }

      if (tag != null) {
        // console.log("11111111111111");
        setTimeout((i = 0) => {
          i = i + 1;
        }, 800);
        if (
          document.getElementById(`tagContainer${tag}`).style.visibility ==
          "visible"
        ) {
          // console.log("2222222222222");

          if (
            event.target == document.getElementById(`tagContainer${tag}`) ||
            event.target == document.getElementById(`tagperson${tag}`) ||
            event.target == document.getElementById(`usernameTag${tag}`)
          ) {
            // console.log("333333333333333");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "visible";
          } else {
            // console.log("44444444444444444444");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "hidden";
            localStorage.removeItem("setting");
          }
        } else {
          // document.getElementById(`tagContainer${setting}`).style.visibility =
          //   "hidden";
          // localStorage.removeItem("setting");
        }
      }
      if (
        document.getElementById("editpostcontainer").style.visibility ==
        "visible"
      ) {
        if (event.target === document.getElementById("secondEditContainer")) {
          document.getElementById("editpostcontainer").style.visibility =
            "hidden";
        } else {
          document.getElementById("editpostcontainer").style.visibility =
            "visible";
        }
      }
    };
  });

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
    const postid = JSON.parse(localStorage.getItem("PID"));
    // console.log("44444444444444");

    if (postid != null && postid != pid) {
      // console.log("555555555");

      if (
        document.getElementById(`commentlayer${postid}`).style.display ==
        "block"
      ) {
        // console.log("11111111111111");
        document.getElementById(`commentlayer${postid}`).style.display = "none";
        document.getElementById(`commentlayer${pid}`).style.display = "block";
        document.getElementById(`profilepost${pid}`).style.position =
          "relative";
        localStorage.setItem("PID", JSON.stringify(pid));
      } else {
        localStorage.setItem("PID", JSON.stringify(pid));
        document.getElementById(`commentlayer${pid}`).style.display = "block";
        document.getElementById(`profilepost${pid}`).style.position =
          "relative";
      }
    }
    if (postid == pid) {
      // console.log("2222222222222222");

      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`profilepost${pid}`).style.position = "relative";
    }
    if (postid == null) {
      // console.log("333333333333333333");

      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`profilepost${pid}`).style.position = "relative";
      localStorage.setItem("PID", JSON.stringify(pid));
    }
    if (imag == true) {
      var divwidth = document.getElementById(`secondlayer${pid}`).offsetWidth;
      var upwidth = divwidth / 1.5;
      var totalmargin = upwidth - 222;
      document.getElementById(`commentlayer${pid}`).style.marginTop =
        "+" + totalmargin + "px";

      document.getElementById(`commentlayer${pid}`).style.width = "100%";
      window.onclick = function (event) {
        if (event.target == document.getElementById(`buttoncomment${pid}`)) {
          // console.log("///////////////////////////////////////");
        }
      };
    } else {
      window.onclick = function (event) {
        if (event.target == document.getElementById(`buttoncomment${pid}`)) {
          // console.log("///////////////////////////////////////");
        }
      };
    }
    if (
      document.getElementById(`commentlayer${pid}`).style.display === "block"
    ) {
      async function FollowerPostsloader() {
        // console.log("999999999999999999999999999999999999");

        setTimeout((i = 0) => {
          i = i + 1;
        }, 500);

        const returnedUserdata = await Mypost(id);
        commentclick(pid);
        setUserpost(returnedUserdata.result);
        // postRender();
      }
      FollowerPostsloader();
    }
    // await Functiondisplaycomment(id, pid, imag, commentclick, setUserpost);
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

  async function DisplayTagedPerson(names, pid) {
    var array = names.split(" ");
    tagednamesClick(array, pid);
    // setTagid(pid);
    // setTagedperson(array);

    // const post = JSON.parse(localStorage.getItem("setting"));
    const post = tag;
    if (post != null)
      document.getElementById(`tagContainer${post}`).style.visibility =
        "hidden";
    if (post != null && post != pid) {
      // localStorage.setItem("setting", JSON.stringify(pid));
      document.getElementById(`tagContainer${post}`).style.visibility =
        "visible";
    }
    if (post === pid) {
      document.getElementById(`tagContainer${post}`).style.visibility =
        "visible";
    }
    if (post === null) {
      // localStorage.setItem("setting", JSON.stringify(pid));
      // setTimeout((i = 0) => {
      //   i = i + 1;
      // }, 800);
      // document.getElementById(`tagContainer${post}`).style.visibility =
      //   "visible";
      // document.getElementById(`tagContainer${pid}`).style.visibility =
      //   "visible";
      // localStorage.setItem("setting", JSON.stringify(pid));
    }
  }

  //  useEffect(() => {
  //    axios
  //      .post("http://localhost/traverse-backend/follower.php", { username })
  //      .then((data) => {
  //        // console.log("thisssssssssssssssssss follower: ", data);
  //        if (data != null) {
  //          data.data.map((datas) => {
  //            // console.log("image 2 ", datas.image);
  //            // console.log("id 2 ", datas.id);
  //            // console.log("name 2 ", username);
  //            // console.log("bio 2 ", datas.bio);
  //            setId(datas.id);
  //            setImage(datas.image);
  //            setBio(datas.bio);
  //          });
  //        }
  //      });
  //  }, [username]);

  if (userpost == null) {
    var postlength = false;
  } else if (userpost.length > 0) {
    var postlength = true;
  }
  console.log("userpost are: ", userpost);

  return (
    <div className="myprofile-container" id="myprofileContainer">
      <Leftbar />
      <div className="main-profile-container">
        <Topbar id={id} image={image} name={name} bio={bio} />
      </div>
      <div className="right-container" id="rightContainer">
        <div className="profile-post-container">
          {postlength ? (
            userpost.map((data) => {
              const pid = data.PID;
              var images = false;
              if (data.picture != "") {
                images = true;
              }
              var Istaged = false;
              var NumberOfTag = data.tagperson.split(" ").length - 1;
              if (NumberOfTag > 1) {
                Istaged = true;
              }
              if (Istaged === false) {
                var followingInfo = {
                  frinedname: data.tagperson,
                };
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
                          <div className="a-decoration username-tag">
                            {name}{" "}
                            {data.tagperson &&
                              (Istaged ? (
                                <>
                                  <div
                                    className="a-decoration username-tag"
                                    id={`usernameTag${data.PID}`}
                                  >
                                    with{" "}
                                    <div
                                      className="a-decoration tagperson-container"
                                      id={`tagperson${data.PID}`}
                                      onClick={() => {
                                        DisplayTagedPerson(
                                          data.tagperson,
                                          data.PID
                                        );
                                      }}
                                    >
                                      {NumberOfTag} person
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Link
                                  to={`/Friend/${data.tagperson}`}
                                  state={followingInfo}
                                  className="a-decoration tagperson-container"
                                >
                                  with {data.tagperson}
                                </Link>
                              ))}
                          </div>
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
                    <div className="like-counter count-container">
                      {data.likeCount}
                      <span className="comment-span">Likes</span>
                    </div>
                    <div className="comment-counter count-container">
                      {data.comentCount}
                      <span className="comment-span">Comments</span>
                    </div>
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
                            id={`buttoncomment${pid}`}
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
                  <form
                    method="post"
                    className="myprofile-commant-layer-container"
                    id={`commentlayer${pid}`}
                  >
                    <Commentlist
                      id={id}
                      pid={pid}
                      cmt={userpost}
                      postid={ppid}
                      image={images}
                      commentvalue={commentvalue}
                      displaycomments={() => {
                        displaycomment(pid, images);
                      }}
                    />
                  </form>
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
        className="taged-person-container"
        id={`tagContainer${tag}`}
        style={{ visibility: "hidden" }}
      >
        <div className="taged-pesron-div">
          {/* {tagedperson[0] && { tagedperson }}
           */}
          {names &&
            names.map((name, index) => {
              var isLastName = true;
              var isEmpty = true;
              if (index == names.length - 1) {
                isLastName = false;
              }
              if (index + 1 == names.length - 1) {
                isLastName = false;
              }
              if (name === "") {
                isEmpty = false;
              }
              var username = name;
              var followingInfo = {
                frinedname: username,
              };
              return (
                <div className="tag-name-container" key={index}>
                  {isEmpty && (
                    <>
                      <Link
                        to={`/Friend/${name}`}
                        state={followingInfo}
                        className="a-decoration taged-name-div"
                      >
                        {name}
                      </Link>
                      {isLastName && <hr className="tagged-name-hr" />}
                    </>
                  )}
                </div>
              );
            })}
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
