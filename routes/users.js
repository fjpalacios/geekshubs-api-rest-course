const express = require('express');
const UserModel = require('../models/user');
const authorization = require('../middlewares/authorization');

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
      const user = await UserModel.isValidLogin(email, password);
      if (user) {
        await user.createAndSaveJWT();
        res.json({ message: 'User logged in', user });
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    } catch (error) {
      const message = error.message || error.errmsg;
      res.status(500).json({ message: `Error: ${message}` });
    }
  })
  .get('/logout', authorization, async (req, res) => {
    try {
      const user = await UserModel.findById(req.userId);
      if (user) {
        const token = req.headers.authorization.replace('Bearer', '').trim();
        await user.deleteJWT(token);
        res.json({ message: 'User logged out' });
      } else {
        res.status(401).json({ message: 'User not logged out' });
      }
    } catch (error) {
      const message = error.message || error.errmsg;
      res.status(500).json({ message: `Error: ${message}` });
    }
  });

module.exports = router;
