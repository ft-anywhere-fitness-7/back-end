const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require("./../users/users-model")
const { validateCredentials, checkUserValid } = require("./auth-middleware")
const tokenMaker = require("./token-builder")

router.post("/login", validateCredentials, checkUserValid, (req, res) => {
    const user = req.userFromDb;
    res
      .status(200)
      .json({ message: `welcome, ${user.username}`, token: tokenMaker(user) });
  });

module.exports = router
