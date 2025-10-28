import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "..", "data", "poruke.json");

// Helper funkcija za čitanje poruka iz datoteke
async function readPoruke() {
  try {
    const data = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Greška pri čitanju datoteke s porukama");
  }
}

// Helper funkcija za pisanje poruka u datoteku
async function writePoruke(poruke) {
  try {
    await fs.writeFile(dataFile, JSON.stringify(poruke, null, 2), "utf-8");
  } catch (err) {
    throw new Error("Greška pri zapisivanju poruka u datoteku");
  }
}

// GET /poruke – vraća sve poruke ili filtrira po posiljatelju
router.get("/", async (req, res) => {
  try {
    const poruke = await readPoruke();
    const { posiljatelj } = req.query;

    if (!posiljatelj) {
      return res.status(200).json(poruke);
    }

    if (typeof posiljatelj !== "string") {
      return res.status(400).json({ error: "Parametar posiljatelj mora biti string" });
    }

    const filtriranePoruke = poruke.filter(p => p.posiljatelj === posiljatelj);

    if (filtriranePoruke.length === 0) {
      return res.status(404).json({ error: `Nema poruka od posiljatelja: ${posiljatelj}` });
    }

    res.status(200).json(filtriranePoruke);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /poruke/:id – vraća pojedinu poruku
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID mora biti cijeli broj" });
    }

    const poruke = await readPoruke();
    const poruka = poruke.find(p => p.id === id);

    if (!poruka) {
      return res.status(404).json({
        error: "Poruka nije pronađena",
        trazeni_id: id
      });
    }

    res.status(200).json(poruka);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /poruke – dodaje novu poruku
router.post("/", async (req, res) => {
  try {
    const { id, posiljatelj, sadrzaj } = req.body;

    if (id !== undefined) {
      return res.status(400).json({ error: "ID ne smijete slati u tijelu zahtjeva." });
    }

    if (!posiljatelj || !sadrzaj) {
      return res.status(400).json({ error: "Neispravni podaci" });
    }

    const poruke = await readPoruke();

    const noviId = poruke.length > 0 ? poruke[poruke.length - 1].id + 1 : 1;

    const novaPoruka = {
      id: noviId,
      posiljatelj,
      sadrzaj,
      created_at: new Date().toISOString()
    };

    poruke.push(novaPoruka);
    await writePoruke(poruke);

    res.status(201).json(novaPoruka);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// curl -X POST http://localhost:3000/poruke -H "Content-Type: application/json" -d "{\"posiljatelj\":\"Antonio\",\"sadrzaj\":\"Pozdrav iz routera!\"}"

export default router;
