export const userNameProps = {
  type: "text",
  name: "username",
  id: "username",
  className: "username",
  placeholder: "User Name",
  required: "required",
  autoComplete: "off",
};
export const mailProps = {
  className: "email",
  type: "email",
  name: "email",
  id: "email",
  placeholder: "Em@il",
  required: "required",
};
export const passwordProps = {
  type: "password",
  name: "password",
  id: "password",
  className: "password",
  placeholder: "Password",
  required: "required",
};
export const rePasswordProps = {
  type: "password",
  name: "repeatPassword",
  id: "repeatPassword",
  className: "repeatPassword",
  placeholder: "Repeat password",
  required: "required",
};
export const bioProps = {
  type: "text",
  name: "bio",
  id: "bio",
  className: "bio",
  placeholder: "Motto",
};
export const buttonProps = {
  id: "submit-button",
  className: "button",
  name: "submit",
  type: "submit",
  value: "Enviar",
  style: { cursor: "pointer" },
};

export const initialRegFormState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  errorMessage: "",
  bio: "",
};

export const initialLoginFormState = {
  email: "",
  password: "",
  errorMessage: "",
};
