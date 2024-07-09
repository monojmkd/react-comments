// src/components/CommentForm.js
import React, { useState } from "react";
// Assuming your CSS file is named CommentForm.css

const CommentForm = ({ submitComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      submitComment(text);
      setText("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows="4"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
