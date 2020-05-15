import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./ChatroomList.scss";

const GET_CHATROOMS = gql`
  {
    chatrooms {
      name
      id
    }
  }
`;

const ChatroomList = ({ handleChatroomClick }) => {
  const { loading, error, data } = useQuery(GET_CHATROOMS);
  if (loading) return <div>Loading...</div>;
  else if (error) return <div>Something went wrong</div>;

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
