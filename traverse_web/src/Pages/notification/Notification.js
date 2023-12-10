import React, { useContext, useEffect, useState } from "react";
import { Myfollower } from "../../component/Api/Api";
import PersonContext from "../../context/app-context.js";

export default function Notification() {
  const [followers, setFollowers] = useState([]);
  const [countfollower, setCountfollower] = useState();

  const {
    id,
    name,
    image,
    postid,
    names,
    tag,
    loggedin,
    commentclick,
    tagednamesClick,
  } = useContext(PersonContext);

  async function MyFollowerloader() {
    const returnedfollowerdata = await Myfollower(id);
    returnedfollowerdata.result.map((datas) => {
      if (datas.followersname != undefined) {
        setFollowers(datas.followersname);
      }
      if (datas.myfollowerscount != undefined) {
        setCountfollower(datas.myfollowerscount);
      }
    });
  }

  useEffect(() => {
    MyFollowerloader();
  }, [id]);
  console.log("followers: ", followers);
  console.log("countfollower: ", countfollower);

  return (
    <div className="notification-container">
      <div className="notification-messages-container">
        <div className="notification-message-container">
          <div className="notification-message">Hello</div>
        </div>
      </div>
      <div className="friend-request-container">
        <div className="follow-request-container">
          <div className="follow-request-headline">
            <div className="follow-request-sentence">Follow request</div>
            <div className="follow-request-count">{countfollower}</div>
          </div>
          <div className="follower-request-container">
            {followers.map((data) => {
              return (
                <div className="follower-request" key={data.followername}>
                  <div className="follower-request-name-container">
                    <div className="myfollower-photo">
                      <img
                        src={require(`../../image/${data.followerimage}`)}
                        alt=""
                        className="myfollower-image"
                      />
                    </div>
                    <div className="follower-request-name">
                      {data.followername}
                    </div>
                  </div>
                  <div className="follower-request-confirm">Confirm</div>
                  <div className="follower-request-delete">Delete</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
