require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server was running succesfully");
  console.log("Server was running successfully");
});

//Routers
const authRouter = require('./routers/authRoutes.js')
app.use('/api/auth' , authRouter )

// DataBase Connection 
require("./config/db.js");

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log("Server is running at", port);
});
