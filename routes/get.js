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
    const {type, sortedBy } = req.body;
    let page, pageSize;

    if (page === undefined) page = 1;
    if (pageSize === undefined) pageSize = 10;


    const data = await Asset.find({ Type: type.toLowerCase() }).sort().skip((page - 1) * pageSize).limit(pageSize);

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

module.exports = router;