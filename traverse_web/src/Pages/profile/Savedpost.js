import React, { useContext, useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Topbar from "./Topbar";
import PersonContext from "../../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import {
  Functiondisplaythiscomment,
  Likefunction,
  Likeload,
  Savefunction,
  Saveload,
  Savedposts,
} from "../../component/Api/Api";
import { Link } from "react-router-dom";

export default function Savedpost() {
  const { id, name, image, postid, bio, commentclick } =
    useContext(PersonContext);
  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);

  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);

  useEffect(() => {
    async function usersavedpostloader() {
      const returnedpost = await Savedposts(id);
      setUserpost(returnedpost.result);
      if (returnedpost.result.length === 0) {
        setZeropost(false);
      } else if (returnedpost.result.length !== 0) {
        setZeropost(true);
        let widonwheight = window.innerHeight;
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      }
    }
    usersavedpostloader();
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
    await Functiondisplaythiscomment(id, pid, imag, commentclick, setUserpost);
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
              var followingInfo = {
                friendid: data.followId,
                friendimage: data.followingpic,
                frinedname: data.followingname,
                friendbio: data.followingbio,
              };

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
                          src={require(`../../image/${data.followingpic}`)}
                          alt=""
                          className="uploader-image"
                        />
                      </div>
                      <div className="upload-time-name">
                        <div className="uploader-name">
                          <Link
                            to={`/Friend/${data.followingname}`}
                            state={followingInfo}
                            className="a-decoration"
                          >
                            {data.followingname}
                          </Link>
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
    </div>
  );
}
