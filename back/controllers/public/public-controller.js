'use strict';
const path = require('path');
/**
 *? Ruta hacia el about
 *
 * @param {*} req
 * @param {*} res
 */
function showAbout(req, res) {
  res.status(200).send({
    ok: true,
    message: 'This is about page',
    year: 2020,
    authors: ['matthewcodesido@gmail.com', 'vinjadevix@gmail.com'],
    logo: '/assets/logo.png',
    info: [
      {
        id: 1,
        text:
          'Flight Landers es una app desarrollada como proyecto final de curso en Hack A Boss por Mateo Codesido y Pablo Viña con meros fines didácticos y sin ánimo de lucro.',
      },
      {
        id: 2,
        text:
          'Se trata de una aplicación de búsqueda y reserva de vuelos que conecta más de 6000 aeropuertos en todo el mundo. Opera consumiendo datos de la API de Amadeus, uno de los proveedores de información aérea más importante del mundo.',
      },
      {
        id: 3,
        text:
          'Cualquier persona puede realizar una búsqueda en tiempo real de vuelos disponibles entre dos destinos cualquiera del mundo y ordenar los resultados según precio, duración o paradas.',
      },
    ],
    stack: ['MySQL', 'Node', 'Express', 'React'],
    tools: ['Trello', 'Basecamp', 'Figma', 'ERDplus', 'MySQL WorkBench', 'DBeaver', 'VSCode', 'Git Hub'],
    thanks: [
      'Emilia Rebolledo',
      'Sabela Hermida',
      'Alberto G. Reino',
      'Alberte Hernández',
      'Smug',
      'Murdock',
      'Oliver',
      'Armand',
      'María Viña',
      'Fernando Tato',
      'Ozo Perozo',
    ],
    links: [
      {
        name: 'Repositorio',
        url: 'https://github.com/vinjatovix/booking-flights-app',
        linkText: 'GitHub',
      },
      {
        name: 'API Docs',
        url: 'https://documenter.getpostman.com/view/12243544/TVzRGdp5',
        linkText: 'Postman Docs',
      },
      {
        name: 'Bugs',
        url: 'https://github.com/vinjatovix/booking-flights-app/issues',
        linkText: 'Informar de un error',
      },
      {
        name: 'Sugerencias',
        url: 'https://github.com/vinjatovix/booking-flights-app/issues',
        linkText: 'Sugerir mejora',
      },
    ],
    credits: [
      {
        name: 'airport-tower',
        url: 'https://www.flaticon.com/authors/surang',
        linkText: 'Surang',
      },
      {
        name: 'angle-down-solid',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'bars-solid',
        url: 'https://www.flaticon.com/authors/google',
        linkText: 'Google',
      },
      {
        name: 'biography',
        url: 'https://www.flaticon.com/authors/becris',
        linkText: 'Becris',
      },
      {
        name: 'calendar-alt-regular',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'camara',
        url: 'https://www.flaticon.com/authors/goodware',
        linkText: 'Good Ware',
      },
      {
        name: 'cloud-computing',
        url: 'https://www.flaticon.com/authors/webalys',
        linkText: 'Webalys',
      },
      {
        name: 'configuraciones',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'email',
        url: 'https://www.flaticon.com/authors/srip',
        linkText: 'Srip',
      },
      {
        name: 'exhange-alt-solid',
        url: 'https://www.flaticon.com/authors/mavadee',
        linkText: 'Mavadee',
      },
      {
        name: 'funnel-dollar.solid',
        url: 'https://www.flaticon.com/authors/pixel-perfect',
        linkText: 'Pixel perfect',
      },
      {
        name: 'globe-europe-solid',
        url: 'https://www.flaticon.com/authors/those-icons',
        linkText: 'Those icons',
      },
      {
        name: 'heart-regular',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'houglass-half-solid',
        url: 'https://www.flaticon.com/authors/kmg-design',
        linkText: 'Kmg design',
      },
      {
        name: 'informacion',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'magnifier',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },

      {
        name: 'passport',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'password',
        url: 'https://www.flaticon.com/authors/those-icons',
        linkText: 'Those icons',
      },
      {
        name: 'pen-solid',
        url: 'https://www.flaticon.com/authors/icongeek26',
        linkText: 'Icongeek26',
      },
      {
        name: 'plane-arrival',
        url: 'https://www.flaticon.com/authors/google',
        linkText: 'Google',
      },
      {
        name: 'plane-departure',
        url: 'https://www.flaticon.com/authors/google',
        linkText: 'Google',
      },
      {
        name: 'repeat',
        url: 'https://www.flaticon.com/authors/smashicons',
        linkText: 'Smashicons',
      },
      {
        name: 'reserva',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'route',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'stopwatch-solid',
        url: 'https://www.flaticon.com/authors/pixel-perfect',
        linkText: 'Pixel perfect',
      },
      {
        name: 'tag-solid',
        url: 'https://www.flaticon.com/authors/google',
        linkText: 'Google',
      },
      {
        name: 'turn-off',
        url: 'https://www.flaticon.com/authors/smashicons',
        linkText: 'Smashicons',
      },
      {
        name: 'user-solid',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'user-friends-solid',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'user-plus-solid',
        url: 'https://www.flaticon.com/authors/freepik',
        linkText: 'Freepik',
      },
      {
        name: 'wind',
        url: 'https://www.flaticon.com/authors/those-icons',
        linkText: 'Those icons',
      },
    ],
    formers: [
      'Berto Yáñez - HTML/CSS',
      'Iván Palleiro - JS',
      'Santiago Fernández - SQL',
      'Miguel López - Node',
      'Xabi Trigo - React',
    ],
  });
}

/**
 *? Ruta hacia la landing
 *
 * @param {*} req
 * @param {*} res
 */
function showLanding(req, res) {
  res.status(200).send({
    title: 'LO (&& behold ^^)',
    message: 'Route / is working properly',
  });
}

/**
 * ? Devuelve el formulario de registro
 *
 * @param {*} req
 * @param {*} res
 */
function getSignIn(req, res) {
  res.sendFile(path.join(__dirname, '../../public/signin.html'));
}

/**
 * ? Devuelve el formulario de acceso
 *
 * @param {*} req
 * @param {*} res
 */
function getLogIn(req, res) {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
}

module.exports = { showAbout, showLanding, getSignIn, getLogIn };
