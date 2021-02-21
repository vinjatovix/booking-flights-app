'use strict';
const style = ` * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style-type: none;
}
body {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
    sans-serif;
  margin: 0 auto;
  display: grid;
  gap: 0.5rem;
  justify-content: center;
  justify-items: center;
  max-width: 800px;
}
.radius {
  border: 2px groove #a5f3d634;
  border-top-left-radius: 5rem;
  border-top-right-radius: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 5rem;
}
.modal-booking-header {
  width: 100vw;
  display: flex;
  flex-direction: row;
}

.booking-header-1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.25rem 0.5rem 0.5rem 3rem;
  background-color: rgb(0, 118, 228);
  background-image: url('../../assets/svg/plane-arrival-solid.svg');
  background-repeat: no-repeat;
  background-size: 1.75rem;
  background-position: 1rem 0.5rem;
}

.booking-header-1 :first-child {
  font-size: 24px;
  margin: 0 0.25rem;
}

.booking-header-1 :last-child {
  font-size: 18px;
  font-weight: 500;
  padding-top: 0.4rem;
  color: white;
}

.booking-header-2 {
  width: 100%;
  padding: 0.5rem;
  background-color: yellow;
  display: flex;
  justify-content: flex-end;
}

.booking-header-2 h5 {
  font-size: 10px;
  padding-top: 0.5rem;
}

.booking-towns {
  width:100%;
  display: flex;
  flex-direction: row;
}

.booking-towns div h1 {
  font-size: 36px;
}
.booking-towns div h5 {
  font-size: 12px;
  font-weight: 100;
  margin-bottom: 0.25rem;
  height: 20px;
}

.booking-towns div {
  min-width: 50%;
  padding: 0.5rem 1.25rem;
}

.booking-towns-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.booking-towns-2 h5 {
  text-align: end;
}

.modal-booking-main {
  width;100%;
  background-color: #b4b4b4;
}

.modal-booking-logos {
  width:100%;
  padding: 0.75rem 1.75rem 0 1.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.modal-booking-main section img {
  width: 65px;
  transform: rotate(45deg);
}

.modal-booking-main section img[alt='silueta-avion'] {
  margin-right: 0.75rem;
}

.modal-booking-flight-data {
  width:100vw;
  padding:1rem;
  display: flex;
  justify-content: space-evenly;
}

.modal-booking-flight-data div:nth-child(2) {
  height: min-content;
  width: min-content;
  align-self: flex-end;
  font-size: 20px;
}
.modal-booking-flight-data div:nth-child(2) h5 {
  text-align: center;
}

.modal-booking-flight-data div:last-child {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.modal-booking-flight-data div h5 {
  font-weight: 100;
  padding: 0.5rem 0;
}

.modal-booking-flight-data div h4 {
  font-size: 14px;
  padding: 0.15rem 0;
}

.modal-booking-aditional-data {
  padding: 0.5rem 1rem 0 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}

.modal-booking-aditional-data div {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33vw;
  padding: 0 0.5rem;
}

.modal-booking-aditional-data div h5 {
  font-weight: 100;
}

.modal-booking-aditional-data div h4 {
  padding: 0.75rem 0.5rem;
}

.modal-booking-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem 0;
}

.modal-booking-footer * {
  padding: 0.25rem;
}

.modal-booking-footer > h5 {
  font-size: 12px;
  width: 65vw;
}

.modal-booking-footer div {
  width: 20vw;
  margin-right: 0.75rem;
}

.modal-booking-footer div h5 {
  font-weight: 100;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid black;
}
.booking-logos__line {
  min-height:100px;
  min-width:100px;
  transform: rotate(45deg);
  background-image: url("./svg/linea.svg");
}
.booking-logos__plane {
  min-width:100px;
  min-height:100px;
  transform: rotate(-45deg);
  background-image: url("./svg/avion.svg");
}
.footer{
  padding: 2rem;
}`;
exports.style = style;
