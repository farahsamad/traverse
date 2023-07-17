import React, { useReducer } from "react";
import PersonContext from "./app-context";
import { LOGGED_IN, COMMENT_CLICKED, ADD_BIO } from "./user-action";
import userReducer from "./user-reducer";

export function UserContext(props) {
  const initialState = {
    userid: 0 || JSON.parse(localStorage.getItem("ID")),
    userimage: null || JSON.parse(localStorage.getItem("img")),
    username: null || JSON.parse(localStorage.getItem("name")),
    pid: null || JSON.parse(localStorage.getItem("PID")),
    bio: null || JSON.parse(localStorage.getItem("bio")),
    isloggedin: null || JSON.parse(localStorage.getItem("isloggedin")),
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
  return (
    <PersonContext.Provider
      value={{
        id: state.userid,
        name: state.username,
        image: state.userimage,
        postid: state.pid,
        bio: state.bio,
        isloggedin: state.isloggedin,
        loggedin,
        commentclick,
        addbio,
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
}

export default UserContext;
