const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URL, PORT } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});