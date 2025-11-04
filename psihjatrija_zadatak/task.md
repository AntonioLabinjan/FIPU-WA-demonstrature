---

## 🧠 Tema: Psihijatrijske klinike i uputnice

### **Opis**

Otišli ste u trgovinu i malo promatrali cijene. Odlučili ste ništa ne kupiti i samo otišli doma.
Kad ste došli doma, upalili ste TV i taman naletili na prijenos sjednice Sabora.
I sada...treba vam psihička pomoć. Nažalost, ne mogu vam pomoći, ali ako si složite malu lokalnu psihijatriju, možda ćete biti bolje.
Trebate izraditi Express poslužitelj koji simulira jednostavni sustav za **upravljanje psihijatrijskim klinikama i uputnicama pacijenata**.
Podaci se čuvaju *in-memory*, u poljima objekata.

---

## 📂 Entiteti

### 1️⃣ **Klinika**

Svaka psihijatrijska klinika ima:

* `id` — jedinstveni ID klinike
* `naziv` — ime klinike
* `lokacija` — grad / adresa
* `broj_kreveta` — broj kreveta (ne može biti negativan)
* `broj_psihijatara` — broj liječnika u klinici (ne može biti negativan)
* `kontakt_broj` — telefonski broj

### 2️⃣ **Uputnica**

Svaka uputnica ima:

* `id` — jedinstveni ID uputnice
* `id_klinike` — ID klinike na koju je pacijent upućen
* `ime_pacijenta` — ime pacijenta
* `prezime_pacijenta` — prezime pacijenta
* `dijagnoza` — npr. “Anksiozni poremećaj”
* `datum` — datum izdavanja uputnice
* `hitno` — boolean (true/false)

---

## 🔀 Rute

### **Rute za klinike (`/klinike`)**

* `GET /klinike` – dohvati sve klinike
* `GET /klinike/:id` – dohvati kliniku po ID-u
* `POST /klinike` – dodaj novu kliniku
* `PUT /klinike/:id` – potpuno ažuriraj kliniku
* `PATCH /klinike/:id` – djelomično ažuriraj kliniku
* `DELETE /klinike/:id` – obriši kliniku

### **Rute za uputnice (`/uputnice`)**

* `GET /uputnice` – dohvati sve uputnice
* `GET /uputnice/:id` – dohvati pojedinu uputnicu
* `POST /uputnice` – dodaj novu uputnicu
* `DELETE /uputnice/:id` – obriši uputnicu

---

## ✅ Provjere (validacije)

* ID-evi moraju biti **brojevi** (ako nisu → `400 Bad Request`)
* Kod dodavanja nove klinike:

  * svi podaci moraju biti poslani
  * `broj_kreveta` i `broj_psihijatara` ne smiju biti negativni
* Kod dodavanja nove uputnice:

  * mora postojati klinika s tim `id_klinike`
  * svi potrebni podaci moraju biti prisutni
  * `hitno` mora biti boolean
* Ako nešto ne postoji → `404 Not Found`

---

## 📁 Struktura projekta

```
psyhi-server/
├── index.js
├── routes/
│   ├── klinike.js
│   └── uputnice.js
├── package.json
└── .gitignore
```

---

## ⚙️ Primjeri ruta

### POST /klinike

```json
{
  "naziv": "Psihijatrijska klinika Sv. Ivan",
  "lokacija": "Zagreb",
  "broj_kreveta": 120,
  "broj_psihijatara": 15,
  "kontakt_broj": "01 5555 444"
}
```

### POST /uputnice

```json
{
  "id_klinike": 1,
  "ime_pacijenta": "Marko",
  "prezime_pacijenta": "Marić",
  "dijagnoza": "Depresivni poremećaj",
  "datum": "2025-11-04",
  "hitno": false
}
```

---

#### Dodatno se poigrajte s opcijama filtriranja i sortiranja ako vam se da (svakako to morate znat, pa savjetujem da ponovite :D )
#### Budite kreativni
---
