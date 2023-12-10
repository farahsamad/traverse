import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPaperPlane,
  faSearch,
  faArrowUp,
  faArrowDown,
  faArrowDown19,
  faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";
import { Searchuser, Sendmessages, Lastuser } from "../../component/Api/Api";
import PersonContext from "../../context/app-context";
import useMessageload from "../../component/Hooks/useMessageload";
import axios from "axios";
import { useSocket } from "../../context/SocketProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Message() {
  const [searchs, setSearchs] = useState();
  // const [today, setToday] = useState("");
  var today = "";
  const [count, setCount] = useState();
  const socket = useSocket();
  const [searchresult, setSearchresult] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [messageid, setMessageid] = useState();
  const idexample = JSON.parse(localStorage.getItem("userid"));
  const [userid, setUserid] = useState(
    idexample ? JSON.parse(localStorage.getItem("userid")) : ""
  );
  const [userimage, setUserimage] = useState(
    idexample ? JSON.parse(localStorage.getItem("userimage")) : ""
  );
  const [username, setUsername] = useState(
    idexample ? JSON.parse(localStorage.getItem("username")) : ""
  );
  const [message, setMessage] = useState([]);
  const [messagesent, setMessagesent] = useState([
    { empty: false, message: "", date: "", id: "" },
  ]);
  const [date, setDate] = useState([]);
  const [messageNumber, setMessageNumber] = useState(0);
  const lastDiv = useRef();
  const inputText = useRef();
  const navigate = useNavigate();

  const { id, name, image } = useContext(PersonContext);
  // useMessageload(id, userid, messageNumber);

  const { loading, error, messages, empty } = useMessageload(
    id,
    userid,
    messageNumber
  );
  // console.log("messages: ", messages);

  // useEffect(() => {
  //   messages.map((data) => {
  //     console.log("item: ", data[0].unreadCount);
  //     var number = data[0].unreadCount;
  //     if (number != 0) {
  //       setCount(number);
  //     }
  //   });
  // }, [id, userid, messages]);

  const location = useLocation();
  const user = location.state;
  if (user) {
    // console.log("user.username: ", user.username);

    localStorage.setItem("userid", JSON.stringify(user.identifier));
    localStorage.setItem("username", JSON.stringify(user.username));
    localStorage.setItem("userimage", JSON.stringify(user.friendimage));
  }
  // const username = user.name;
  const firstmessage = useRef();
  const messageId = (item) => {
    // setMessageid(id);
    if (item != 0 && item == 20) {
      console.log("//////////////////////////////////////");
      console.log(document.getElementById(`Message-${item}`));
      console.log("messageID:  ", item);
      document.getElementById(`Message-${item}`)?.scrollIntoView();
    }
  };

  useEffect(() => {
    console.log("messages: ", messages);
    if (messages.length <= 20) {
      console.log("***************************");
      lastDiv.current?.scrollIntoView();
    }
  });
  useEffect(() => {
    console.log("-------------------------------------");

    lastDiv.current?.scrollIntoView();
  }, []);
  const observer = useRef();
  const firstdiv = firstmessage.current;
  const messageRef = useCallback(
    (msg) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && empty) {
            console.log("visible");
            setMessageNumber((prevNumber) => prevNumber + 20);

            if (messages.length <= 20) {
              messageId(20);
            } else {
              messageId(20);
            }
          }
        },
        {
          root: firstdiv,
          // rootMargin: "100px 0px 100px 0px",
        }
      );
      if (msg) observer.current.observe(msg);
    },
    [loading, empty]
  );
  const observe = useRef();

  const lastDiv2 = useCallback((msg) => {
    if (observe.current) observe.current.disconnect();
    observe.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting == false) {
          console.log("visible222");
          document.getElementById("scroll-button").style.display = "block";
        } else {
          console.log("notvisible222");

          document.getElementById("scroll-button").style.display = "none";
        }
      },
      {
        root: firstdiv,
        // rootMargin: "100px 0px 100px 0px",
      }
    );
    if (msg) observe.current.observe(msg);
  }, []);

  const todayContainer = (item) => {
    if (item == "Today") {
      today = "Today";
    }
  };
  // useEffect(() => {
  //   axios
  //     .post("http://localhost/traverse-backend/loadMessage.php", {
  //       id,
  //       userid,
  //       messageNumber,
  //     })
  //     .then((data) => {
  //       // console.log("returne message: ", data);
  //       let newArray = [...data.data];
  //       newArray.reverse();
  //       newArray.map((data) => {
  //         console.log("data ", data);
  //         setMessagesent((prevmessage) => {
  //           return [
  //             ...prevmessage,
  //             {
  //               empty: true,
  //               message: data.message,
  //               date: data.send_time,
  //               id: userid,
  //             },
  //           ];
  //         });
  //       });
  //       // setMessagesent((prevMessages) => {
  //       //   // console.log("prevMessages: ", prevMessages);
  //       //   // console.log("newArray: ", newArray);
  //       //   return [...new Set([newArray, ...prevMessages])];
  //       // });
  //     });
  // },[]);

  async function searchfunction(id, search) {
    if (search != "") {
      document.getElementById("conversationHistory").style.display = "none";
      document.getElementById("searchList").style.display = "block";
      const returnedsearch = await Searchuser(id, search);
      setSearchresult(() => []);
      setSearchresult(returnedsearch.result);
      // console.log("returnedsearch.result: ", returnedsearch.result);
    } else if (search == "") {
      document.getElementById("conversationHistory").style.display = "block";

      setSearchresult(() => []);
    }
  }

  useEffect(() => {
    async function lastConversation() {
      const returneduser = await Lastuser(id);
      setConversation(returneduser.result);
      // console.log("returnedsearch.result: ", returnedsearch.result);
      // } else if (search == "") {
      //   setSearchresult(() => []);
      // }
    }
    lastConversation();
  }, [id, userid]);

  async function chatwith(id, senderID, name, image) {
    localStorage.setItem("userid", JSON.stringify(senderID));
    localStorage.setItem("username", JSON.stringify(name));
    localStorage.setItem("userimage", JSON.stringify(image));
    setUserid(senderID);
    setUsername(name);
    setUserimage(image);
    const Messagestatus = "read";
    const message = "";
    window.location.reload();
    const sendresult = await Sendmessages(id, senderID, message, Messagestatus);
  }

  const addMessagetochat = useCallback(
    (userid, message) => {
      // console.log("message is ", message);
      const thismessageDate = new Date();
      setMessagesent((prevmessage) => {
        return [
          ...prevmessage,
          {
            empty: true,
            message: message,
            date:
              thismessageDate.getHours() + ":" + thismessageDate.getMinutes(),
            id: userid,
          },
        ];
      });
      // setToday("Today");
      lastDiv.current?.scrollIntoView();
    },

    [setMessagesent]
  );

  async function sendMessage() {
    const Messagestatus = "send";
    // setDate((prevDate) => {
    //   return [
    //     ...prevDate,
    //     thismessageDate.getHours() + ":" + thismessageDate.getMinutes(),
    //   ];
    // });

    const sendresult = await Sendmessages(id, userid, message, Messagestatus);
    if (sendresult.result === "sent") {
      // socket.emit("send-message", { id, userid, message });
      lastDiv.current?.scrollIntoView();
      inputText.current.value = "";
      axios
        .post("http://localhost/traverse-backend/loadMessage.php", {
          id,
          userid,
          messageNumber,
        })
        .then((data) => {
          messages = data.data;
        });
      addMessagetochat(id, message);
    }
  }

  async function sendMsg(event) {
    // setDate((prevDate) => {
    //   return [
    //     ...prevDate,
    //     thismessageDate.getHours() + ":" + thismessageDate.getMinutes(),
    //   ];
    // });
    if (event.keyCode === 13) {
      const Messagestatus = "send";
      const sendsresult = await Sendmessages(
        id,
        userid,
        message,
        Messagestatus
      );
      if (sendsresult.result == "sent") {
        socket.emit("send-message", { id, userid, message });
        lastDiv.current?.scrollIntoView();
        inputText.current.value = "";
        axios
          .post("http://localhost/traverse-backend/loadMessage.php", {
            id,
            userid,
            messageNumber,
          })
          .then((data) => {
            messages = data.data;
          });
        addMessagetochat(id, message);
      }
    }
  }

  var i = 0;

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", ({ userid, sender, message }) => {
      // console.log("message is ", message);
      const thismessageDate = new Date();
      setMessagesent((prevmessage) => {
        return [
          ...prevmessage,
          {
            empty: true,
            message: message,
            date:
              thismessageDate.getHours() + ":" + thismessageDate.getMinutes(),
            id: sender,
          },
        ];
      });
    });
    // console.log("message is ");
    return () => socket.off("receive-message");
  }, [socket, addMessagetochat, sendMessage, sendMsg]);

  return (
    <div className="message-page-container">
      <div className="message-container">
        <div className="communicators-container">
          <div className="communicators-serach-input">
            <div className="message-seacrh-contant">
              <div className="message-input-search">
                <input
                  type="text"
                  name=""
                  value={searchs}
                  onChange={(e) => {
                    setSearchs(e.target.value);
                    searchfunction(id, e.target.value);
                  }}
                  className="message-search-type-input"
                  id="searchinput"
                  placeholder="search"
                />
                <div className="message-search-entry-logo">
                  <i className="search-icon-page" id="fasearchicon">
                    <FontAwesomeIcon
                      id="fasearchicons"
                      icon={faSearch}
                    ></FontAwesomeIcon>
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="communicators-list" id="conversationHistory">
            {conversation.map((data) => {
              var friendinfo = {
                friendid: data.userID,
                friendimage: data.userimage,
                friendname: data.username,
                friendbio: data.userbio,
              };
              // console.log("data::: ", data);
              if (data.sendby != id) {
                if (data.message_status === "read") {
                  var MessageColor = "read-message";
                } else if (data.message_status === "unread") {
                  var MessageColor = "unread-message";
                }
              }
              var selectedUser = false;
              if (userid === data.userID) {
                selectedUser = true;
              }
              var counter = false;
              if (
                data.unreadCount != 0 &&
                data.unreadCount != "" &&
                data.unreadCount != null
              ) {
                counter = true;
              }
              return (
                <div
                  className="communicator-container"
                  id={selectedUser && "communicatorContainer"}
                  key={data.MID}
                  onClick={() => {
                    // console.log("data", data);
                    if (window.innerWidth >= 500) {
                      chatwith(id, data.userID, data.username, data.userimage);
                    } else {
                      navigate(`${data.username}`, { state: friendinfo });
                    }
                  }}
                >
                  <div className="communicator-info">
                    <div className="search-person-photo-container">
                      <input
                        type="image"
                        src={require(`../../image/${data.userimage}`)}
                        alt="photo"
                        className="search-person-photo"
                        id={"taggedpersonphoto"}
                      />
                    </div>

                    <div
                      className="meassge-search-person-name"
                      id={"tageddpersonname"}
                    >
                      <div className="last-message-info ">
                        {data.username}
                        <div
                          className="last-time"
                          id={selectedUser ? "" : MessageColor}
                        >
                          {messagesent[messagesent.length - 1].empty &&
                          selectedUser
                            ? messagesent[messagesent.length - 1].date
                            : data.send_time}
                        </div>
                      </div>
                      <div className="last-message-info ">
                        <h5
                          className="last-message"
                          id={selectedUser ? "" : MessageColor}
                        >
                          {messagesent[messagesent.length - 1].empty &&
                          selectedUser
                            ? messagesent[messagesent.length - 1].message
                            : data.message}
                        </h5>
                        {counter ? (
                          selectedUser ? (
                            ""
                          ) : (
                            <div className="unread-message-counter-container">
                              <div className="unread-message-counter">
                                {data.unreadCount}
                              </div>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="communicators-list"
            id="searchList"
            style={{ display: "none" }}
          >
            {searchresult.map((data) => {
              var friendinfo = {
                friendid: data.userID,
                friendimage: data.userimage,
                frinedname: data.username,
                friendbio: data.userbio,
              };
              return (
                <div
                  className="communicator-container"
                  key={data.userID}
                  onClick={() => {
                    chatwith(id, data.userID, data.username, data.userimage);
                  }}
                >
                  <div className="communicator-info">
                    <div className="search-person-photo-container">
                      <input
                        type="image"
                        src={require(`../../image/${data.userimage}`)}
                        alt="photo"
                        className="search-person-photo"
                        id={"taggedpersonphoto"}
                      />
                    </div>

                    <div
                      className="meassge-search-person-name"
                      id={"tageddpersonname"}
                    >
                      {data.username}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-container">
          {userid ? (
            <>
              <div className="top-bar-container">
                <div className="search-person-photo-container message-image-container">
                  <input
                    type="image"
                    src={require(`../../image/${userimage}`)}
                    alt="photo"
                    className="search-person-photo"
                    id={"taggedpersonphoto"}
                  />
                </div>
                <div className="chatter-name">{username && username}</div>
              </div>

              <div className="bottom-bar-container">
                <form className="message-form">
                  <input
                    type="text"
                    ref={inputText}
                    className="message-input"
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Please enter text"
                  />
                  {/* <div
                  className="send-icon"
                  onClick={() => {
                    sendmessage();
                  }}
                > */}

                  <i className="send-icon-container" id="fasearchicon">
                    <input
                      type="submit"
                      name="send"
                      onClick={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                        sendMsg();
                      }}
                      id="submit"
                      className="send-icon"
                      hidden
                    />
                    <button
                      name="send"
                      onClick={(e) => {
                        // console.log("click");
                        e.preventDefault();
                        sendMessage();
                        inputText.current.value = "";
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                        sendMsg();
                        inputText.current.value = "";
                      }}
                      id="submit"
                      className="send-icon"
                    >
                      <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                  </i>
                </form>
              </div>
              <div className="middle-bar-container" ref={firstmessage}>
                <div className="user-chat-div">
                  <span ref={messageRef}></span>

                  {messages &&
                    messages.map((message, index) => {
                      // let dateValue = Calcdate(data);
                      // return data.map((message, index) => {
                      // day = Calcdate(message.time_day, message.MID);
                      // console.log("INSIDE: ", day);
                      // var results;
                      // console.log("INSIDE: ", daysArray);
                      // daysArray.map((item) => {
                      //   if (item.MID == message.MID) {
                      //     results = item.date;
                      //   }
                      // });
                      i = i + 1;
                      // console.log("i: ", i);
                      var getDate;
                      var prevMessage = messages[index - 1]?.time_day;
                      if (prevMessage == message?.time_day) {
                        getDate = "";
                      } else {
                        var day = message.time_day.split("-");
                        var thisday = new Date();
                        if (
                          day[2] == thisday.getDate() &&
                          day[0] == thisday.getFullYear() &&
                          day[1] == thisday.getMonth() + 1
                        ) {
                          getDate = "Today";
                          todayContainer("Today");
                          // setToday(getDate);
                        } else {
                          var dayName = new Date(
                            message?.time_day
                          ).toLocaleString("en-us", { weekday: "long" });
                          if (day[1] == 1) {
                            getDate = `${dayName} Jan ${day[2]}`;
                          }
                          if (day[1] == 2) {
                            getDate = `${dayName} Feb ${day[2]}`;
                          }
                          if (day[1] == 3) {
                            getDate = `${dayName} Mar ${day[2]}`;
                          }
                          if (day[1] == 4) {
                            getDate = `${dayName} Apr ${day[2]}`;
                          }
                          if (day[1] == 5) {
                            getDate = `${dayName} May ${day[2]}`;
                          }
                          if (day[1] == 6) {
                            getDate = `${dayName} Jun ${day[2]}`;
                          }
                          if (day[1] == 7) {
                            getDate = `${dayName} Jul ${day[2]}`;
                          }
                          if (day[1] == 8) {
                            getDate = `${dayName} Aug ${day[2]}`;
                          }
                          if (day[1] == 9) {
                            getDate = `${dayName} Sep ${day[2]}`;
                          }
                          if (day[1] == 10) {
                            getDate = `${dayName} Oct ${day[2]}`;
                          }
                          if (day[1] == 11) {
                            getDate = `${dayName} Nov ${day[2]}`;
                          }
                          if (day[1] == 12) {
                            getDate = `${dayName} Dec ${day[2]}`;
                          }
                        }
                      }
                      // console.log("messages:  ", messages);
                      // if (index === messages.length - 20 && index != 0) {
                      //   messageId(messages[index - 3]?.message.MID);
                      //   // console.log("messageID:  ", message.MID);
                      //   console.log("messageID:  ", message);
                      // }
                      var messageIdentifier = "";
                      if (message.MID != null) {
                        messageIdentifier = `Message-${i}`;
                      }
                      if (message.sendby === id) {
                        return (
                          <>
                            {getDate && (
                              <div className="send-date">
                                <div className="today-container">
                                  <div className="today">{getDate}</div>
                                </div>
                              </div>
                            )}
                            <div
                              className="only-chat-container"
                              key={message.MID}
                              id={`Message-${i}`}
                            >
                              <div className="message-value-container">
                                <div className="message-value">
                                  {message.message}
                                </div>
                                <div className="message-date">
                                  {message.send_time}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      } else if (message.sendby === userid) {
                        return (
                          <>
                            {getDate && (
                              <div className="send-date">
                                <div className="today-container">
                                  <div className="today">{getDate}</div>
                                </div>
                              </div>
                            )}
                            <div
                              className={`receiver-chat-container ${message.MID}`}
                              key={message.MID}
                              id={`Message-${i}`}
                            >
                              <div className="receiver-message">
                                <div className="message-value">
                                  {message.message}
                                </div>
                                <div className="message-date">
                                  {message.send_time}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      // });
                    })}
                  {loading && <div>Loading...</div>}
                  {error && <div>Error</div>}
                  {messagesent.map((message) => {
                    {
                      if (message.empty == true) {
                        if (today != "Today") {
                          var day = true;
                          // setToday("Today");
                          today = "Today";
                        }
                        if (message.id == id) {
                          return (
                            <>
                              {day && (
                                <div className="send-date">
                                  <div className="today-container">
                                    <div className="today">Today</div>
                                  </div>
                                </div>
                              )}
                              <div
                                className="only-chat-container"
                                key={message.message}
                              >
                                <div className="message-value-container">
                                  <div className="message-value">
                                    {message.message}
                                  </div>
                                  <div className="message-date">
                                    {message.date}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        } else if (message.id == userid) {
                          return (
                            <>
                              {day && (
                                <div className="send-date">
                                  <div className="today-container">
                                    <div className="today">Today</div>
                                  </div>
                                </div>
                              )}
                              <div
                                className="receiver-chat-container"
                                key={message.message}
                              >
                                <div className="receiver-message">
                                  <div className="message-value">
                                    {message.message}
                                  </div>
                                  <div className="message-date">
                                    {message.date}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      }
                    }
                  })}
                  <div className="" ref={lastDiv}>
                    <div style={{ visibility: "hidden" }}>Hi</div>
                  </div>
                  <div className="" ref={lastDiv2}></div>
                  <div>
                    <div
                      className="scroll-down-button-container"
                      id="scroll-button"
                      onClick={() => {
                        lastDiv.current?.scrollIntoView();
                        document.getElementById("scroll-button").style.display =
                          "none";
                      }}
                      style={{ display: "none" }}
                    >
                      <div className="down-arrow-container">
                        <FontAwesomeIcon
                          className="scroll-down-icon"
                          icon={faArrowDown}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="welcome-to-chat">
              <div className="welcome-to-chat-message">
                Welcome to chat
                <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
