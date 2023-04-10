const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();

const addRouter = require("./routes/add");
const getRouter = require("./routes/get");

const { DB_URL, PORT } = process.env;
console.log(DB_URL, POR);

mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/add", addRouter);
app.use("/get", getRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});