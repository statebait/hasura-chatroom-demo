import React from "react";
import "./ChatroomList.scss";

const ChatroomList = ({ handleChatroomClick }) => {
  return (
    <div>
      <h1>Chatrooms</h1>
      {data.chatrooms.map((chatroom, index) => {
        return (
          <div
            className="chatroom"
            tabIndex={0}
            role="button"
            key={index}
            onKeyPress={(e) => {
              handleChatroomClick(chatroom.id);
            }}
            onClick={() => {
              handleChatroomClick(chatroom.id);
            }}
          >
            {chatroom.name}
          </div>
        );
      })}
    </div>
  );
};

export default ChatroomList;
