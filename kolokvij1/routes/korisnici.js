import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const korisniciFile = path.join(__dirname, "..", "data", "korisnici.json");
const porukeFile = path.join(__dirname, "..", "data", "poruke.json");

// Helper funkcije
async function readKorisnici() {
  try {
    const data = await fs.readFile(korisniciFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Greška pri čitanju datoteke s korisnicima");
  }
}

async function readPoruke() {
  try {
    const data = await fs.readFile(porukeFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Greška pri čitanju datoteke s porukama");
  }
}

// GET /korisnici/:id/poruke – poruke korisnika
router.get("/:id/poruke", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID mora biti cijeli broj" });
    }

    const korisnici = await readKorisnici();
    const korisnik = korisnici.find(k => k.id === id);

    if (!korisnik) {
      return res.status(404).json({
        error: "Korisnik nije pronađen",
        trazeni_id: id
      });
    }

    const poruke = await readPoruke();
    let korisnikovePoruke = poruke.filter(p => p.posiljatelj === korisnik.ime);

    if (korisnikovePoruke.length === 0) {
      return res.status(404).json({ error: "Korisnik nema poruka" });
    }

    const { date_sort } = req.query;

    // Ako je parametar poslan, provjeri je li valjan
    if (date_sort) {
      if (date_sort !== "asc" && date_sort !== "desc") {
        return res.status(400).json({ error: "Parametar date_sort mora biti 'asc' ili 'desc'" });
      }

      // Ako postoji samo jedna poruka → nema dovoljno podataka za sortiranje
      if (korisnikovePoruke.length === 1) {
        return res.status(200).json({ poruka: "Nema dovoljno podataka za sortiranje" });
      }

      // Ako više od jedne poruke → sortiraj
      if (date_sort === "asc") {
        korisnikovePoruke.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else if (date_sort === "desc") {
        korisnikovePoruke.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
    }

    // Ako više od jedne poruke i date_sort nije poslan → vrati sve poruke
    res.status(200).json(korisnikovePoruke);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
