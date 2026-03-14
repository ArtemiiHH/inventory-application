const express = require("express");
const app = express();
const path = require("node:path");

// Routes
const indexRoute = require("./routes/index");
const productRoute = require("./routes/products");
const categoryRoute = require("./routes/categories");

// Register body parser
app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use(express.static("public"));

// Set EJS as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);

// Server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on localhost:${PORT}`);
});
