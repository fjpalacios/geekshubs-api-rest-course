const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const router = express.Router();

router
  .post('/register', async (req, res) => {
    try {
      const newUser = req.body;
      const user = new UserModel(newUser);
      await user.save();
      res.json({ message: 'New user saved', user });
    } catch (error) {
      const message = error.message || error.errmsg;
      res.status(404).json({ message: `Error: ${message}` });
    }
  })
  .post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (user && isSamePassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        res.json({ message: 'User logged in', token, user });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    } catch (error) {
      const message = error.message || error.errmsg;
      res.status(500).json({ message: `Error: ${message}` });
    }
  });

module.exports = router;
