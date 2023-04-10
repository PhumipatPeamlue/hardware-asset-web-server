const express = require("express");

const Asset = require("../models/asset");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    return res.json({
      msg: "add new Asset successfully"
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;