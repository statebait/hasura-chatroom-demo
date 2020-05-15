import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_USER = gql`
  mutation addUser($user: String) {
    insert_users(objects: { username: $user }) {
      affected_rows
    }
  }
`;

const Login = ({ handleLogin }) => {
  const [value, setValue] = useState("");

  const [addUser, { error }] = useMutation(ADD_USER);

  if (error) {
    return <div>Something went wrong...Please refresh the page.</div>;
  }

  return (
    <div>
      <h2>Enter your nickname</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value) {
            addUser({
              variables: {
                user: value,
              },
            })
              .then((data) => {
                window.localStorage.setItem("USER", value);
                handleLogin();
              })
              .catch((err) => console.log(err));
          }
        }}
      >
        <input
          className="input-box"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit" className="hidden-button" />
      </form>
    </div>
  );
};

export default Login;
