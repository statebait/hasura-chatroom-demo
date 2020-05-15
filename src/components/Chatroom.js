import React, { useState, useEffect } from "react";
import "./Chatroom.scss";

function updateScroll() {
  const element = document.getElementById("message-list");
  element.scrollTop = element.scrollHeight;
}

const Chatroom = ({ chatroomId, handleBack }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const user = window.localStorage.getItem("USER");

  useEffect(() => {
    if (data) updateScroll();
  }, [data]);

  if (loading) return <div>Loading...</div>;
  else if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <h2 onClick={handleBack} className="back">
        Back
      </h2>
      <div id="message-list" className="message-list">
        {data.messages.map((message, index) => {
          return (
            <div className="message" key={index}>
              {message.user}: {message.text}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentMessage) {
            sendMessage({
              variables: { chatroomId, text: currentMessage, user },
            });
            setCurrentMessage("");
          }
        }}
      >
        <input
          className="input-box"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button type="submit" className="hidden-button" />
      </form>
    </div>
  );
};

export default Chatroom;
