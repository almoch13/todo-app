const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json()); // Untuk meng-parsing JSON
app.use("/api", routes); // Menggunakan rute dari routes.js

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
