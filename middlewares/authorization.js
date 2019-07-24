const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer', '').trim();
    if (authorization) {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(tokenDecoded.id);
      if (user.token === token) {
        return next();
      }
    }
    res.status(401).json({message: 'Authorization required'});
  } catch (error) {
    res.status(401).json({message: 'Authorization required'});
  }
};
