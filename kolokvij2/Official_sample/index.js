require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

const drinksRouter = require("./routes/drinks");
app.use("/drinks", drinksRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const { authoriseUser } = require("./middleware");

app.get("/protected", authoriseUser, (req, res) => {
  res.json({ message: `Pozdrav ${req.user}` });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Server failed to start:", err);
  });