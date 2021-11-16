const Users = require("./../users/users-model");
const bcrypt = require("bcryptjs");

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
