import React, { useEffect, useState } from 'react';
import * as A from '../../../context/auth/Auth.actions';
import { useForm } from 'react-hook-form';
import { uploadPhoto } from './uploadPhoto';
import { ErrorMessage } from '../../common/index';

export const UpdatePhoto = ({ props, photo, token, setToken }) => {
  const { register, handleSubmit } = useForm();

  const { dispatch, modal } = props;
  const [value, setValue] = useState('Seleccionar archivo');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handlerPhoto = (document) => {
      let inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        input.addEventListener('change', function (e) {
          let fileName = '';
          if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
          else fileName = e.target.value.split('\\').pop();

          if (fileName) setValue(fileName);
        });
      });
    };
    handlerPhoto(document);
  }, [value]);

  const onSubmit = async (data) => {
    try {
      const res = await uploadPhoto(data, token);
      const json = await res.json();
      if (!json.ok) {
        throw json;
      }
      setToken(json.token);
      dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
    } catch (err) {
      setErrorMessage(err.details);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-container">
        <div className="container-input">
          <input type="file" name="photo" id="photo" className="inputfile" ref={register} />
          <label htmlFor="photo">
            <figure>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
              </svg>
            </figure>
            <span className="inputfilelabel">{value}</span>
          </label>
        <ErrorMessage children={errorMessage} />
        </div>
        <div className="button-container">
          <button type="submit" formEncType="multipart/form-data" className="button-submit">
            Subir
          </button>
          <button
            className="button-close"
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </form>
  );
};

// export const UpdatePhoto = ({ props }) => {
//   const { dispatch, modal } = props;
//   return (
//     <>
//       <form>
//         <label for="update-photo">Sube una nueva foto</label>
//         <input type="file" name="update-photo" id="update-photo" accept=".jpg, .png, .jpeg" />
//       </form>
//       <div className="button-container">
//         <button className="button-submit">Subir</button>
//         <button
//           className="button-close"
//           onClick={() => {
//             dispatch(A.switchBoolean({ name: 'modal', value: !modal }));
//           }}
//         >
//           Cerrar
//         </button>
//       </div>
//     </>
//   );
// };
