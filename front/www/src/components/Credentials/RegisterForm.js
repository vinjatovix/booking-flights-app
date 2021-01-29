import React from "react";


export const RegisterForm = () => {
  return (
    <form
      className="credentialsForm"
      method="post"
      action="/login"
      encType="multipart/form-data"
    >
      <input
        type="text"
        name="username"
        id="username"
        placeholder="User Name"
        required
      />
      <input
        type="email"
        name="userMail"
        id="userMail"
        placeholder="Em@il"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        required
      />
      <input
        type="password"
        name="repeatPassword"
        id="repeatPassword"
        placeholder="Repeat Password"
        required
      />
      <input type="text" name="bio" id="bio" placeholder="Bio" />

      <input type="submit" value="Registro" />
    </form>
  );
};
