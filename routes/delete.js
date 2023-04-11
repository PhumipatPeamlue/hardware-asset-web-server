const express = require("express");

const Asset = require("../models/asset");

const router = express.Router();

router.delete("/:AssetNo", async (req, res) => {
  try {
    const assetNo = req.params.AssetNo;
    await Asset.deleteOne({ AssetNo: assetNo });
    return res.json({
      msg: "delete asset successfully!"
    })
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;