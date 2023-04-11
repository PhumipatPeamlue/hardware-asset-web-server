const express = require("express");

const Asset = require("../models/asset");
const Type = require("../models/type");

const router = express.Router();

router.delete("/:AssetNo/:Type", async (req, res) => {
  try {
    const assetNo = req.params.AssetNo;
    const type = req.params.Type;

    const data = await Asset.find();
    if (data.length === 1) {
      Type.deleteOne({ Type: type });
    }
    await Asset.deleteOne({ AssetNo: assetNo });
    return res.json({
      msg: "delete asset successfully!"
    })
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;