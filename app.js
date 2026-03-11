const express = require("express");
const app = express();
const path = require("node:path");
const indexRoute = require("./routes/index");

// Set EJS as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRoute);

// Server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on localhost:${PORT}`);
});
