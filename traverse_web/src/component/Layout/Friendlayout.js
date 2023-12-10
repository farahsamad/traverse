import React, { useState, useEffect } from "react";
import Leftbar from "../../Pages/friendaccount/Leftbar";
import Topbar from "../../Pages/friendaccount/Topbar";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

export default function Friendlayout() {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const user = useParams();
  const username = user.name;
  // console.log("username", username);

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/follower.php", { username })
      .then((data) => {
        // console.log("thisssssssssssssssssss follower: ", data);
        if (data != null || data != "") {
          data.data.map((datas) => {
            // console.log("image 2 ", datas.image);
            // console.log("id 2 ", datas.id);
            // console.log("name 2 ", username);
            // console.log("bio 2 ", datas.bio);
            setId(datas.id);
            setImage(datas.image);
            setBio(datas.bio);
          });
        }
      });
  }, [username]);
  // console.log("image 1 ", image);
  // console.log("id 1 ", id);
  // console.log("name 1 ", username);
  // console.log("bio 1 ", bio);

  // const location = useLocation();
  // const friendData = location.state;
  // console.log("friendDataaaaaaaaaaaaa", friendData);

  return (
    <div className="userprofile-container" id="myprofileContainer">
      <div className="main-profile-container">
        <Leftbar id={id} image={image} name={username} bio={bio} />
        <Topbar id={id} image={image} name={username} bio={bio} />
      </div>
      <Outlet />
    </div>
  );
}
