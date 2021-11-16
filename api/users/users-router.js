const express = require("express");
const router = express.Router();
const Users = require("./users-model");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
