import React, { useState, useRef } from "react";
import "../traverse.css";
//import axios from "axios";

export default function Comments({ pid, lists }) {
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
                    src={require(`../image/${cmtval.profile}`)}
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
                      {cmtval.difference}
                      {cmtval.unit}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      })}
    </>
  );
}
