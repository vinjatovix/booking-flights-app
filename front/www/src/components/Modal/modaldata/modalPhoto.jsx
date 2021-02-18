import React, { useEffect, useState } from 'react';
import * as A from '../../../context/auth/Auth.actions';

export const UpdatePhoto = ({ props }) => {
  const { dispatch, modal } = props;
  const [value, setValue] = useState('');
  const token = JSON.parse(localStorage.getItem('token'));
  const body = { archivo: value };
  console.log(value);

  useEffect(() => {
    const handlerPhoto = (document, window, index) => {
      let inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling,
          labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
          let fileName = '';
          console.log(fileName);
          if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
          else fileName = e.target.value.split('\\').pop();

          if (fileName) label.querySelector('span').innerHTML = fileName;
          else label.innerHTML = labelVal;
        });
      });
    };
    handlerPhoto(document, window, 0);
  }, [value]);

  return (
    <>
      <div className="modal-container">
        <div class="container-input">
          <input
            type="file"
            name="photo"
            id="photo"
            class="inputfile"
            data-multiple-caption="{count} archivos seleccionados"
            multiple
            value={value}
            onChange={({ target }) => {
              setValue(target.value);
            }}
          />
          <label for="photo">
            <figure>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
              </svg>
            </figure>
            <span class="inputfilelabel">Seleccionar archivo</span>
          </label>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="button-submit"
            onClick={async (e) => {
              e.preventDefault();
              const res = await fetch('http://localhost:8337/update/upload', {
                method: 'PUT',
                headers: {
                  Authorization: token,
                },
                body: JSON.stringify(body),
              });
              const json = await res.json();
              console.log(json);
            }}
          >
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
    </>
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
