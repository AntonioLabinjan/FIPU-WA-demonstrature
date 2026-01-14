---

# BOXREC-SERVER — ExpressJS Middleware Zadatak

## Cilj zadatka

Cilj ovog zadatka je ponoviti:

* Express middlewares
* Routers
* Data validation (`express-validator`)
* Backend structure

Aplikacija koristi **in-memory podatke** (bez baze).

---

## Opis aplikacije

Izradite ExpressJS poslužitelj pod nazivom **`boxrec-server`** na proizvoljnom portu.

Aplikacija vodi evidenciju boksača i omogućuje dohvat, dodavanje i ažuriranje njihovih podataka.

---

## Model podataka – Boksač

```json
{
  "id": 101,
  "firstName": "Mike",
  "lastName": "Tyson",
  "age": 57,
  "wins": 50,
  "losses": 6,
  "knockouts": 44,
  "country": "USA"
}
```

---

## 📊 Početni podaci (in-memory)

```js
[
  {
    id: 101,
    firstName: "Mike",
    lastName: "Tyson",
    age: 57,
    wins: 50,
    losses: 6,
    knockouts: 44,
    country: "USA"
  },
  {
    id: 102,
    firstName: "Muhammad",
    lastName: "Ali",
    age: 74,
    wins: 56,
    losses: 5,
    knockouts: 37,
    country: "USA"
  },
  {
    id: 103,
    firstName: "Mirko",
    lastName: "Cro Cop",
    age: 49,
    wins: 38,
    losses: 11,
    knockouts: 30,
    country: "Croatia"
  }
]
```

---

## Rute

### GET

* `GET /fighters`
  Vraća listu svih boksača

* `GET /fighters/:id`
  Vraća boksača s određenim `id`-om

---

### POST

* `POST /fighters`
  Dodaje novog boksača u listu (in-memory)

---

### PATCH

* `PATCH /fighters/:id`
  Ažurira podatke postojećeg boksača

---

## Middleware zadaci

### Globalni logger middleware

Implementirajte middleware koji se izvršava za **svaki zahtjev** i ispisuje:

```
[boxrec-server] [YYYY-MM-DD HH:MM:SS] HTTP_METODA URL
```

Primjer:

```
[boxrec-server] [2026-01-14 15:32:10] GET /fighters
```

---

### Middleware za provjeru postojanja boksača

Implementirajte middleware `findFighterById` koji:

* čita `id` iz `req.params`
* provjerava postoji li boksač s tim `id`-om
* ako postoji → sprema ga u `req.fighter`
* ako ne postoji → vraća `404 Not Found`

Middleware koristiti na rutama:

* `GET /fighters/:id`
* `PATCH /fighters/:id`

Middleware mora biti u zasebnoj datoteci unutar direktorija:

```
/middleware
```

---

## Routeri

* Sve rute vezane uz boksače moraju biti definirane u **zasebnom routeru**
* Router mountati u glavnoj aplikaciji pod `/fighters`

---

## Validacija (express-validator)

Instalirati biblioteku:

```bash
npm install express-validator
```

---

### Validacije po rutama

#### GET `/fighters/:id`

* `id` mora biti tipa **integer**

---

#### POST `/fighters`

Obavezna polja:

* `firstName` – string, nije prazno
* `lastName` – string, nije prazno
* `age` – integer > 0
* `wins` – integer ≥ 0
* `losses` – integer ≥ 0
* `knockouts` – integer ≥ 0
* `country` – string, nije prazno

---

#### PATCH `/fighters/:id`

* mora biti poslano **barem jedno** od sljedećih polja:

  * `firstName`
  * `lastName`
  * `age`
  * `wins`
  * `losses`
  * `knockouts`
  * `country`
* sva poslata polja moraju biti ispravnog tipa

---

## Obrada grešaka validacije

Ako validacija ne prođe:

* vratiti HTTP status **400**
* poslati **error objekt** koji generira `express-validator`

---

## Napomene

* Nije dozvoljeno korištenje baze podataka
* Podaci se čuvaju isključivo u memoriji
* Fokus zadatka je na middlewareima i validaciji

---

## Predaja

Predati:

* cijeli projekt (bez `node_modules`)
* `package.json` mora biti uključen

---

