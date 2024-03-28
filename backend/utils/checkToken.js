const jwt = require('jsonwebtoken');

const checkToken = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  if (!token) {
    return response.status(401).json({ error: new jwt.JsonWebTokenError('jwt must be provided') });
  }

  request.token = token;
  next();
};

module.exports = checkToken;