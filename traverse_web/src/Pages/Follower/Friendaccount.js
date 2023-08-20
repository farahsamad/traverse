import React, { useContext, useEffect, useState } from "react";
import PersonContext from "../../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "../profile/Comment";
import { useLocation } from "react-router-dom";
import {
  Mypost,
  Likeload,
  Likefunction,
  Functiondisplaycomment,
} from "../../component/Api/Api";

export default function Friendaccount({ props }) {
  const { postid, commentclick } = useContext(PersonContext);
  const location = useLocation();
  const friendData = location.state;
  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);
  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);
  let friendId = friendData.friendid;

  useEffect(() => {
    async function mypostloader() {
      const mypost = await Mypost(friendId);
      if (mypost.result.length == 0) {
        setZeropost(false);
        let widonwheight = window.innerHeight;
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      } else {
        setZeropost(true);
      }
      setUserpost(mypost.result);
    }
    mypostloader();
    let widonwheight = window.innerHeight;
    document.getElementById("myprofileContainer").style.height =
      widonwheight + "px";
  }, [friendId]);

  function likerender(friendId, pid) {
    async function Likeloader() {
      const likereturn = await Likefunction(friendId, pid);
      if (likereturn.data == 1) {
        document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
      } else if (likereturn.data == 0) {
        document.getElementById(`buttonLike${pid}`).style.color = "black";
      }
    }
    Likeloader();
  }

  async function clicklike(friendId, pid) {
    await Likeload(friendId, pid);
  }

  const ppid = postid;
  async function displaycomment(pid, imag) {
    await Functiondisplaycomment(
      friendId,
      pid,
      imag,
      commentclick,
      setUserpost
    );
  }

  if (userpost == null) {
    var postlength = false;
  } else if (userpost.length > 0) {
    var postlength = true;
  }

  return (
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
                        src={require(`../../image/${friendData.friendimage}`)}
                        alt=""
                        className="uploader-image"
                      />
                    </div>
                    <div className="upload-time-name">
                      <div className="uploader-name">
                        <a href="#" className="a-decoration">
                          {friendData.frinedname}
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
                          {likerender(friendId, data.PID)}
                          <FontAwesomeIcon
                            id={`buttonLike${data.PID}`}
                            className="pizza-icon"
                            onClick={() => {
                              clicklike(friendId, data.PID);
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
                  id={friendId}
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
  );
}
