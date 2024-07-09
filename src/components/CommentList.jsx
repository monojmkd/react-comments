import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const initialComments = [
  {
    id: 1,
    author: "Matt",
    text: "How artistic!",
    avatar: "https://via.placeholder.com/30",
    replies: [],
  },
  {
    id: 2,
    author: "Elliot Fu",
    text: "This has been very useful for my research. Thanks as well!",
    avatar: "https://via.placeholder.com/30",
    replies: [],
  },
];

const CommentList = () => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : initialComments;
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addReply = (parentId, text) => {
    const newComment = {
      id: Date.now(),
      author: "Random User",
      text,
      avatar: "https://via.placeholder.com/30",
      replies: [],
      parentId,
    };

    const addReplyToComments = (comments, parentId) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComments(comment.replies, parentId),
          };
        }
        return comment;
      });
    };

    setComments(addReplyToComments(comments, parentId));
  };

  const addComment = (text) => {
    const newComment = {
      id: Date.now(),
      author: "Random User",
      text,
      avatar: "https://via.placeholder.com/30",
      replies: [],
      parentId: null,
    };

    setComments([...comments, newComment]);
  };

  const deleteComment = (commentId) => {
    const deleteCommentFromComments = (comments, commentId) => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        } else if (comment.replies.length > 0) {
          comment.replies = deleteCommentFromComments(
            comment.replies,
            commentId
          );
        }
        return true;
      });
    };

    setComments(deleteCommentFromComments(comments, commentId));
  };

  return (
    <div>
      <CommentForm submitComment={addComment} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
