import express from "express";
import porukeRouter from "./routes/poruke.js";
import korisniciRouter from "./routes/korisnici.js"

const app = express();
app.use(express.json());

app.get("/antonio-labinjan", (req, res) => {
  res.status(200).json({
    ime: "Antonio",
    prezime: "Labinjan",
    jmbag: "0303106891"
  });
});

// curl -X GET http://localhost:3000/antonio-labinjan

app.use("/poruke", porukeRouter);
app.use("/korisnici", korisniciRouter);
app.listen(3000, () => {
  console.log("wa-mid-A server dela na portu 3000");
});
