import React, { useEffect } from "react";
import Commentlist from "../interaction/Commentlist.js";

export default function Comment({
  id,
  pid,
  userpost,
  ppid,
  images,
  commentvalue,
  displaycomment,
  postid,
}) {
  useEffect(() => {
    window.onclick = function (event) {
      if (postid != null) {
        if (
          document.getElementById(`commentlayer${postid}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`commentlayer${postid}`) ||
            event.target == document.getElementById(`buttonLike${postid}`) ||
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
            document.getElementById(`profilepost${postid}`).style.position = "";
            localStorage.removeItem("PID");
          }
        } else {
          document.getElementById(`commentlayer${postid}`).style.display =
            "none";
          document.getElementById(`profilepost${postid}`).style.position = "";
          localStorage.removeItem("PID");
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
