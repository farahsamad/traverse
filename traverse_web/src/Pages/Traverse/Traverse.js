import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../component/styles/traverse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonContext from "../../context/app-context.js";
import { FaShare, FaRegBookmark, FaComment } from "react-icons/fa";
import Commentlist from "../interaction/Commentlist.js";
import { faEarth, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  FollowerPost,
  Likefunction,
  Likeload,
  Searchuser,
  Savefunction,
  Saveload,
} from "../../component/Api/Api.js";
import { Followernbr } from "../../component/Api/Api.js";
import { Link, useLoaderData } from "react-router-dom";
import usePostload from "../../component/Hooks/usePostload.js";

export function Postloader() {
  var id = JSON.parse(localStorage.getItem("ID"));
  // console.log("111111111111111111111111111111111111111111");
  return FollowerPost(id);
}

export default function Traverse() {
  const [userdata, setUserdata] = useState([]);
  const [nullpost, setNullpost] = useState(true);
  const [nopost, setNopost] = useState(true);
  const [searchresult, setSearchresult] = useState([]);
  const [searchs, setSearchs] = useState();
  const [postNumber, setPostNumber] = useState(0);

  const usedata = useLoaderData();

  const {
    id,
    name,
    image,
    postid,
    names,
    tag,
    loggedin,
    commentclick,
    tagednamesClick,
  } = useContext(PersonContext);

  const { loading, error, posts, empty } = usePostload(id, postNumber);
  // console.log("posts: ", posts.length);

  useEffect(() => {
    localStorage.removeItem("PID");
    localStorage.setItem("userid", JSON.stringify(""));
    localStorage.setItem("username", JSON.stringify(""));
    localStorage.setItem("userimage", JSON.stringify(""));
  }, []);
  useEffect(() => {
    // console.log(
    //   "container height" +
    //     document.getElementById("traverseContainer").offsetHeight
    // );
    let containerheight =
      document.getElementById("traverseContainer").offsetHeight;
    if (containerheight < window.innerHeight) {
      document.getElementById("traverseContainer").style.height = "100%";
    } else if (containerheight > window.innerHeight) {
      document.getElementById("traverseContainer").style.height = "fit-Content";
    } else if (
      postid != null &&
      document.getElementById(`commentlayer${postid}`).style.display == "block"
    ) {
      document.getElementById("traverseContainer").style.height = "100%";
    }
  });

  // useEffect(() => {
  //   async function FollowerPostloader() {
  //     const returnedUserdata = await FollowerPost(id);
  //     console.log("returnedUserdata ", returnedUserdata);
  //     setUserdata(returnedUserdata.result);
  //     console.log("222222222222222222222222222222");
  //   }
  //   FollowerPostloader();
  // }, [id]);

  // const postRender = useMemo(() => {
  //   async function FollowerPostloader() {
  //     const returnedUserdata = await FollowerPost(id);
  //     console.log("returnedUserdata ", returnedUserdata);
  //     setUserdata(returnedUserdata.result);
  //     console.log("222222222222222222222222222222");
  //   }
  //   FollowerPostloader();
  // }, [id]);

  useEffect(() => {
    async function Followernbrloader() {
      // console.log("33333333333333333333333333333");

      const returnedFollowernumber = await Followernbr(id);
      // console.log(
      //   "returnedFollowernumber.nopost",
      //   returnedFollowernumber.nopost
      // );
      setNullpost(returnedFollowernumber.nopost);
      setNopost(returnedFollowernumber.postnbr);
      if (nullpost == false) {
        let widonwheight = window.innerHeight;
        document.getElementById("nofollowercontainer").style.height =
          widonwheight + "px";
      }
    }
    Followernbrloader();
  }, [id]);

  useEffect(() => {
    if (nullpost == false) {
      console.log("yes it is");
      document.getElementById("traverseContainer").style.height = "inherit";
    }
  }, [nullpost, id]);

  async function clicklike(id, pid) {
    // console.log("444444444444444444444444444444");

    await Likeload(id, pid);
  }
  async function clicksave(id, pid) {
    // console.log("555555555555555555555555555");

    await Saveload(id, pid);
  }

  useEffect(() => {
    window.onclick = function (event) {
      // console.log("event: ", event.target);
      // const setting = JSON.parse(localStorage.getItem("setting"));
      if (postid != null) {
        if (
          document.getElementById(`commentlayer${postid}`).style.display ==
          "block"
        ) {
          if (
            event.target == document.getElementById(`commentlayer${postid}`) ||
            event.target == document.getElementById(`buttoncomment${postid}`) ||
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
            document.getElementById(`uploadpost${postid}`).style.position = "";
            localStorage.removeItem("PID");
          }
        }
        if (
          document.getElementById(`commentlayer${postid}`).style.display !=
          "block"
        ) {
          document.getElementById(`commentlayer${postid}`).style.display =
            "none";
          document.getElementById(`uploadpost${postid}`).style.position = "";
          localStorage.removeItem("PID");
        }
      }

      if (
        document.getElementById("searchContainer").style.display === "block"
      ) {
        // console.log("ssss sss sss sss");
        document.getElementById("searchContainer").style.display = "block";
        // console.log(event.target);
        if (
          event.target === document.getElementById("searchiconfont") ||
          event.target === document.getElementById("searchContainer") ||
          event.target === document.getElementById("searchinput") ||
          event.target === document.getElementById("fasearchicon") ||
          event.target === document.getElementById("taggedName") ||
          event.target === document.getElementById("searchiconheader") ||
          event.target === document.getElementById("fasearchicons") ||
          event.target === document.getElementById("tageddpersonname") ||
          event.target === document.getElementById("taggedpersonphoto")
        ) {
          document.getElementById("searchContainer").style.display = "block";
        } else {
          setSearchresult(() => []);
          document.getElementById("searchContainer").style.display = "none";
        }
      }
      if (tag != null) {
        // console.log("11111111111111");
        setTimeout((i = 0) => {
          i = i + 1;
        }, 800);
        if (
          document.getElementById(`tagContainer${tag}`).style.visibility ==
          "visible"
        ) {
          // console.log("2222222222222");

          if (
            event.target == document.getElementById(`tagContainer${tag}`) ||
            event.target == document.getElementById(`tagperson${tag}`) ||
            event.target == document.getElementById(`usernameTag${tag}`)
          ) {
            // console.log("333333333333333");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "visible";
          } else {
            // console.log("44444444444444444444");

            document.getElementById(`tagContainer${tag}`).style.visibility =
              "hidden";
            localStorage.removeItem("setting");
          }
        } else {
          // document.getElementById(`tagContainer${setting}`).style.visibility =
          //   "hidden";
          // localStorage.removeItem("setting");
        }
      }
    };
  });
  const ppid = postid;

  async function displaycomment(pid, image) {
    // console.log("88888888888888888888888888888888");

    const postid = JSON.parse(localStorage.getItem("PID"));
    if (postid != null && postid != pid) {
      if (
        document.getElementById(`commentlayer${postid}`).style.display ==
        "block"
      ) {
        document.getElementById(`commentlayer${postid}`).style.display = "none";
        document.getElementById(`commentlayer${pid}`).style.display = "block";
        document.getElementById(`uploadpost${pid}`).style.position = "relative";
        localStorage.setItem("PID", JSON.stringify(pid));
      }
    }
    if (postid == pid) {
      document.getElementById(`commentlayer${pid}`).style.display = "block";
      document.getElementById(`uploadpost${pid}`).style.position = "relative";
    }
    if (postid == null) {
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
        // console.log("biiiiiiiiiiiiiiggggggggggggggggerrrrrrrrrrr");
        document.getElementById(`commentlayer${pid}`).style.marginTop =
          "-" + upwidth + "px";
      } else {
        var upwidth = divwidth / 1.2;
        document.getElementById(`commentlayer${pid}`).style.marginTop =
          "-" + upwidth + "px";
      }

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
    if (
      document.getElementById(`commentlayer${pid}`).style.display === "block"
    ) {
      async function FollowerPostsloader() {
        // console.log("999999999999999999999999999999999999");

        setTimeout((i = 0) => {
          i = i + 1;
        }, 500);

        const returnedUserdata = await FollowerPost(id);
        commentclick(pid);
        setUserdata(returnedUserdata.result);
        // postRender();
      }
      FollowerPostsloader();
    }
  }

  async function searchfunction(id, search) {
    // if (search === "") {
    //   setSearchresult(() => []);
    // }
    if (search != "") {
      const returnedsearch = await Searchuser(id, search);
      setSearchresult(() => []);
      setSearchresult(returnedsearch.result);
    } else if (search == "") {
      setSearchresult(() => []);
    }
  }

  const likesRender = useCallback(
    (id, pid) => {
      async function Likeloader() {
        // console.log("6666666666666666666666666666666666");

        const likereturn = await Likefunction(id, pid);
        // console.log("likereturn.data", likereturn.data);
        if (likereturn.data == 1) {
          document.getElementById(`buttonLike${pid}`).style.color = "#22a900";
        } else if (likereturn.data == 0) {
          document.getElementById(`buttonLike${pid}`).style.color = "black";
        }
      }
      Likeloader();
    },
    [id, postid]
  );

  function likerender(id, pid) {
    likesRender(id, pid);
    // console.log("postid: ", postid);
    // console.log("pid: ", pid);
  }

  function saverender(id, pid) {
    async function Saveloader() {
      // console.log("7777777777777777777777777777777777");

      const savereturn = await Savefunction(id, pid);
      // console.log("savereturn.data", savereturn.data);
      if (savereturn.data == 1) {
        document.getElementById(`buttonSave${pid}`).style.color = "#22a900";
      } else if (savereturn.data == 0) {
        document.getElementById(`buttonSave${pid}`).style.color = "black";
      }
    }
    Saveloader();
  }
  // useEffect(() => {
  //   saverender
  // })

  const observer = useRef();
  // const lasdiv = firstmessage.current;
  const postRef = useCallback(
    (post) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && empty) {
            // console.log("visible");
            setPostNumber((prevNumber) => prevNumber + 3);
          }
        },
        {
          // root: firstdiv,
          // rootMargin: "100px 0px 100px 0px",
        }
      );
      if (post) observer.current.observe(post);
    },
    [loading, empty]
  );

  async function DisplayTagedPerson(names, pid) {
    var array = names.split(" ");
    tagednamesClick(array, pid);
    // setTagid(pid);
    // setTagedperson(array);

    // const post = JSON.parse(localStorage.getItem("setting"));
    const post = tag;
    if (post != null)
      document.getElementById(`tagContainer${post}`).style.visibility =
        "hidden";
    if (post != null && post != pid) {
      // localStorage.setItem("setting", JSON.stringify(pid));
      document.getElementById(`tagContainer${post}`).style.visibility =
        "visible";
    }
    if (post === pid) {
      document.getElementById(`tagContainer${post}`).style.visibility =
        "visible";
    }
    if (post === null) {
      // localStorage.setItem("setting", JSON.stringify(pid));
      // setTimeout((i = 0) => {
      //   i = i + 1;
      // }, 800);
      // document.getElementById(`tagContainer${post}`).style.visibility =
      //   "visible";
      // document.getElementById(`tagContainer${pid}`).style.visibility =
      //   "visible";
      // localStorage.setItem("setting", JSON.stringify(pid));
    }
  }

  // if (userdata == null) {
  //   // console.log(".............................");
  //   var datalength = false;
  // } else if (userdata.length > 0) {
  //   // console.log(".............................");
  //   var datalength = true;
  // }

  if (posts == null) {
    // console.log(".............................");
    var datalength = false;
  } else if (posts.length > 0) {
    // console.log(".............................");
    var datalength = true;
  }

  // console.log("userdataaaaaaaaaaaaaaa", userdata);
  return (
    <div className="container">
      <div className="post-container">
        {datalength ? (
          posts.map((data, index) => {
            const pid = data.PID;
            var image = false;
            if (data.picture != "") {
              image = true;
            }
            // console.log("image: ", data.followingpic);
            var commentvalue = 0;
            var followingInfo = {
              friendid: data.followId,
              friendimage: data.followingpic,
              frinedname: data.followingname,
              friendbio: data.followingbio,
            };
            // console.log("data", data);
            // console.log("posts.length", posts.length);
            if (posts.length === index + 1) {
              // console.log("posts.length", posts.length);
              // console.log("index", index + 1);

              var Istaged = false;
              var NumberOfTag = data.tagperson.split(" ").length - 1;
              if (NumberOfTag > 1) {
                Istaged = true;
                // console.log("tagperson: ", data.tagperson);
                // console.log("NumberOfTag: ", NumberOfTag);
              }
              if (Istaged === false) {
                var followingInfo = {
                  frinedname: data.tagperson,
                };
              }

              return (
                <div
                  className="upload-post"
                  id={`uploadpost${data.PID}`}
                  key={data.PID}
                  ref={postRef}
                >
                  <div className="first-layer">
                    <div className="uploader">
                      <div className="uploader-photo">
                        <img
                          src={require(`../../image/${data.followingpic}`)}
                          alt=""
                          className="uploader-image"
                        />
                      </div>
                      <div className="upload-time-name">
                        <div className="uploader-name">
                          <div className="a-decoration username-tag">
                            <Link
                              to={`/Friend/${data.followingname}`}
                              state={followingInfo}
                              className="a-decoration"
                            >
                              {data.followingname}
                            </Link>
                            {data.tagperson &&
                              (Istaged ? (
                                <>
                                  <div
                                    className="a-decoration username-tag"
                                    id={`usernameTag${data.PID}`}
                                  >
                                    with{" "}
                                    <div
                                      className="a-decoration tagperson-container"
                                      id={`tagperson${data.PID}`}
                                      onClick={() => {
                                        DisplayTagedPerson(
                                          data.tagperson,
                                          data.PID
                                        );
                                      }}
                                    >
                                      {NumberOfTag} person
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Link
                                  to={`/Friend/${data.tagperson}`}
                                  state={followingInfo}
                                  className="a-decoration tagperson-container"
                                >
                                  with {data.tagperson}
                                </Link>
                              ))}
                          </div>
                        </div>
                        <div className="uploaded-time">
                          {data.difference}
                          {data.unit}
                        </div>
                      </div>
                    </div>
                    <div className="uploader-manage">
                      <div className="uploader-setting">...</div>
                    </div>
                  </div>
                  <div className="second-layer" id={`secondlayer${data.PID}`}>
                    {data.sentence && (
                      <div className="post-caption">{data.sentence}</div>
                    )}
                    {image && (
                      <div className="posted-image-container">
                        <div className="posted-image">
                          <a href="#">
                            <img
                              src={require(`../../image/${data.picture}`)}
                              alt="pic"
                              className="uploaded-image"
                            ></img>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="third-layer">
                    <div className="like-counter count-container">
                      {data.likeCount}
                      <span className="comment-span">Likes</span>
                    </div>
                    <div className="comment-counter count-container">
                      {data.comentCount}
                      <span className="comment-span">Comments</span>
                    </div>
                  </div>
                  <div className="third-layer">
                    <div className="react">
                      <div className="like">
                        <form method="post">
                          <i>
                            {likerender(id, data.PID)}
                            <FontAwesomeIcon
                              id={`buttonLike${data.PID}`}
                              className="pizza-icon"
                              onClick={() => {
                                clicklike(id, data.PID);
                              }}
                              icon={faEarth}
                            ></FontAwesomeIcon>
                          </i>
                        </form>
                      </div>
                      <div className="comment">
                        <i className="far fa-comment comment-logo">
                          <FaComment
                            id={`buttoncomment${pid}`}
                            onClick={() => {
                              displaycomment(data.PID, image);
                            }}
                          />
                        </i>
                      </div>

                      <div className="share">
                        <i className="fa fa-send share-logo">
                          <FaShare />
                        </i>
                      </div>
                    </div>
                    <div className="save">
                      {saverender(id, data.PID)}
                      <FaRegBookmark
                        id={`buttonSave${data.PID}`}
                        className="save-icon"
                        onClick={() => {
                          clicksave(id, data.PID);
                        }}
                      />
                    </div>
                  </div>
                  <form
                    method="post"
                    className="commant-layer-container"
                    id={`commentlayer${data.PID}`}
                  >
                    <Commentlist
                      id={id}
                      pid={data.PID}
                      cmt={posts}
                      postid={ppid}
                      image={image}
                      commentvalue={commentvalue}
                      displaycomments={() => {
                        displaycomment(pid, image);
                      }}
                    />
                  </form>
                </div>
              );
            } else {
              var Istaged = false;
              var NumberOfTag = data.tagperson.split(" ").length - 1;
              if (NumberOfTag > 1) {
                Istaged = true;
                // console.log("tagperson: ", data.tagperson);
                // console.log("NumberOfTag: ", NumberOfTag);
              }
              if (Istaged === false) {
                var followingInfo = {
                  frinedname: data.tagperson,
                };
              }
              return (
                <div
                  className="upload-post"
                  id={`uploadpost${data.PID}`}
                  key={data.PID}
                >
                  <div className="first-layer">
                    <div className="uploader">
                      <div className="uploader-photo">
                        <img
                          src={require(`../../image/${data.followingpic}`)}
                          alt=""
                          className="uploader-image"
                        />
                      </div>
                      <div className="upload-time-name">
                        <div className="uploader-name">
                          <Link
                            to={`/Friend/${data.followingname}`}
                            state={followingInfo}
                            className="a-decoration"
                          >
                            {data.followingname}
                          </Link>
                          {data.tagperson &&
                            (Istaged ? (
                              <>
                                <div
                                  className="a-decoration username-tag"
                                  id={`usernameTag${data.PID}`}
                                >
                                  with{" "}
                                  <div
                                    className="a-decoration tagperson-container"
                                    id={`tagperson${data.PID}`}
                                    onClick={() => {
                                      DisplayTagedPerson(
                                        data.tagperson,
                                        data.PID
                                      );
                                    }}
                                  >
                                    {NumberOfTag} person
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                to={`/Friend/${data.tagperson}`}
                                state={followingInfo}
                                className="a-decoration tagperson-container"
                              >
                                with {data.tagperson}
                              </Link>
                            ))}
                        </div>
                        <div className="uploaded-time">
                          {data.difference}
                          {data.unit}
                        </div>
                      </div>
                    </div>
                    <div className="uploader-manage">
                      <div className="uploader-setting">...</div>
                    </div>
                  </div>
                  <div className="second-layer" id={`secondlayer${data.PID}`}>
                    {data.sentence && (
                      <div className="post-caption">{data.sentence}</div>
                    )}
                    {image && (
                      <div className="posted-image-container">
                        <div className="posted-image">
                          <a href="#">
                            <img
                              src={require(`../../image/${data.picture}`)}
                              alt="pic"
                              className="uploaded-image"
                            ></img>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="third-layer">
                    <div className="like-counter count-container">
                      {data.likeCount}
                      <span className="comment-span">Likes</span>
                    </div>
                    <div className="comment-counter count-container">
                      {data.comentCount}
                      <span className="comment-span">Comments</span>
                    </div>
                  </div>
                  <div className="third-layer">
                    <div className="react">
                      <div className="like">
                        <form method="post">
                          <i>
                            {likerender(id, data.PID)}
                            <FontAwesomeIcon
                              id={`buttonLike${data.PID}`}
                              className="pizza-icon"
                              onClick={() => {
                                clicklike(id, data.PID);
                              }}
                              icon={faEarth}
                            ></FontAwesomeIcon>
                          </i>
                        </form>
                      </div>
                      <div className="comment">
                        <i className="far fa-comment comment-logo">
                          <FaComment
                            id={`buttoncomment${pid}`}
                            onClick={() => {
                              displaycomment(data.PID, image);
                            }}
                          />
                        </i>
                      </div>

                      <div className="share">
                        <i className="fa fa-send share-logo">
                          <FaShare />
                        </i>
                      </div>
                    </div>
                    <div className="save">
                      {saverender(id, data.PID)}
                      <FaRegBookmark
                        id={`buttonSave${data.PID}`}
                        className="save-icon"
                        onClick={() => {
                          clicksave(id, data.PID);
                        }}
                      />
                    </div>
                  </div>
                  <form
                    method="post"
                    className="commant-layer-container"
                    id={`commentlayer${data.PID}`}
                  >
                    <Commentlist
                      id={id}
                      pid={data.PID}
                      cmt={posts}
                      postid={ppid}
                      image={image}
                      commentvalue={commentvalue}
                      displaycomments={() => {
                        displaycomment(pid, image);
                      }}
                    />
                  </form>
                </div>
              );
            }
          })
        ) : nullpost ? (
          nopost
        ) : <div id="nofollowercontainer"></div> ? (
          <SkeletonTheme baseColor="#857875" highlightColor="#4444">
            <p>
              <Skeleton count={20} className="skeletonclass" />
            </p>
          </SkeletonTheme>
        ) : (
          <div id="nofollowercontainer"></div>
        )}
      </div>
      <div
        className="search-container"
        id="searchContainer"
        style={{ display: "none" }}
      >
        <div className="seacrh-contant">
          <div className="input-search">
            <input
              type="search"
              name=""
              value={searchs}
              onChange={(e) => {
                setSearchs(e.target.value);
                searchfunction(id, e.target.value);
              }}
              className="search-type-input"
              id="searchinput"
              placeholder="search"
            />
            <div className="search-entry-logo">
              <i className="search-icon-page" id="fasearchicon">
                <FontAwesomeIcon
                  id="fasearchicons"
                  icon={faSearch}
                ></FontAwesomeIcon>
              </i>
            </div>
          </div>
        </div>
        <div className="search-list">
          {searchresult.map((data) => {
            var friendinfo = {
              friendid: data.userID,
              friendimage: data.userimage,
              frinedname: data.username,
              friendbio: data.userbio,
            };
            return (
              <Link
                to={`/Friend/${data.username}`}
                state={friendinfo}
                className="a-decoration"
                key={data.userID}
              >
                <div
                  className="search-person-name-container"
                  id={"taggedName"}
                  // value={tag}
                  // onClick={() => {
                  //   selectPerson();
                  // }}
                >
                  <div className="search-person-photo-container">
                    <input
                      type="image"
                      src={require(`../../image/${data.userimage}`)}
                      alt="photo"
                      className="search-person-photo"
                      id={"taggedpersonphoto"}
                    />
                  </div>
                  <div className="search-person-name" id={"tageddpersonname"}>
                    {data.username}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className="taged-persons-container"
        id={`tagContainer${tag}`}
        style={{ visibility: "hidden" }}
      >
        <div className="taged-pesron-div">
          {/* {tagedperson[0] && { tagedperson }}
           */}
          {names &&
            names.map((name, index) => {
              var isLastName = true;
              var isEmpty = true;
              if (index == names.length - 1) {
                isLastName = false;
              }
              if (index + 1 == names.length - 1) {
                isLastName = false;
              }
              if (name === "") {
                isEmpty = false;
              }
              var username = name;
              var followingInfo = {
                frinedname: username,
              };
              const bottomLine = {
                borderBottom: "1px solid black",
                borderColor: "black",
                color: "red",
              };
              return (
                <div className="tag-name-container" key={index}>
                  {isEmpty && (
                    <>
                      <Link
                        to={`/Friend/${name}`}
                        state={followingInfo}
                        className="a-decoration taged-name-div"
                        // id={isLastName && bottomLine}
                      >
                        {name}
                      </Link>
                      {isLastName && <hr className="tagged-name-hr" />}
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
