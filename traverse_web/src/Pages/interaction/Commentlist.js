import React, { useState, useRef } from "react";
import "../../component/styles/traverse.css";
import axios from "axios";
import Comments from "./Comments";
export default function Commentlist({
  id,
  pid,
  cmt,
  postid,
  image,
  commentvalue,
  displaycomments,
}) {
  const [newComment, setNewComment] = useState([]);
  var comment = useRef();

  async function sendcomment() {
    if (comment.current && comment.current.value !== "") {
      const commentvalues = comment.current.value;
      // console.log("commentvalues: ", commentvalues);
      await axios
        .post("http://localhost/traverse-backend/comment.php", {
          commentvalues,
          id,
          pid,
        })
        .then((data) => {
          comment.current.value = "";
          setNewComment((prevComment) => {
            return [...prevComment, commentvalues];
          });

          commentvalues = "";

          if (commentvalue == 0) {
            document.getElementById(`commentlayer${postid}`).style.display =
              "none";
            document.getElementById(`uploadpost${postid}`).style.position = "";
            displaycomments(postid, image);
          } else if (commentvalue == 1) {
            document.getElementById(`commentlayer${postid}`).style.display =
              "none";
            document.getElementById(`profilepost${postid}`).style.position = "";
            displaycomments(postid, image);
          }
        });
    }
  }
  if (newComment.length > 0) {
    var commentsArray = newComment;
  }

  return (
    <div id="comment-layer">
      <div id={`commentlist${pid}`} className="comment-list">
        <Comments pid={pid} lists={cmt} newComment={commentsArray} />
      </div>
      <div className="enter-comment" id={`entercomment${pid}`}>
        <div className="comment-container">
          <input
            type="text"
            name="username"
            className="comment-text"
            ref={comment}
            id={`commenttext${pid}`}
          />
          <div className="comment-send-container">
            <a
              className="comment-send a-decoration"
              onClick={() => {
                sendcomment();
              }}
              id={`commentsend${pid}`}
            >
              SEND
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
