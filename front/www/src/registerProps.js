export const registerProps = {
  title: 'Sign In',
  action: 'http://localhost:8337/register',
  method: 'POST',
  inputs: [
    {
      type: 'text',
      name: 'username',
      id: 'username',
      placeholder: 'User Name',
      required: 'required',
    },
    {
      type: 'email',
      name: 'userMail',
      id: 'userMail',
      placeholder: 'Em@il',
      required: 'required',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'password',
      required: 'required',
    },
    {
      type: 'password',
      name: 'repeatPassword',
      id: 'repeatPassword',
      placeholder: 'Repeat password',
      required: 'required',
    },
    {
      type: 'text',
      name: 'bio',
      id: 'bio',
      placeholder: 'Bio',
    },
    {
      id: 'submit-button',
      type: 'submit',
      value: 'Registro',
    },
  ],
};
