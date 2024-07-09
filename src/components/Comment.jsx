import React, { useState } from "react";
import CommentForm from "./CommentForm";
import boy from "../assets/boy.png";

const Comment = ({ comment, addReply, deleteComment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (replyText) => {
    addReply(comment.id, replyText);
    setShowReplyForm(false);
  };

  return (
    <div
      className="comment"
      style={{ marginLeft: comment.parentId ? "20px" : "0" }}
    >
      <div className="comment-header">
        <img className="avatar-img" src={boy} alt="avatar" />
        <strong>{comment.author}</strong>
      </div>
      <p>{comment.text}</p>
      <div className="reply-delete-btn">
        {" "}
        <button
          className="reply-button"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
        <button
          className="delete-button"
          onClick={() => deleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {showReplyForm && <CommentForm submitComment={handleReply} />}
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        ))}
    </div>
  );
};

export default Comment;
