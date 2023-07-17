import React, { useContext, useState, useEffect } from "react";
import "../styles.css";
import PersonContext from "../context/app-context";
import axios from "axios";
import { Userinfo, Userinformation } from "../Api";

export default function Editaccount() {
  const { id, name, image, postid, bio, loggedin, commentclick, addbio } =
    useContext(PersonContext);

  const [img, setImg] = useState(image);
  const [nameofuser, setNameofuser] = useState("");
  const [username, setUsername] = useState(name);
  const [userbio, setUserbio] = useState(bio);

  useEffect(() => {
    async function userinfonloader() {
      const userInfoResult = await Userinfo(id);
      userInfoResult.result.map((datas) => {
        console.log("datas ", datas);
        if (datas.name != "") {
          setNameofuser(datas.name);
          console.log("//////data.data.name", datas.name);
        }
        if (datas.bio != "") {
          setUserbio(datas.bio);
          console.log("data.data.bio", datas.bio);
        }
      });
    }
    userinfonloader();
  }, [id]);

  function changeimage(e) {
    console.log(e.target.files);
    console.log(e.target.files[0].name, "hello");
    setImg(e.target.files[0].name);
  }

  function submitclick() {
    console.log("id", id);
    console.log("nameofuser", nameofuser);
    console.log("img", img);
    console.log("username", username);
    console.log("userbio", userbio);
    async function UserInformationoader() {
      await Userinformation(
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
      );
    }
    UserInformationoader();
  }

  function submitclicked(event) {
    console.log("id", id);
    console.log("nameofuser", nameofuser);
    console.log("img", img);
    console.log("username", username);
    console.log("userbio", userbio);
    if (event.keyCode === 13) {
      // async function UserInformationoader() {
      //   await Userinformation(
      //     id,
      //     nameofuser,
      //     username,
      //     img,
      //     userbio,
      //     setUsername,
      //     setImg,
      //     setUserbio,
      //     addbio,
      //     loggedin,
      //     image,
      //     name
      //   );
      // }
      // UserInformationoader();
    }
  }

  return (
    <div className="sign-container">
      <div className="account-content">
        <form className="form_edit_container">
          <div className="account-form">
            <div className="change-photo">
              <label>
                <input
                  type="file"
                  className="image-file"
                  onChange={(e) => changeimage(e)}
                  hidden
                />
                <img
                  src={require(`../image/${img}`)}
                  alt=""
                  className="my-image image-file"
                />
              </label>
              <div className="username-contant">Edit picture</div>
            </div>
            <div className="change-x">
              <div className="username-contant">Username</div>
              <div className="username-contant">
                <input
                  type="text"
                  value={username}
                  className="inputs user_sign"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="change-x">
              <div className="username-contant">Name</div>
              <div className="username-contant">
                <input
                  type="text"
                  value={nameofuser}
                  placeholder="change name"
                  className="inputs user_sign"
                  onChange={(e) => {
                    setNameofuser(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="change-x">
              <div className="username-contant">Bio</div>
              <div className="username-contant">
                <textarea
                  type="text"
                  value={userbio}
                  placeholder="change bio"
                  className="inputs user_sign"
                  onChange={(e) => {
                    setUserbio(e.target.value);
                  }}
                />
              </div>
            </div>
            <input
              type="submit"
              name="save"
              onClick={(e) => {
                e.preventDefault();
                submitclick();
              }}
              onKeyDown={(e) => {
                e.preventDefault();
                submitclicked();
              }}
              id="submit"
              className="input-sign signin-submit username-contant"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
