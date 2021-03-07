import React, { useEffect } from "react";
import * as A from "../../../context/auth/Auth.actions";
import { useAuthContext } from "../../../context/auth/Auth.context";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { deleteAccount } from "../../../http/api";

export const DeleteAccount = ({ modal }) => {
  const [, dispatch] = useAuthContext();
  const [token, setToken] = useLocalStorage(
    JSON.parse(localStorage.getItem("token")),
    "token"
  );
  const [{ logged }] = useAuthContext();

  useEffect(() => {
    if (!logged) {
      setToken("");
      window.location.reload();
    }
    return () => {};
  }, [logged, setToken]);
  return (
    <>
      <div className="modal-container">
        <div className="delete-account">
          <h4>¿Estás seguro de desactivar tu cuenta?</h4>
          <h5>
            (Si desactivas tu cuenta no podrás volver a logearte y perderás
            todos tus datos, además de no poder volver a registrarte con el
            email utilizado)
          </h5>
        </div>

        <div className="button-container">
          <button
            className="modal-button submit-button"
            onClick={async (e) => {
              try {
                e.preventDefault();
                await deleteAccount(token, dispatch);
              } catch (err) {
                dispatch(A.switchBoolean({ name: "modal", value: !modal }));
              }
            }}
          >
            Sí
          </button>
          <button
            className="modal-button close-button"
            onClick={() => {
              dispatch(A.switchBoolean({ name: "modal", value: !modal }));
            }}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};
