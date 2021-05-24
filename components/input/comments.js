import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const [showComments, setShowComments] = useState(false);
  const [listComments, setListComments] = useState([]);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  useEffect(() => {
    if (showComments) {
      setIsFetchingComment(true);
      fetch("/api/comments/" + eventId)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        })
        .then((data) => {
          setIsFetchingComment(false);
          setListComments(data.comment);
        });
    }
  }, [showComments]);
  const { eventId } = props;

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        // show error status
        notificationCtx.showNotification({
          title: "Error!",
          status: "error",
          message: error.message | "Something went wrong!",
        });
      });
    // send data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {isFetchingComment && <p>Loading...</p>}
      {showComments && !isFetchingComment && listComments.length > 0 && (
        <CommentList comments={listComments} />
      )}
    </section>
  );
}

export default Comments;
