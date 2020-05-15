import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Login from "./components/Login";
import ChatroomList from "./components/ChatroomList";
import Chatroom from "./components/Chatroom";
import { client } from "./apollo";
import "./App.scss";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [chatroomId, setChatroomId] = useState();

  useEffect(() => {
    const user = window.localStorage.getItem("USER");
    if (user) setCurrentView("list");
  }, []);

  let view;
  switch (currentView) {
    case "login":
      view = (
        <Login
          handleLogin={() => {
            setCurrentView("list");
          }}
        />
      );
      break;
    case "list":
      view = (
        <ChatroomList
          handleChatroomClick={(id) => {
            setCurrentView("room");
            setChatroomId(id);
          }}
        />
      );
      break;
    case "room":
      view = (
        <Chatroom
          chatroomId={chatroomId}
          handleBack={() => {
            setCurrentView("list");
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">{view}</div>
    </ApolloProvider>
  );
}

export default App;
