import express from "express";
import fightersRouter from "./routes/fighters_route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

/* aplikacijski middleware */
app.use((req, res, next) => {
  console.log(
    `[boxrec-server] [${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use("/fighters", fightersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
