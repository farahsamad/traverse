import React, { useState, useRef, useContext } from "react";
import PersonContext from "../../context/app-context";
import "../../component/styles/traverse.css";
//import axios from "axios";

export default function Comments({ pid, lists, newComment }) {
  const { id, name, image, postid, loggedin, commentclick } =
    useContext(PersonContext);
  //   document.getElementsByName(`commentlayer${pid}`).style.color = "red";

  //   window.onclick = function (event) {
  //     if (
  //       document.getElementsByName(`commentlayer${pid}`).style.display === "block"
  //     ) {
  //       if (event.target != document.getElementsByName(`commentlayer${pid}`)) {
  //         document.getElementsByName(`commentlayer${pid}`).style.display = "none";
  //       }
  //     }
  //   };

  return (
    <>
      {lists.map((datas) => {
        return datas.comment.map((cmtval) => {
          if (cmtval.PID == pid) {
            return (
              <div id="comment-list-container" key={cmtval.CID}>
                <div id="comment-list-contant">
                  <input
                    type="image"
                    src={require(`../../image/${cmtval.profile}`)}
                    alt=""
                    className="commenter-image"
                    id={`commenterimage${pid}`}
                  />
                  <div className="commenter-info" id={`commenterinfo${pid}`}>
                    <div className="commenter-info-container">
                      <div
                        className="commenter-name"
                        id={`commentername${pid}`}
                      >
                        {cmtval.username}
                      </div>
                      <div
                        className="commnet-entered-text"
                        id={`commententeredtext${pid}`}
                      >
                        {cmtval.comments}
                      </div>
                    </div>
                    <div className="comment-time" id={`commenttime${pid}`}>
                      {cmtval.differenc}
                      {cmtval.unit}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      })}

      {newComment &&
        newComment.map((datas) => {
          return (
            <div id="comment-list-container" key={datas.comment}>
              <div id="comment-list-contant">
                <input
                  type="image"
                  src={require(`../../image/${image}`)}
                  alt=""
                  className="commenter-image"
                  id={`commenterimage${pid}`}
                />
                <div className="commenter-info" id={`commenterinfo${pid}`}>
                  <div className="commenter-info-container">
                    <div className="commenter-name" id={`commentername${pid}`}>
                      {name}
                    </div>
                    <div
                      className="commnet-entered-text"
                      id={`commententeredtext${pid}`}
                    >
                      {datas}
                    </div>
                  </div>
                  <div className="comment-time" id={`commenttime${pid}`}>
                    1 s
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
