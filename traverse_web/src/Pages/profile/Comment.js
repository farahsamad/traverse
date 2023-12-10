import React, { useEffect } from "react";
import Commentlist from "../interaction/Commentlist";

export default function Comment({
  id,
  pid,
  userpost,
  ppid,
  images,
  commentvalue,
  displaycomment,
  postid,
  tag,
}) {
  useEffect(() => {
    window.onclick = function (event) {
      console.log("window onclick:  ", event.target);
      const setting = JSON.parse(localStorage.getItem("setting"));
      console.log("setting:  ", setting);

      if (postid != null) {
        if (
          document.getElementById(`commentlayer${postid}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`commentlayer${postid}`) ||
            event.target == document.getElementById(`buttoncomment${postid}`) ||
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
        }
        if (
          document.getElementById(`commentlayer${postid}`).style.display !=
          "block"
        ) {
          document.getElementById(`commentlayer${postid}`).style.display =
            "none";
          document.getElementById(`uploadpost${postid}`).style.position = "";
          localStorage.removeItem("PID");
        }
      }
      if (setting != null) {
        if (
          document.getElementById(`imagesetting${setting}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`imagesetting${setting}`) ||
            event.target == document.getElementById(`settingdot${setting}`)
          ) {
            document.getElementById(`imagesetting${setting}`).style.display =
              "block";
          } else {
            document.getElementById(`imagesetting${setting}`).style.display =
              "none";
            localStorage.removeItem("setting");
          }
        } else {
          if (
            document.getElementById(`tagContainer${setting}`).style
              .visibility != "visible"
          ) {
            localStorage.removeItem("setting");
          }
          console.log("66666666666666666");
          document.getElementById(`imagesetting${setting}`).style.display =
            "none";
        }
      }

      if (tag != null) {
        console.log("11111111111111");
        setTimeout((i = 0) => {
          i = i + 1;
        }, 800);
        if (
          document.getElementById(`tagContainer${tag}`).style.visibility ==
          "visible"
        ) {
          console.log("2222222222222");

          if (
            event.target == document.getElementById(`tagContainer${tag}`) ||
            event.target == document.getElementById(`tagperson${tag}`) ||
            event.target == document.getElementById(`usernameTag${tag}`)
          ) {
            console.log("333333333333333");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "visible";
          } else {
            console.log("44444444444444444444");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "hidden";
            localStorage.removeItem("setting");
          }
        } else {
          // document.getElementById(`tagContainer${setting}`).style.visibility =
          //   "hidden";
          // localStorage.removeItem("setting");
        }
      }
      if (
        document.getElementById("editpostcontainer").style.visibility ==
        "visible"
      ) {
        if (event.target === document.getElementById("secondEditContainer")) {
          document.getElementById("editpostcontainer").style.visibility =
            "hidden";
        } else {
          document.getElementById("editpostcontainer").style.visibility =
            "visible";
        }
      }
    };
  });
  return (
    <form
      method="post"
      className="myprofile-commant-layer-container"
      id={`commentlayer${pid}`}
    >
      <Commentlist
        id={id}
        pid={pid}
        cmt={userpost}
        postid={ppid}
        image={images}
        commentvalue={commentvalue}
        displaycomments={() => {
          displaycomment(pid, images);
        }}
      />
    </form>
  );
}
