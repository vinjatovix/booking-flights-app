'use strict';
const fs = require('fs');
const path = require('path');

function getImage() {
  return function (req, res, next) {
    try {
      res.writeHead(200, { 'content-type': 'image/jpg' });
      fs.createReadStream(path.resolve(__dirname + `/../../assets/avatars/${req.query.user}`)).pipe(res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { getImage };
