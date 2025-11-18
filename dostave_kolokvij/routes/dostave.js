const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

// Putanje na JSON datoteke
const DOSTAVE_PATH = path.join(__dirname, '../data/dostave.json');
const ARTIKLI_PATH = path.join(__dirname, '../data/artikli.json');

// Helperi
async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Greška pri čitanju datoteke.');
  }
}

// ---------------------------------------------------------
// GET /dostave  → sve dostave
// ---------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const dostave = await readJson(DOSTAVE_PATH);
    res.json(dostave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// GET /dostave/:id  → dostava po ID-u
// ---------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const dostave = await readJson(DOSTAVE_PATH);

    const id = parseInt(req.params.id);
    const dostava = dostave.find(d => d.id === id);

    if (!dostava) {
      return res.status(404).json({ error: "Dostava nije pronađena" });
    }

    res.json(dostava);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// GET /dostave/:id/artikli  → artikli iz dostave
// ---------------------------------------------------------
router.get('/:id/artikli', async (req, res) => {
  try {
    const dostave = await readJson(DOSTAVE_PATH);
    const artikli = await readJson(ARTIKLI_PATH);

    const id = parseInt(req.params.id);
    const dostava = dostave.find(d => d.id === id);

    if (!dostava) {
      return res.status(404).json({ error: "Dostava nije pronađena" });
    }

    // Dohvati artikle po ID-u
    let artikliDostave = artikli.filter(a => dostava.artikli.includes(a.id));

    // Sort logika
    const { sort } = req.query;

    if (sort !== undefined) {
      if (artikliDostave.length < 2) {
        return res
          .status(400)
          .json({ error: "Nema dovoljno podataka za sortiranje" });
      }

      if (sort === "asc") {
        artikliDostave.sort((a, b) => a.kolicina - b.kolicina);
      } else if (sort === "desc") {
        artikliDostave.sort((a, b) => b.kolicina - a.kolicina);
      } else {
        return res.status(400).json({ error: "Neispravna vrijednost sort parametra" });
      }
    }

    res.json(artikliDostave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
