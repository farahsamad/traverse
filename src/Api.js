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
  };
  await axios
    .post("http://localhost/traverse-backend/followernumber.php", { id })
    .then((data) => {
      if (data.data.nbr == "1") {
        datanbr.nopost = true;
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
      console.log("likedata.data", likedata.data);
    },
  });
  return likedata;
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

export async function Functiondisplaycomment(
  id,
  pid,
  imag,
  commentclick,
  setUserpost
) {
  if (JSON.parse(localStorage.getItem("PID")) != null) {
    const commentId = JSON.parse(localStorage.getItem("PID"));
    if (
      document.getElementById(`commentlayer${commentId}`).style.display ==
      "block"
    ) {
      document.getElementById(`commentlayer${commentId}`).style.display =
        "none";
    }
  }
  localStorage.removeItem("PID");
  document.getElementById(`commentlayer${pid}`).style.display = "block";
  if (imag == true) {
    document.getElementById(`profilepost${pid}`).style.position = "relative";
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
  }
  if (document.getElementById(`commentlayer${pid}`).style.display === "block") {
    console.log("click comment");
    async function mypostloaders() {
      const myposts = await Mypost(id);
      commentclick(pid);
      setUserpost(myposts.result);
    }
    mypostloaders();
  }
}

export async function Functiondisplaycomments(
  id,
  pid,
  image,
  commentclick,
  setUserdata
) {
  localStorage.removeItem("PID");
  document.getElementById(`commentlayer${pid}`).style.display = "block";
  if (image == true) {
    document.getElementById(`uploadpost${pid}`).style.position = "relative";
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
        console.log("followingg", data);
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
      console.log("-----------------------------");
      if (datas.countfollower != undefined) {
        setCountfollower(datas.countfollower);
        console.log("data.data.countfollower", datas.countfollower);
      }
      if (datas.countfollowing != undefined) {
        setCountollowing(datas.countfollowing);
        console.log("data.data.countfollowing", datas.countfollowing);
      }
      if (datas.followersnames != undefined) {
        setFollower(datas.followersnames);
        console.log("data.data.followersnames", datas.followersnames);
      }
      if (datas.followingsnames != undefined) {
        setFollowing(datas.followingsnames);
        console.log("data.data.followingsnames", datas.followingsnames);
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
        console.log("information", userinfo.result);
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
      console.log("information", data);
      if (data != null) {
        data.data.map((datas) => {
          if (datas.username != "" && datas.img != "" && datas.bio != "") {
            setUsername(datas.username);
            setImg(datas.img);
            console.log("data.data.img", datas.img);
            console.log("data.data.username", datas.username);
            setUserbio(datas.bio);
            console.log("data.data.bio", datas.bio);
            addbio(userbio);
            loggedin(id, datas.img, datas.username);
          } else if (datas.username != "") {
            setUsername(datas.username);
            console.log("data.data.username", datas.username);
            loggedin(id, image, datas.username);
          } else if (datas.img != "") {
            setImg(datas.img);
            console.log("data.data.img", datas.img);
            loggedin(id, datas.img, name);
          } else if (datas.bio != "") {
            setUserbio(datas.bio);
            console.log("data.data.bio", datas.bio);
            addbio(userbio);
          }
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
      console.log("data request", data.data);
      data.data.map((value) => {
        followrequestinfo.result = value.countfollowing;
        console.log("followrequestinfo.result", followrequestinfo.result);
      });
    });
  return followrequestinfo;
}
