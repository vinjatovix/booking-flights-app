'use strict';
function getImage() {
  return function (req, res, next) {
    try {
      res.writeHead(200, { 'content-type': 'image/jpg' });
      fs.createReadStream(__dirname + `/assets/avatars/${req.query.user}`).pipe(res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { getImage };
