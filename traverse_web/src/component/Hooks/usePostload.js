import axios from "axios";
import { useState, useEffect } from "react";

export default function usePostload(id, postNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [empty, setempty] = useState(false);

  console.log("postNumber: ", postNumber);
  console.log("rangeNumber: ", postNumber + 3);

  useEffect(() => {
    setPosts([]);
  }, [id]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .post("http://localhost/traverse-backend/friend_post.php", {
        id,
        postNumber,
      })
      .then((data) => {
        console.log("returned posts: ", data);

        // console.log("returne message: ", data);
        // let newArray = [...data.data];
        // newArray.reverse();
        // newArray.map((data) => {
        //   console.log("data ", data);
        // });
        setPosts((prevMessages) => {
          // console.log("prevMessages: ", prevMessages);
          // console.log("newArray: ", newArray);
          return [...new Set([...prevMessages, ...data.data])];
        });

        // console.log("messages ", messages);
        setempty(data.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        return;
      });
  }, [id, postNumber]);
  return { loading, error, posts, empty };
}
