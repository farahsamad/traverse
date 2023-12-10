import React, { useEffect, useState } from "react";
import "../../component/styles/traverse.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FunctionMyfollower } from "../../component/Api/Api";

export default function Topbar({ id, image, name, bio }) {
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followerid, setFollowerid] = useState([]);
  const [followingid, setFollowingid] = useState([]);
  const [countfollower, setCountfollower] = useState();
  const [countfollowing, setCountollowing] = useState();
  const [followerdisplays, setFollowerdisplays] = useState(0);
  const [followingdisplays, setFollowingdisplays] = useState(0);

  function displayfollowerlist() {
    document.getElementById("followerContanier").style.display = "block";
    setFollowerdisplays(1);
    setFollowingdisplays(0);
  }
  function displayfollowinglist() {
    document.getElementById("followingContanier").style.display = "block";
    setFollowingdisplays(1);
    setFollowerdisplays(0);
  }

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (followingdisplays === 1) {
        document.getElementById("followerContanier").style.display = "none";
        setFollowerdisplays(0);
        if (
          event.target === document.getElementById("followingContanier") ||
          event.target === document.getElementById("taggednamecontainer") ||
          event.target === document.getElementById("following-number-info") ||
          event.target === document.getElementById("followingpersonremove") ||
          event.target === document.getElementById("followingpersonname")
        ) {
          document.getElementById("followingContanier").style.display = "block";
        } else {
          document.getElementById("followingContanier").style.display = "none";
          setFollowingdisplays(0);
        }
      }
      if (followerdisplays === 1) {
        document.getElementById("followingContanier").style.display = "none";
        setFollowingdisplays(0);
        if (
          event.target === document.getElementById("followerContanier") ||
          event.target ===
            document.getElementById("taggedfollowernamecontainer") ||
          event.target === document.getElementById("follower-number-info") ||
          event.target === document.getElementById("followerpersonremove") ||
          event.target === document.getElementById("followerpersonname")
        ) {
          document.getElementById("followerContanier").style.display = "block";
        } else {
          document.getElementById("followerContanier").style.display = "none";
        }
      }
    });
  }, [followerdisplays, followingdisplays]);

  async function functionMyfollowerloader() {
    await FunctionMyfollower(
      id,
      setCountfollower,
      setCountollowing,
      setFollower,
      setFollowing
    );
  }

  useEffect(() => {
    functionMyfollowerloader();
  }, [id]);

  var imageprofile = image;
  if (image === "false") {
    var imageprofile = false;
  }

  return (
    <div className="account-contant">
      <div className="profile-container">
        <div className="profile-layer-one">
          {imageprofile ? (
            <input
              type="image"
              src={require(`../../image/${image}`)}
              alt=""
              className="customer-profile-photo"
            />
          ) : (
            <input
              type="image"
              src={require(`../../image/Capture.png`)}
              alt=""
              className="customer-profile-photo"
            />
          )}
        </div>
        <div className="profile-layer-two">
          <div className="profile-layer-container">
            <div className="profile-name">{name}</div>
            <div className="follow-container">
              <div
                className="follower-container"
                id="followerlistcontainer"
                onClick={() => {
                  displayfollowerlist();
                }}
              >
                <div className="follower-number number-font">
                  {countfollower}
                  <div className="my-follower-name" id="followerContanier">
                    <div className="follower-name-list">
                      {follower.map((result) => {
                        // var friendname = result.followingname;
                        var friendinformation = {
                          friendid: result.followingid,
                          friendimage: result.followerimage,
                          frinedname: result.followername,
                          friendbio: result.followerbio,
                        };
                        return (
                          <div
                            className="tagged-person-name-container"
                            id="taggedfollowernamecontainer"
                            key={result.FID}
                          >
                            <div className="tagged-person-photo-container">
                              <input
                                type="image"
                                src={require(`../../image/${result.followerimage}`)}
                                alt=""
                                className="tagged-person-photo"
                              />
                            </div>
                            <div
                              className="following-person-name"
                              id="followerpersonname"
                            >
                              <Link
                                className="a-decoration follow-name"
                                to={`/Friend/${result.followername}`}
                                state={friendinformation}
                              >
                                {result.followername}
                              </Link>{" "}
                            </div>
                            <div
                              className="following-person-remove"
                              id="followerpersonremove"
                            >
                              remove
                            </div>
                            <input
                              type="text"
                              name="personTagged"
                              className="person-tagged"
                              hidden
                            />
                          </div>
                        );
                      })}
                      <div className="show-more">Show more</div>
                    </div>
                  </div>
                </div>
                <div
                  id="follower-number-info"
                  className="follower-word number-font"
                >
                  Follower
                </div>
              </div>
              <div
                className="following-container"
                id="followinglistcontainer"
                onClick={() => {
                  displayfollowinglist();
                }}
              >
                <div className="following-number number-font">
                  {countfollowing}
                  <div className="my-following-name" id="followingContanier">
                    <div className="follower-name-list">
                      {following.map((result) => {
                        // var friendname = result.followingname;
                        var friendinfo = {
                          friendid: result.followerid,
                          friendimage: result.followingimage,
                          frinedname: result.followingname,
                          friendbio: result.followingbio,
                        };
                        // var friendid = result.followerid;
                        // console.log("friendid", friendid);
                        // var friendimage = result.followingimage;
                        return (
                          <div
                            className="tagged-person-name-container"
                            id="taggednamecontainer"
                            key={result.FID}
                          >
                            <div className="tagged-person-photo-container">
                              <input
                                type="image"
                                src={require(`../../image/${result.followingimage}`)}
                                alt=""
                                className="tagged-person-photo"
                              />
                            </div>
                            <div
                              className="following-person-name"
                              id="followingpersonname"
                            >
                              <Link
                                className="a-decoration follow-name"
                                to={`/Friend/${result.followingname}`}
                                state={friendinfo}
                              >
                                {result.followingname}
                              </Link>
                            </div>
                            <div
                              className="following-person-remove"
                              id="followingpersonremove"
                            >
                              remove
                            </div>
                            <input
                              type="text"
                              name="personTagged"
                              className="person-tagged"
                              hidden
                            />
                          </div>
                        );
                      })}
                      <div className="show-more">Show more</div>
                    </div>
                  </div>
                </div>
                <div
                  id="following-number-info"
                  className="following-word number-font"
                >
                  Following
                </div>
              </div>
            </div>
            <div className="bio-container">
              <div className="bio-statement" style={{ whiteSpace: "pre-wrap" }}>
                {bio}
              </div>
            </div>
            <div className="edit-container">
              <Link to="Edit" className="a-decoration">
                <div className="edit-account">Edit Account</div>
              </Link>
            </div>
          </div>
        </div>

        {/* <div id="profile-layer-three">
                            <div id="profile-post">
                                <div id="post-part">
                                    <a href="post_profile.php" className="a-decoration">Post</a>   
                                </div>
                            </div>
                            <div id="order-part">
                                <a href="order_profile.php"  className="a-decoration">Order</a> 
                            </div>
                        </div>  */}
      </div>
    </div>
  );
}
