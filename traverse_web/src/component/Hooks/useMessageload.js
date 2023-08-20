import axios from "axios";
import { useState, useEffect } from "react";

export default function useMessageload(id, userid, messageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [empty, setempty] = useState(false);
  //   console.log("id message: ", id);
  //   console.log("userid message: ", userid);
  //   console.log("messageNumber: ", messageNumber);

  useEffect(() => {
    setMessages([]);
  }, [userid]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .post("http://localhost/traverse-backend/loadMessage.php", {
        id,
        userid,
        messageNumber,
      })
      .then((data) => {
        // console.log("returne message: ", data);
        let newArray = [...data.data];
        newArray.reverse();
        // newArray.map((data) => {
        //   console.log("data ", data);
        // });
        setMessages((prevMessages) => {
          // console.log("prevMessages: ", prevMessages);
          // console.log("newArray: ", newArray);
          return [...new Set([newArray, ...prevMessages])];
        });

        // console.log("messages ", messages);
        setempty(data.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        return;
      });
  }, [id, userid, messageNumber]);
  return { loading, error, messages, empty };
}
