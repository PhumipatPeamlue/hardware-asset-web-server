const express = require("express");

const Asset = require("../models/asset");
const Type = require("../models/type");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const data = await Asset.find();
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/each-page", async (req, res) => {

  try {
    const { page, pageSize, type, sortedBy } = req.query;

    if (page === undefined) page = 1;
    if (pageSize === undefined) pageSize = 10;


    const data = await Asset.find({ Type: type.toLowerCase() }).sort({ [sortedBy]: "asc" }).skip((page - 1) * pageSize).limit(pageSize);

    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/pages/:pageSize", async (req, res) => {
  try {
    const pageSize = req.params["pageSize"];
    const count = await Asset.countDocuments();
    return res.json({
      "pages": Math.ceil(count / pageSize)
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/type/all", async (req, res) => {
  try {
    const allObj = await Type.find();
    const allTypes = [];
    for (let obj of allObj) {
      allTypes.push(obj.name);
    }
    return res.json(allTypes);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get("/search/:text", async (req, res) => {
  try {
    const text = req.params["text"];
    const data = await Asset.find({
      $or: [
        {"AssetNo": { "$regex": text, "$options": "i" }},
        {"BougthDate": { "$regex": text, "$options": "i" }},
        {"Brand": { "$regex": text, "$options": "i" }},
        {"Duration": { "$regex": text, "$options": "i" }},
        {"Expense": { "$regex": text, "$options": "i" }},
        {"Expire": { "$regex": text, "$options": "i" }},
        {"MSOffice": { "$regex": text, "$options": "i" }},
        {"MTM": { "$regex": text, "$options": "i" }},
        {"Model": { "$regex": text, "$options": "i" }},
        {"Owner": { "$regex": text, "$options": "i" }},
        {"Remark": { "$regex": text, "$options": "i" }},
        {"SerialNo": { "$regex": text, "$options": "i" }},
      ]
    });
    return res.json({
      "total": data.length,
      "data": data,
    });
    
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;