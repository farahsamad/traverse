import $ from "jquery";
import axios from "axios";
import { useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError;
  const displayError = {
    display: error ? "block" : "none",
  };
  return (
    <div className="error-container" id="error-container" style={displayError}>
      <div className="error-modal">
        <div className="error-modal-container">
          <div className="error-sentence">error</div>
          <div
            className="ok-sentence"
            onClick={() => console.log("error ", error)}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
}

export async function userAuth(name, password) {
  var result;
  var userloginfo = {
    response: "",
    id: "",
    profile: "",
    name: "",
    bio: "",
  };
  await $.ajax({
    method: "GET",
    url: "http://localhost/traverse-backend/verification.php",
    data: { username: name, password: password },
    success: function (data) {
      result = JSON.parse(data);
      if (result.response === "!Incorrect username") {
        userloginfo.response = "!Incorrect username";
        //fetchusernamerror();
      } else if (result.response === "!Incorrect password") {
        userloginfo.response = "!Incorrect password";
        //fetchpassworderror();
      } else if (result.response === "success") {
        //fetchsuccess(result.id);
        userloginfo.response = "success";
        userloginfo.id = result.id;
        userloginfo.profile = result.profile;
        userloginfo.name = result.name;
        userloginfo.bio = result.bio;
      }
    },
  });
  return userloginfo;
}

// $.ajax({
//   method: "GET",
//   url: "http://localhost/traverse-backend/verification.php",
//   data: { username: $("#user").val(), password: $("#pass").val() },
//   success: function (data) {
//     result = JSON.parse(data);
//     if (result.response === "!Incorrect username") {
//       errorModal.style.display = "block";
//       $(".error-sentence").html(result.response);
//       //fetchusernamerror();
//     } else if (result.response === "!Incorrect password") {
//       errorModal.style.display = "block";
//       $(".error-sentence").html(result.response);
//       //fetchpassworderror();
//     } else if (result.response === "success") {
//       //fetchsuccess(result.id);
//       loggedin(result.id, result.profile, result.name);
//       addbio(result.bio);
//       navigate("/Traverse");
//     }
//   },
// });

export async function FollowerPost(id) {
  var Userdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/friend_post.php", { id })
    .then((data) => {
      if (data != null) {
        Userdata.result = data.data;
      }
    });
  return Userdata;
}

export async function Followernbr(id) {
  var datanbr = {
    result: "",
    nopost: true,
    postnbr: true,
  };
  await axios
    .post("http://localhost/traverse-backend/followernumber.php", { id })
    .then((data) => {
      if (data.data.nbr == "1") {
        datanbr.nopost = true;
        if (data.data.postnbr == "0") {
          datanbr.postnbr = true;
        } else {
          datanbr.postnbr = false;
        }
      } else if (data.data.nbr == "0") {
        data.nopost = false;
      }
    });
  return datanbr;
}

export async function Likefunction(id, pid) {
  var likedata = {
    data: "",
  };
  await $.ajax({
    method: "POST",
    url: "http://localhost/traverse-backend/followerLike.php",
    data: { ids: id, pids: pid },
    success: function (data) {
      likedata.data = data;
    },
  });
  return likedata;
}
export async function Savefunction(id, pid) {
  var Savedata = {
    data: "",
  };
  await $.ajax({
    method: "POST",
    url: "http://localhost/traverse-backend/clickSave.php",
    data: { ids: id, pids: pid },
    success: function (data) {
      Savedata.data = data;
    },
  });
  return Savedata;
}

export async function Userlike(id, pid, likeData) {
  var userlikedata = {
    result: "",
  };
  await $.ajax({
    method: "POST",
    url: "http://localhost/traverse-backend/userLike.php",
    data: { ids: id, pids: pid, like: likeData },
    success: function (result) {
      userlikedata.result = result;
    },
  });
  return userlikedata;
}

export async function Usersave(id, pid, saveData) {
  var usersavedata = {
    result: "",
  };
  await $.ajax({
    method: "POST",
    url: "http://localhost/traverse-backend/userSave.php",
    data: { ids: id, pids: pid, save: saveData },
    success: function (result) {
      usersavedata.result = result;
    },
  });
  return usersavedata;
}

export async function Mypost(id) {
  var mypostdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/myPost.php", { id })
    .then((data) => {
      mypostdata.result = data.data;
    });
  return mypostdata;
}

export async function Thispost(id, PID) {
  var thispostdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/thisPost.php", { id, PID })
    .then((data) => {
      thispostdata.result = data.data;
    });
  return thispostdata;
}

export async function Savedposts(id) {
  var mysavedpostdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/savedPost.php", { id })
    .then((data) => {
      mysavedpostdata.result = data.data;
    });
  return mysavedpostdata;
}

export async function Likeload(id, pid) {
  const likeload = await Likefunction(id, pid);
  if (likeload.data == 0) {
    document.getElementById(`buttonLike${pid}`).style.color = "black";
    async function Userlikeload() {
      const userlikeload = await Userlike(id, pid, likeload.data);
      if (userlikeload.result == 1) {
        document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
      }
    }
    Userlikeload();
  } else if (likeload.data == 1) {
    document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
    async function Userlikeloads() {
      const userlikeload = await Userlike(id, pid, likeload.data);
      if (userlikeload.result == 0) {
        document.getElementById(`buttonLike${pid}`).style.color = "black";
      }
    }
    Userlikeloads();
  }
}

export async function Saveload(id, pid) {
  const saveload = await Savefunction(id, pid);
  if (saveload.data == 0) {
    document.getElementById(`buttonSave${pid}`).style.color = "black";
    async function Usersaveload() {
      const usersaveload = await Usersave(id, pid, saveload.data);
      if (usersaveload.result == 1) {
        document.getElementById(`buttonSave${pid}`).style.color = "#22a900";
      }
    }
    Usersaveload();
  } else if (saveload.data == 1) {
    document.getElementById(`buttonSave${pid}`).style.color = "#22a900";
    async function Usersaveloads() {
      const usersaveload = await Usersave(id, pid, saveload.data);
      if (usersaveload.result == 0) {
        document.getElementById(`buttonSave${pid}`).style.color = "black";
      }
    }
    Usersaveloads();
  }
}

export async function Functiondisplaycomment(
  id,
  pid,
  imag,
  commentclick,
  setUserpost
) {
  const postid = JSON.parse(localStorage.getItem("PID"));
  if (postid != null && postid != pid) {
    if (
      document.getElementById(`commentlayer${postid}`).style.display == "block"
    ) {
      document.getElementById(`commentlayer${postid}`).style.display = "none";
      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`profilepost${pid}`).style.position = "relative";
      localStorage.setItem("PID", JSON.stringify(pid));
    }
  }
  if (postid == pid) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`profilepost${pid}`).style.position = "relative";
  }
  if (postid == null) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`profilepost${pid}`).style.position = "relative";
    localStorage.setItem("PID", JSON.stringify(pid));
  }
  if (imag == true) {
    var divwidth = document.getElementById(`secondlayer${pid}`).offsetWidth;
    var upwidth = divwidth / 1.5;
    var totalmargin = upwidth - 222;
    // console.log("divwidth", divwidth);
    // console.log("div totalmargin", totalmargin);

    document.getElementById(`commentlayer${pid}`).style.marginTop =
      "+" + totalmargin + "px";
    document.getElementById(`commentlayer${pid}`).style.width = "100%";
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttoncomment${pid}`)) {
        // console.log("///////////////////////////////////////");
      }
    };
  } else {
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttoncomment${pid}`)) {
        // console.log("///////////////////////////////////////");
      }
    };
  }
  if (document.getElementById(`commentlayer${pid}`).style.display === "block") {
    console.log("click commentsss");
    async function mypostloaders() {
      setTimeout((i = 0) => {
        i = i + 1;
      }, 500);
      // const myposts = await Mypost(id);
      console.log("y: ", pid);
      commentclick(pid);
      console.log("okkkkkkkkk");
      // setUserpost(myposts.result);
    }
    mypostloaders();
  }
}

export async function Functiondisplaythiscomment(
  id,
  pid,
  imag,
  commentclick,
  setUserpost
) {
  const postpid = JSON.parse(localStorage.getItem("PID"));
  if (postpid != null && postpid != pid) {
    if (
      document.getElementById(`commentlayer${postpid}`).style.display == "block"
    ) {
      document.getElementById(`commentlayer${postpid}`).style.display = "none";
      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`profilepost${pid}`).style.position = "relative";
      localStorage.setItem("PID", JSON.stringify(pid));
    }
  }
  if (postpid == pid) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`profilepost${pid}`).style.position = "relative";
  }
  if (postpid == null) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`profilepost${pid}`).style.position = "relative";
    localStorage.setItem("PID", JSON.stringify(pid));
  }
  if (imag == true) {
    var divwidth = document.getElementById(`secondlayer${pid}`).offsetWidth;
    var upwidth = divwidth / 1.5;
    var totalmargin = upwidth - 222;
    // console.log("divwidth", divwidth);
    // console.log("div totalmargin", totalmargin);

    document.getElementById(`commentlayer${pid}`).style.marginTop =
      "+" + totalmargin + "px";
    document.getElementById(`commentlayer${pid}`).style.width = "100%";
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttonLike${pid}`)) {
        console.log("///////////////////////////////////////");
      }
    };
  } else {
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttonLike${pid}`)) {
        console.log("///////////////////////////////////////");
      }
    };
  }
  if (document.getElementById(`commentlayer${pid}`).style.display === "block") {
    console.log("click commentsss");
    async function savedpostloaders() {
      const savedposts = await Savedposts(id);
      console.log("y: ", pid);
      commentclick(pid);
      console.log("okkkkkkkkk");
      setUserpost(savedposts.result);
    }
    savedpostloaders();
  }
}

export async function Functiondisplaycomments(
  id,
  pid,
  image,
  commentclick,
  setUserdata
) {
  const postids = JSON.parse(localStorage.getItem("PID"));
  if (postids != null && postids != pid) {
    if (
      document.getElementById(`commentlayer${postids}`).style.display == "block"
    ) {
      document.getElementById(`commentlayer${postids}`).style.display = "none";
      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`uploadpost${pid}`).style.position = "relative";
      localStorage.setItem("PID", JSON.stringify(pid));
    }
  }
  if (postids == pid) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`uploadpost${pid}`).style.position = "relative";
  }
  if (postids == null) {
    document.getElementById(`commentlayer${pid}`).style.display = "block";
    document.getElementById(`uploadpost${pid}`).style.position = "relative";
    localStorage.setItem("PID", JSON.stringify(pid));
  }
  if (image == true) {
    var divwidth = document.getElementById(`secondlayer${pid}`).offsetWidth;
    var upwidth = divwidth / 1.5;
    // console.log("div width", upwidth);
    var widonwwidth = window.innerWidth;
    if (widonwwidth >= 500) {
      console.log("biiiiiiiiiiiiiiggggggggggggggggerrrrrrrrrrr");
      document.getElementById(`commentlayer${pid}`).style.marginTop =
        "-" + upwidth + "px";
    } else {
      var upwidth = divwidth / 1.2;
      document.getElementById(`commentlayer${pid}`).style.marginTop =
        "-" + upwidth + "px";
    }

    document.getElementById(`commentlayer${pid}`).style.width = "100%";
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttonLike${pid}`)) {
        console.log("///////////////////////////////////////");
      }
    };
  } else {
    window.onclick = function (event) {
      if (event.target == document.getElementById(`buttoncomment${pid}`)) {
        console.log("///////////////////////////////////////");
      }
    };
  }
  if (document.getElementById(`commentlayer${pid}`).style.display === "block") {
    async function FollowerPostsloader() {
      const returnedUserdata = await FollowerPost(id);
      commentclick(pid);
      setUserdata(returnedUserdata.result);
    }
    FollowerPostsloader();
  }
}

export async function Myfollower(id) {
  var myfollowertdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/myFollower.php", { id })
    .then((data) => {
      if (data != null) {
        myfollowertdata.result = data.data;
      }
    });
  return myfollowertdata;
}

export async function FunctionMyfollower(
  id,
  setCountfollower,
  setCountollowing,
  setFollower,
  setFollowing
) {
  async function MyFollowerloader() {
    const returnedfollowerdata = await Myfollower(id);
    returnedfollowerdata.result.map((datas) => {
      if (datas.countfollower != undefined) {
        setCountfollower(datas.countfollower);
      }
      if (datas.countfollowing != undefined) {
        setCountollowing(datas.countfollowing);
      }
      if (datas.followersnames != undefined) {
        setFollower(datas.followersnames);
      }
      if (datas.followingsnames != undefined) {
        setFollowing(datas.followingsnames);
      }
    });
  }
  MyFollowerloader();
}

export async function Userinfo(id) {
  var userinfo = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/userInfo.php", {
      id,
    })
    .then((data) => {
      if (data != null) {
        userinfo.result = data.data;
      }
    });
  return userinfo;
}

export async function Userinformation(
  id,
  nameofuser,
  username,
  img,
  userbio,
  setUsername,
  setImg,
  setUserbio,
  addbio,
  loggedin,
  image,
  name
) {
  axios
    .post("http://localhost/traverse-backend/editAccount.php", {
      id,
      nameofuser,
      username,
      img,
      userbio,
    })
    .then((data) => {
      if (data != null) {
        data.data.map((datas) => {
          var usernameResult = datas.username ? datas.username : username;
          var imageResult = datas.img ? datas.img : img;
          var bioResult = datas.bio ? datas.bio : userbio;
          setUsername(usernameResult);
          setImg(imageResult);
          setUserbio(bioResult);
          addbio(userbio);
          loggedin(id, imageResult, usernameResult);
          // if (datas.username != "" && datas.img != "" && datas.bio != "") {
          //   setUsername(datas.username);
          //   console.log("datas.img  ", datas.img);
          //   // localStorage.setItem("img", JSON.stringify(datas.img));
          //   setImg(datas.img);
          //   setUserbio(datas.bio);
          //   addbio(userbio);
          //   loggedin(id, datas.img, datas.username);
          // } else if (datas.username != "") {
          //   setUsername(datas.username);
          //   loggedin(id, image, datas.username);
          //   console.log("222222222");
          // } else if (datas.img != "") {
          //   // localStorage.setItem("img", JSON.stringify(datas.img));
          //   console.log("datas.img  ", datas.img);
          //   setImg(datas.img);
          //   loggedin(id, datas.img, name);
          // } else if (datas.bio != "") {
          //   console.log("3333");

          //   setUserbio(datas.bio);
          //   addbio(userbio);
          // }
        });
      }
    });
}

export async function Isfollow(myId, username) {
  var isfollowinfo = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/isfollow.php", {
      myId,
      username,
    })
    .then((data) => {
      if (data != null) {
        data.data.map((count) => {
          if (count.countfollowing == "1") {
            isfollowinfo.result = "Unfollow";
          }
          if (count.countfollowing == "0") {
            isfollowinfo.result = "Follow";
          }
        });
      }
    });
  return isfollowinfo;
}

export async function Followrequests(myId, username, isfollow) {
  var followrequestinfo = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/followRequest.php", {
      myId,
      username,
      isfollow,
    })
    .then((data) => {
      data.data.map((value) => {
        followrequestinfo.result = value.countfollowing;
      });
    });
  return followrequestinfo;
}

export async function uploadpost(id, img, caption, location, tag) {
  var uploadresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/uploadPost.php", {
      id,
      img,
      caption,
      location,
      tag,
    })
    .then((data) => {
      data.data.map((datas) => {
        uploadresult.result = datas.response;
      });
    });

  return uploadresult;
}

export async function Updatepost(id, PID, img, caption, location, tag, state) {
  var updateresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/editPost.php", {
      id,
      PID,
      img,
      caption,
      location,
      tag,
      state,
    })
    .then((data) => {
      data.data.map((datas) => {
        updateresult.result = datas.response;
        console.log("updateresult.result", updateresult.result);
      });
    });

  return updateresult;
}

export async function Deletepost(id, PID, state) {
  var deleteresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/editPost.php", {
      id,
      PID,
      state,
    })
    .then((data) => {
      console.log(data);
      data.data.map((datas) => {
        deleteresult.result = datas.response;
        console.log("deleteresult.result", deleteresult.result);
      });
    });

  return deleteresult;
}

export async function Followinglist(id) {
  var myfollowingtdata = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/myFollowing.php", { id })
    .then((data) => {
      if (data != null) {
        myfollowingtdata.result = data.data;
      }
    });
  return myfollowingtdata;
}

export async function Searchuser(id, search) {
  var userresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/search.php", { id, search })
    .then((data) => {
      if (data != null) {
        userresult.result = data.data;
      }
    });
  return userresult;
}
export async function Sendmessages(id, userid, message, Messagestatus) {
  var messageresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/sendMessage.php", {
      id,
      userid,
      message,
      Messagestatus,
    })
    .then((data) => {
      console.log(data);
      data.data.map((datas) => {
        messageresult.result = datas.response;
        console.log("messageresult.result", messageresult.result);
      });
    });

  return messageresult;
}

export async function Sendmessagess(id, userid, message, Messagestatus) {
  var messageresult = {
    result: "",
  };
  await axios
    .post("http://localhost/traverse-backend/sendMessage.php", {
      id,
      userid,
      message,
      Messagestatus,
    })
    .then((data) => {
      console.log(data);
      data.data.map((datas) => {
        messageresult.result = datas.response;
        console.log("messageresult.result", messageresult.result);
      });
    });

  return messageresult;
}
export async function Lastuser(id) {
  // console.log(id);

  var lastconverasation = {
    result: [],
  };
  await axios
    .post("http://localhost/traverse-backend/lastMessage.php", {
      id,
    })
    .then((data) => {
      // console.log(data);
      let newArray = data.data;
      let userArray = [];
      let uniqobject = {};
      let orderArray = userArray;
      let usersArray = [];
      let uniqobjects = {};
      newArray.reverse();
      for (let i in newArray) {
        let senderId = newArray[i]["userID"];
        uniqobject[senderId] = newArray[i];
      }
      for (let i in uniqobject) {
        userArray.push(uniqobject[i]);
      }
      for (let i in orderArray) {
        let sender = orderArray[i]["MID"];
        uniqobjects[sender] = orderArray[i];
      }
      for (let i in uniqobjects) {
        usersArray.push(uniqobjects[i]);
      }
      lastconverasation.result = usersArray.reverse();
      // console.log("lastconverasation.result", lastconverasation.result);
    });

  return lastconverasation;
}
