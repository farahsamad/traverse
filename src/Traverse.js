import React, { useState, useEffect, useContext } from "react";
import Header from "./Header.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./traverse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonContext from "./context/app-context";
import axios from "axios";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import Commentlist from "./interaction/Commentlist.js";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { FollowerPost, Likefunction, Userlike, Likeload } from "./Api.js";
import { Followernbr } from "./Api.js";
import { useLoaderData } from "react-router-dom";

export function Postloader() {
  var id = JSON.parse(localStorage.getItem("ID"));
  return FollowerPost(id);
}

export default function Traverse() {
  const [userdata, setUserdata] = useState([]);
  const [nullpost, setNullpost] = useState(true);
  const usedata = useLoaderData();

  const { id, name, image, postid, loggedin, commentclick } =
    useContext(PersonContext);

  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);
  useEffect(() => {
    // console.log(
    //   "container height" +
    //     document.getElementById("traverseContainer").offsetHeight
    // );
    let containerheight =
      document.getElementById("traverseContainer").offsetHeight;
    if (containerheight < window.innerHeight) {
      document.getElementById("traverseContainer").style.height = "100%";
    } else if (containerheight > window.innerHeight) {
      document.getElementById("traverseContainer").style.height = "fit-Content";
    } else if (
      document.getElementById(`commentlayer${postid}`).style.display == "block"
    ) {
      document.getElementById("traverseContainer").style.height = "100%";
    }
  });

  useEffect(() => {
    async function FollowerPostloader() {
      const returnedUserdata = await FollowerPost(id);
      console.log("returnedUserdata ", returnedUserdata);
      setUserdata(returnedUserdata.result);
    }
    FollowerPostloader();
  }, [id]);

  useEffect(() => {
    async function Followernbrloader() {
      const returnedFollowernumber = await Followernbr(id);
      console.log(
        "returnedFollowernumber.nopost",
        returnedFollowernumber.nopost
      );
      setNullpost(returnedFollowernumber.nopost);
      if (nullpost == false) {
        let widonwheight = window.innerHeight;
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      }
    }
    Followernbrloader();
  }, [id]);

  useEffect(() => {
    if (nullpost == false) {
      document.getElementById("traverseContainer").style.height = "inherit";
    }
  }, [nullpost, id]);

  async function clicklike(id, pid) {
    await Likeload(id, pid);
  }

  function likerender(id, pid) {
    async function Likeloader() {
      const likereturn = await Likefunction(id, pid);
      // console.log("likereturn.data", likereturn.data);
      if (likereturn.data == 1) {
        document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
      } else if (likereturn.data == 0) {
        document.getElementById(`buttonLike${pid}`).style.color = "black";
      }
    }
    Likeloader();
  }

  // function windowonclick(pid) {
  //   console.log("..................................", pid);
  //   window.onclick = function (event) {
  //     if (
  //       document.getElementsByName(`commentlayer${pid}`).style.display ===
  //       "block"
  //     ) {
  //       if (event.target != document.getElementsByName(`commentlayer${pid}`)) {
  //         document.getElementsByName(`commentlayer${pid}`).style.display =
  //           "none";
  //       }
  //     }
  //   };
  // }
  const ppid = postid;
  useEffect(() => {
    window.onclick = function (event) {
      if (postid != null) {
        if (
          document.getElementById(`commentlayer${postid}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`commentlayer${postid}`) ||
            event.target == document.getElementById(`buttonLike${postid}`) ||
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
        } else {
          document.getElementById(`commentlayer${postid}`).style.display =
            "none";
          document.getElementById(`uploadpost${postid}`).style.position = "";
          localStorage.removeItem("PID");
        }
      }
    };
  });

  //   async function displaycomment(pid, imag) {
  //   await Functiondisplaycomment(id, pid, imag, commentclick, setUserpost);
  // }

  async function displaycomment(pid, image) {
    localStorage.removeItem("PID");
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    if (image == true) {
      document.getElementById(`uploadpost${pid}`).style.position = "relative";
      var divwidth = document.getElementById(`secondlayer${pid}`).offsetWidth;
      var upwidth = divwidth / 1.5;
      // console.log("div width", upwidth);
      var widonwwidth = window.innerWidth;
      if (widonwwidth >= 500) {
        console.log("biiiiiiiiiiiiiiggggggggggggggggerrrrrrrrrrr");
        document.getElementById(`commentlayer${pid}`).style.marginTop =
          "-" + upwidth + "px";
      } else {
        var upwidth = divwidth / 1.2;
        document.getElementById(`commentlayer${pid}`).style.marginTop =
          "-" + upwidth + "px";
      }

      document.getElementById(`commentlayer${pid}`).style.width = "100%";
      window.onclick = function (event) {
        if (event.target == document.getElementById(`buttonLike${pid}`)) {
          console.log("///////////////////////////////////////");
        }
      };
    }
    if (
      document.getElementById(`commentlayer${pid}`).style.display === "block"
    ) {
      async function FollowerPostsloader() {
        const returnedUserdata = await FollowerPost(id);
        commentclick(pid);
        setUserdata(returnedUserdata.result);
      }
      FollowerPostsloader();
    }
  }

  if (userdata == null) {
    // console.log(".............................");
    var datalength = false;
  } else if (userdata.length > 0) {
    // console.log(".............................");
    var datalength = true;
  }

  // console.log("userdataaaaaaaaaaaaaaa", userdata);
  return (
    <div className="traverse-container" id="traverseContainer">
      <Header />
      <div className="container">
        <div className="post-container">
          {datalength ? (
            userdata.map((data) => {
              const pid = data.PID;
              var image = false;
              if (data.picture != "") {
                image = true;
              }
              var commentvalue = 0;
              // console.log("mmmmmmmmmmmmmm", datalength);

              return (
                <div
                  className="upload-post"
                  id={`uploadpost${data.PID}`}
                  key={data.PID}
                >
                  <div className="first-layer">
                    <div className="uploader">
                      <div className="uploader-photo">
                        <img
                          src={require(`./image/${data.followingpic}`)}
                          alt=""
                          className="uploader-image"
                        />
                      </div>
                      <div className="upload-time-name">
                        <div className="uploader-name">
                          <a href="#" className="a-decoration">
                            {data.followingname}
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
                    {image && (
                      <div className="posted-image-container">
                        <div className="posted-image">
                          <a href="#">
                            <img
                              src={require(`./image/${data.picture}`)}
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
                            id={`buttonLike${pid}`}
                            onClick={() => {
                              displaycomment(data.PID, image);
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
                  <form
                    method="post"
                    className="commant-layer-container"
                    id={`commentlayer${data.PID}`}
                  >
                    <Commentlist
                      id={id}
                      pid={data.PID}
                      cmt={userdata}
                      postid={ppid}
                      image={image}
                      commentvalue={commentvalue}
                      displaycomments={() => {
                        displaycomment(pid, image);
                      }}
                    />
                  </form>
                </div>
              );
            })
          ) : nullpost ? (
            <SkeletonTheme baseColor="#857875" highlightColor="#4444">
              <p>
                <Skeleton count={20} className="skeletonclass" />
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
