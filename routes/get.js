const express = require("express");

const Asset = require("../models/asset");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await Asset.find();
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;