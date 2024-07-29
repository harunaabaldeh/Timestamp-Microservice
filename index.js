const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let date;

  if (!req.params.date) date = new Date();
  else if (!isNaN(req.params.date)) date = new Date(parseInt(req.params.date));
  else date = new Date(req.params.date);

  if (date.toString() === "Invalid Date") res.json({ error: "Invalid Date" });
  else
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT || 5000);
});
