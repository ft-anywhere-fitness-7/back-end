const Users = require("./../users/users-model");
const bcrypt = require("bcryptjs");

const validateCredentials = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password || !username.trim() || !password.trim) {
      next({ status: 400, message: "username and password required" });
    } else {
      (req.body.username = username.trim()),
        (req.body.password = password.trim());
      next();
    }
  };

const checkUserValid = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const existingUser = await Users.findBy({ username });
      if (
        existingUser.length > 0 &&
        bcrypt.compareSync(password, existingUser[0].password)
      ) {
        req.userFromDb = existingUser[0];
        next();
      } else {
        next({ status: 401, message: "invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  };

  const checkUsernameTaken = async (req, res, next) => {
    try {
      const existing = await Users.findBy({ username: req.body.username });
      if (existing.length < 1) {
        next();
      } else {
        next({ status: 400, message: "username taken" });
      }
    } catch (err) {
      next(err);
    }
  };

  module.exports = { validateCredentials, checkUserValid, checkUsernameTaken }
