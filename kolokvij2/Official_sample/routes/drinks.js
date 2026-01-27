const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../db");

function validateDrink(req, res, next) {
  const data = req.body;

  if (!data || (typeof data !== "object" && !Array.isArray(data))) {
    return res.status(400).json({ message: "Prazan ili neispravan JSON" });
  }

  // Odredi tip: jedan objekt ili array
  if (Array.isArray(data)) {
    req.type = "array";
    if (data.length === 0) {
      return res.status(400).json({ message: "Polje napitaka je prazno" });
    }

    for (let drink of data) {
      const errMsg = validateSingleDrink(drink);
      if (errMsg) return res.status(400).json({ message: errMsg });
    }
  } else {
    req.type = "single";
    const errMsg = validateSingleDrink(data);
    if (errMsg) return res.status(400).json({ message: errMsg });
  }

  next();
}

function validateSingleDrink(drink) {
  if (!drink || typeof drink !== "object") return "Napitak mora biti objekt";

  const { naziv, zapremina, cijena, kolicina } = drink;

  if (!naziv || typeof naziv !== "string" || naziv.length < 3 || naziv.length > 50) {
    return "Naziv mora biti string, 3-50 znakova";
  }
  if (zapremina === undefined || typeof zapremina !== "number" || zapremina < 0.1) {
    return "Zapremina mora biti broj >= 0.1";
  }
  if (cijena === undefined || typeof cijena !== "number" || cijena < 0.5) {
    return "Cijena mora biti broj >= 0.5";
  }
  if (kolicina === undefined || typeof kolicina !== "number" || kolicina < 50) {
    return "Kolicina mora biti broj >= 50";
  }

  return null; // sve ok
}

router.get("/", async (req, res) => {
  try {
    const drinks = await getCollection("drinks").find({}).toArray();
    if (!drinks.length) return res.status(404).json({ message: "Nema napitaka u bazi" });
    res.status(200).json(drinks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom dohvaćanja napitaka" });
  }
});

router.post("/", validateDrink, async (req, res) => {
  try {
    const collection = getCollection("drinks");

    if (req.type === "single") {
      const result = await collection.insertOne(req.body);
      return res.status(201).json({ ...req.body, _id: result.insertedId });
    } else if (req.type === "array") {
      const result = await collection.insertMany(req.body);
      // Dodaj _id polja svakom objektu
      const inserted = req.body.map((drink, idx) => ({ ...drink, _id: result.insertedIds[idx] }));
      return res.status(201).json(inserted);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom dodavanja napitaka" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Neispravan identifikator" });
  }

  try {
    const drink = await getCollection("drinks").findOne({ _id: new ObjectId(id) });
    if (!drink) return res.status(404).json({ message: "Napitak nije pronađen" });
    res.status(200).json(drink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška prilikom dohvaćanja napitka" });
  }
});

module.exports = router;