import React, { useContext, useEffect, useState } from "react";
import PersonContext from "../../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

export default function Friendphotos({ props }) {
  const { name, image, postid, loggedin, commentclick } =
    useContext(PersonContext);
  const [friendid, setFriendid] = useState("");
  const [friendimage, setFriendimage] = useState("");
  const [friendbio, setFriendbio] = useState("");
  const location = useLocation();
  const friendData = location.state;
  console.log("friendData////////////////////", friendData);
  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);
  console.log("rcebnojucvybgvbrcunexnucirbvrybcuen");
  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);
  let username = friendData.frinedname;
  console.log("id", id);

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/follower.php", {
        username,
      })
      .then((data) => {
        // console.log("thisssssssssssssssssss follower: ", data);
        if (data != null) {
          data.data.map((datas) => {
            // console.log("image 2 ", datas.image);
            // console.log("id 2 ", datas.id);
            // console.log("name 2 ", username);
            // console.log("bio 2 ", datas.bio);
            setFriendid(datas.id);
            setFriendimage(datas.image);
            setFriendbio(datas.bio);
          });
        }
      });
  }, [username]);
  var id = friendid;

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/myPost.php", { id })
      .then((data) => {
        console.log("my post", data);
        if (data.data.length == 0) {
          console.log("there isnnnnnnnnnnn't");
          setZeropost(false);
          let widonwheight = window.innerHeight;
          console.log("widonwheight", widonwheight);
          document.getElementById("nofollowercontainer").style.height =
            widonwheight + "px";
        } else {
          setZeropost(true);
          console.log("there isssssssssssssssssssssssssssssss");
        }
        setUserpost(data.data);
        console.log("userpost", userpost);
        // if (data != null) {
        //   setUserdata(data.data);
        // }
      });
    let widonwheight = window.innerHeight;
    let skeletonHeight = widonwheight / 2;
    let containerheight = widonwheight - 222;
    console.log("widonwheight", widonwheight);
    console.log("containerheight", containerheight);
    // document.getElementById("rightContainer").style.height =
    //   containerheight + "px";
    document.getElementById("myprofileContainer").style.height = "fit-content";
  }, [id]);

  const ppid = postid;

  if (userpost == null) {
    console.log(".............................");
    var postlength = false;
  } else if (userpost.length > 0) {
    console.log(".............................");
    var postlength = true;
  }
  // <div className="myprofile-container" id="myprofileContainer">
  {
    /* <div className="main-profile-container">
        <Leftbar
          id={friendData.friendid}
          image={friendData.friendimage}
          name={friendData.frinedname}
          bio={friendData.friendbio}
        />
        <Topbar
          id={friendData.friendid}
          image={friendData.friendimage}
          name={friendData.frinedname}
          bio={friendData.friendbio}
        />
      </div> */
  }
  {
    /* </div> */
  }

  return (
    <div className="photo-right-container" id="rightContainer">
      <div className="photo-post-container">
        {postlength ? (
          userpost.map((data) => {
            if (data.picture != "") {
              return (
                <>
                  <div
                    className="photo-post-user"
                    key={data.PID}
                    id={`profilepost${data.PID}`}
                  >
                    <Link to="#">
                      <img
                        src={require(`../../image/${data.picture}`)}
                        alt="pic"
                        className="photo-page-image"
                      ></img>
                    </Link>
                  </div>
                </>
              );
            }
          })
        ) : zeropost ? (
          <SkeletonTheme
            className="photo-post-container"
            baseColor="#857875"
            highlightColor="#4444"
          >
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
            <div className="skeleton-post">
              <Skeleton count={6} className="photo-page-image" />
            </div>
          </SkeletonTheme>
        ) : (
          <div id="nofollowercontainer"></div>
        )}
      </div>
    </div>
  );
}
