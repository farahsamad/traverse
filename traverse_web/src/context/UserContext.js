import React, { useReducer } from "react";
import PersonContext from "./app-context";
import {
  LOGGED_IN,
  COMMENT_CLICKED,
  ADD_BIO,
  TAGED_NAMES_CLICKED,
} from "./user-action";
import userReducer from "./user-reducer";

export function UserContext(props) {
  const initialState = {
    userid: 0 || JSON.parse(localStorage.getItem("ID")),
    userimage: null || JSON.parse(localStorage.getItem("img")),
    username: null || JSON.parse(localStorage.getItem("name")),
    pid: null || JSON.parse(localStorage.getItem("PID")),
    bio: null || JSON.parse(localStorage.getItem("bio")),
    isloggedin: null || JSON.parse(localStorage.getItem("isloggedin")),
    names: null || JSON.parse(localStorage.getItem("names")),
    tag: null || JSON.parse(localStorage.getItem("tag")),
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  function loggedin(personID, pic, name) {
    dispatch({
      type: LOGGED_IN,
      payload: {
        personID,
        pic,
        name,
      },
    });
  }

  const addbio = (userbio) => {
    dispatch({
      type: ADD_BIO,
      payload: userbio,
    });
  };

  const commentclick = (imagepid) => {
    dispatch({
      type: COMMENT_CLICKED,
      payload: imagepid,
    });
  };

  const tagednamesClick = (name, tag) => {
    dispatch({
      type: TAGED_NAMES_CLICKED,
      payload: { name, tag },
    });
  };

  return (
    <PersonContext.Provider
      value={{
        id: state.userid,
        name: state.username,
        image: state.userimage,
        postid: state.pid,
        bio: state.bio,
        names: state.names,
        isloggedin: state.isloggedin,
        tag: state.tag,
        loggedin,
        commentclick,
        addbio,
        tagednamesClick,
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
}

export default UserContext;
