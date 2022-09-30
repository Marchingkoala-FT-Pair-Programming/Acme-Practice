
const express = require("express");
const app = express();
const PORT = 3000; 

const router = require("./api");
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is live!");
});
