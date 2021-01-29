import React from "react";
import "./credentials.css";

export const LoginForm = () => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  return (
    <form
      className="credentialsForm"
      method="post"
      action="/login"
      encType="multipart/form-data"
    >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Send" />
    </form>
  );
};
