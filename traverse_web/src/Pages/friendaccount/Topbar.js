import React, { useEffect, useState } from "react";
import "../../component/styles/traverse.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Isfollow, Followrequests } from "../../component/Api/Api";

export default function Topbar({ id, image, name, bio }) {
  const myId = JSON.parse(localStorage.getItem("ID"));
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followerid, setFollowerid] = useState([]);
  const [followingid, setFollowingid] = useState([]);
  const [countfollower, setCountfollower] = useState();
  const [countfollowing, setCountollowing] = useState();
  const [followerdisplays, setFollowerdisplays] = useState(0);
  const [followingdisplays, setFollowingdisplays] = useState(0);
  const [identifier, setIdentifier] = useState();
  const [isfollow, setIsfollow] = useState("Follow");
  // console.log("identifier", identifier);
  const [friendimage, setFriendimage] = useState(image);
  const [friendbio, setFriendbio] = useState(bio);
  const user = useParams();
  const username = user.name;
  // console.log("user: ", user);

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/follower.php", { username })
      .then((data) => {
        //console.log("thisssssssssssssssssss follower: ", data);
        if (data != null) {
          setIsfollow("Follow");
          data.data.map((datas) => {
            // console.log("image 2 ", datas.image);
            // console.log("id 2 ", datas.id);
            // console.log("name 2 ", username);
            // console.log("bio 2 ", datas.bio);
            setIdentifier(datas.id);
            setFriendimage(datas.image);
            setFriendbio(datas.bio);
          });
        }
        if (data == null) {
          setIsfollow("Loading");
        }
      });
  }, [username]);
  // console.log("image 1 ", friendimage);
  // console.log("id 1 ", identifier);
  // console.log("name 1 ", username);
  // console.log("bio 1 ", friendbio);

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

  useEffect(() => {
    // console.log("inside id=", identifier);
    axios
      .post("http://localhost/traverse-backend/myFollower.php", { id })
      .then((data) => {
        // console.log("followingg", data);
        if (data != null) {
          data.data.map((datas) => {
            if (datas.countfollower != undefined) {
              setCountfollower(datas.countfollower);
            }
            if (datas.countfollowing != undefined) {
              setCountollowing(datas.countfollowing);
            }
            if (datas.followersnames != undefined) {
              setFollower(datas.followersnames);
            }
            if (datas.followingsnames != undefined) {
              setFollowing(datas.followingsnames);
            }
          });
        }
      });
  }, [id, isfollow]);
  // console.log("username ", username);
  async function Followingloader() {
    const followingreturn = await Isfollow(myId, username);
    setIsfollow(() => followingreturn.result);
  }
  Followingloader();

  async function followrequest(myId, username, isfollow) {
    const followrequest = await Followrequests(myId, username, isfollow);
    if (followrequest.result == 1) {
      if (isfollow == "Unfollow") {
        setIsfollow("Follow");
      }
      if (isfollow == "Follow") {
        setIsfollow("UnFollow");
      }
    }
  }

  var followerInfo = {
    friendimage: friendimage,
    username: username,
    friendbio: friendbio,
    identifier: identifier,
  };

  return (
    <div className="account-contant">
      <div className="profile-container">
        <div className="profile-layer-one">
          {friendimage && (
            <input
              type="image"
              src={require(`../../image/${friendimage}`)}
              alt=""
              className="customer-profile-photo"
            />
          )}
        </div>
        <div className="profile-layer-two">
          <div className="profile-layer-container">
            <div className="profile-name">{username}</div>
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
                        var friendsnfo = {
                          friendid: result.followingids,
                          friendimage: result.followerimage,
                          frinedname: result.followingname,
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
                                state={friendsnfo}
                              >
                                {result.followername}
                              </Link>
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
                {friendbio}
              </div>
            </div>
            <div className="follow-mesage-container">
              <div
                className=" friend-follow-message"
                onClick={() => {
                  followrequest(myId, username, isfollow);
                }}
              >
                <div className="edit-account">{isfollow}</div>
              </div>
              <Link
                to="/Traverse/Message"
                className="a-decoration friend-follow-message"
                state={followerInfo}
              >
                <div className="edit-account">Message</div>
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
