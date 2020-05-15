import React, { useState, useEffect } from "react";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./Chatroom.scss";

function updateScroll() {
  const element = document.getElementById("message-list");
  element.scrollTop = element.scrollHeight;
}

const MESSAGE_SUBSCRIPTION = gql`
  subscription messageSubscription($chatroomId: Int!) {
    messages(where: { chatroom_id: { _eq: $chatroomId } }) {
      id
      text
      user
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($chatroomId: Int, $text: String, $user: String) {
    insert_messages(
      objects: { chatroom_id: $chatroomId, text: $text, user: $user }
    ) {
      affected_rows
    }
  }
`;

const Chatroom = ({ chatroomId, handleBack }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      chatroomId,
    },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

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
