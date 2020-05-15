import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [value, setValue] = useState("");

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
