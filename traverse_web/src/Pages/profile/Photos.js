import React, { useContext, useEffect, useState } from "react";
import PersonContext from "../../context/app-context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Leftbar from "./Leftbar";
import Topbar from "./Topbar";

export default function Photos({ props }) {
  const { id, name, image, bio } = useContext(PersonContext);

  const [userpost, setUserpost] = useState([]);
  const [zeropost, setZeropost] = useState(true);
  useEffect(() => {
    localStorage.removeItem("PID");
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/myPost.php", { id })
      .then((data) => {
        if (data.data.length == 0) {
          setZeropost(false);
          let widonwheight = window.innerHeight;
          document.getElementById("nofollowercontainer").style.height =
            widonwheight + "px";
        } else {
          setZeropost(true);
        }
        setUserpost(data.data);
        // if (data != null) {
        //   setUserdata(data.data);
        // }
      });
  }, [id]);

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
    </div>
  );
}
