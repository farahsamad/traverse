import { LOGGED_IN } from "./user-action";
import { COMMENT_CLICKED } from "./user-action";
import { ADD_BIO } from "./user-action";

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      localStorage.setItem("ID", JSON.stringify(action.payload.personID));
      localStorage.setItem("img", JSON.stringify(action.payload.pic));
      localStorage.setItem("name", JSON.stringify(action.payload.name));
      localStorage.removeItem("isloggedin");
      localStorage.setItem("isloggedin", JSON.stringify("true"));
      return {
        ...state,
        userid: action.payload.personID,
        userimage: action.payload.pic,
        username: action.payload.name,
        isloggedin: "true",
      };
    case COMMENT_CLICKED:
      localStorage.setItem("PID", JSON.stringify(action.payload));
      return {
        ...state,
        pid: action.payload,
      };
    case ADD_BIO:
      localStorage.setItem("bio", JSON.stringify(action.payload));
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
