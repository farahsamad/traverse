import React, { useState, useEffect } from "react";
import "../../component/styles/traverse.css";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FaImages, FaTable } from "react-icons/fa";
import axios from "axios";

export default function Leftbar({ id, image, name, bio }) {
  const [identifier, setIdentifier] = useState(id);
  const [friendimage, setFriendimage] = useState(image);
  const [friendbio, setFriendbio] = useState(bio);
  const user = useParams();
  const username = user.name;
  // console.log("username", username);

  const currentlocation = useLocation().pathname;
  if (currentlocation == `/Friend/${username}`) {
    var directTo = true;
  } else {
    directTo = false;
  }

  useEffect(() => {
    axios
      .post("http://localhost/traverse-backend/follower.php", { username })
      .then((data) => {
        // console.log("thisssssssssssssssssss follower: ", data);
        if (data != null) {
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
      });
  }, [username]);
  // console.log("image 1 ", friendimage);
  // console.log("id 1 ", identifier);
  // console.log("name 1 ", username);
  // console.log("bio 1 ", friendbio);

  var friendinfo = {
    friendid: identifier,
    friendimage: friendimage,
    frinedname: username,
    friendbio: friendbio,
  };

  return (
    <div className="left-side-container">
      <div className="traverse">
        <Link to="/Traverse" className="a-decoration">
          Traverse
        </Link>
      </div>
      <div className="list-item-container">
        <div className="post-word-container">
          <NavLink
            to={`/Friend/${username}`}
            state={friendinfo}
            id="navlink-container"
            className={({ isActive }) =>
              isActive && directTo ? "post-word-animation-bottom " : null
            }
          >
            <div id="post-word" className="profile-word">
              <div id="post-word-list" className="a-decoration word-decoration">
                <FaTable />
                <span className="remove-post">Posts</span>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="add-word-container">
          <NavLink
            to={`/Friend/${name}/Photos`}
            state={friendinfo}
            id="navlink-container"
            className={({ isActive }) =>
              isActive ? "post-word-animation-bottom " : null
            }
          >
            <div id="add-post-word" className="profile-word">
              <div id="add-word-list" className="a-decoration word-decoration">
                <FaImages />
                <span className="remove-post">Photos</span>
              </div>
            </div>
          </NavLink>
        </div>

        {/* <div className="add-word-container">
          <div id="add-post-word" className="profile-word">
            <a id="add-word-list" className="a-decoration word-decoration">
              <FaRegBookmark />
              <span className="remove-post">Save</span>
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
