require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server was running succesfully");
  console.log("Server was running successfully");
});

//Routers
const limiter = require('./middleware/rateLimiter.js');
app.use(limiter);

const authRouter = require('./routers/authRoutes.js');
app.use('/api/auth', authRouter);

// Url Routers
const urlRouter = require('./routers/urlRouter.js');
app.use('/api/url', urlRouter);
const { redirectUrl } = require("./controllers/urlController");
app.get("/:shortCode", redirectUrl);

// DataBase Connection 
require("./config/db.js");

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log("Server is running at", port);
});
