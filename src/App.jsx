// src/App.js
import React from "react";
import CommentList from "./components/CommentList";
import "./App.css";
import mountains from "./assets/mountains.jpg";

const App = () => {
  return (
    <div className="App">
      <h1>Comments Section</h1>
      <div className="comments-section">
        <img
          src={mountains}
          alt="Header"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />
        <CommentList />
      </div>
    </div>
  );
};

export default App;
