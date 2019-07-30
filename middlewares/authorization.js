const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer', '').trim();
    if (authorization) {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(tokenDecoded.id);
      if (user.token === token) {
        req.userId = tokenDecoded.id;
        return next();
      }
    }
    return res.status(401).json({ message: 'Authorization required' });
  } catch (error) {
    return res.status(401).json({ message: 'Authorization required' });
  }
};
