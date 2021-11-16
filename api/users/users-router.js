const express = require("express");
const router = express.Router();
const Users = require("./users-model");

router.get("/", async (req, res, next) => {
    try {
      const user = await Users.findById();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
