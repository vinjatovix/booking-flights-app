const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization || req.headers.authorization === 'null') {
      throw new Error();
    }
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);

    res.status(200).send({
      ok: true,
      decodedToken,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = { verifyToken };
