import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [value, setValue] = useState("");

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
