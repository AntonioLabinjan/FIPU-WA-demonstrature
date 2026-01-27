# Primjer 2. kolokvija - Web aplikacije

Prije početka pisanja kolokvija studenti su **dužni provjeriti** jesu li na računalu instalirani **Node.js, VS Code i Postman**. Umjesto Postmana moguće je koristiti VS Code ekstenziju Thunder Client ili neki drugi HTTP klijent.

**VAŽNO!** Potrebno je pripremiti MongoDB Atlas cluster te generirati osobni **Connection String** i lozinku za povezivanje preko **Node.js drivera**.

Jednom kad ste pripremili sve potrebne alate, možete klonirati repozitorij [`fipu-wa/library-template`](https://github.com/fipu-wa/library-template) koji sadrži sve potrebne pakete i `db.js` datoteku za povezivanje na MongoDB Atlas.

Potrebno je dodati sljedeće varijable u `.env` datoteku:

```env
MONGO_URI=vaš_mongo_connection_string_s_lozinkom
DB_NAME=library_db
JWT_SECRET=vaš_tajni_ključ
```

---

# Primjer kako će izgledati 2. kolokvij (Sample zadaci)

### 1. Definiranje skupine endpointa `books.js` (**10 bodova**)

Unutar `routes/books.js` definirajte ruter za resurs `books`.

* **1.1 Implementirajte rutu** **GET** `/` koja vraća sve knjige iz Mongo kolekcije `books` u obliku JSON polja, uz odgovarajući statusni kod i poruku.

  * Ako je kolekcija prazna, vratite odgovarajući statusni kod i poruku.

* **1.2 Implementirajte rutu** **POST** `/` koja dodaje novu knjigu u kolekciju `books`.

  * Vraća JSON objekt dodane knjige s `_id` poljem.
  * Ako je JSON objekt prazan, vratite odgovarajući statusni kod i poruku.

Primjer JSON objekta za **dodavanje knjige**:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": 1937,
  "copies": 5
}
```

---

### 2. Validacija podataka (**10 bodova**)

* **2.1 Implementirajte ručnu validaciju** ulaznih podataka prilikom dodavanja knjige:

  * `title` - obavezan, tipa `string`, min duljina 3, max 100 znakova.
  * `author` - obavezan, tipa `string`, min duljina 3, max 50 znakova.
  * `year` - obavezan, tipa `number`, minimalna vrijednost 1500, maksimalna trenutna godina.
  * `copies` - obavezan, tipa `number`, minimalna vrijednost 1.

* **2.2 Implementirajte rutu** **GET** `/:id` koja vraća jednu knjigu prema `id`.

  * Ako knjiga ne postoji, vratite odgovarajući statusni kod i poruku.
  * Ako `id` nije ispravne duljine, vratite statusni kod i poruku.

---

### 3. Dodavanje više knjiga i middleware (**15 bodova**)

* **3.1 Omogućite dodavanje više knjiga** odjednom kao JSON polje objekata.

Primjer JSON polja za **dodavanje više knjiga**:

```json
[
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "year": 1937,
    "copies": 5
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "copies": 10
  }
]
```

* **3.2 Implementirajte middleware** `validateBook`:

  * Dodajte `req.type` koji sadrži `"single"` ili `"multiple"`.
  * Validirajte objekt ili polje objekata prema pravilima iz Zadatka 2.
  * Ako validacija ne uspije, vratite odgovarajući statusni kod i poruku.
  * Ako je sve OK, nastavite dalje izvođenje.

* Middleware se koristi u ruti za dodavanje knjiga.

---

### 4. Implementacija ruta za korisnike (**10 bodova**)

Dodajte novi router `users.js`:

* **4.1 Implementirajte rutu POST `/`** za dodavanje korisnika:

  * Polja: `username`, `password`, `email`.
  * Hashirajte lozinku koristeći `bcrypt`.
  * Validacija:

    * `username`: string, 3–20 znakova.
    * `password`: string, min 8 znakova, alfanumerički.
    * `email`: string, mora sadržavati `@` i `.`.

* **4.2 Implementirajte funkciju** `comparePassword(plain, hashed)` koja provjerava lozinku.

---

### 5. Implementacija rute za login korisnika (**15 bodova**)

* **5.1 POST `/login`**:

  * Ulaz: `username`, `password`.
  * Provjerite postoji li korisnik.
  * Usporedite lozinke s `comparePassword`.
  * Ako se podudaraju, generirajte JWT token s tajnim ključem iz `.env`, važi 1h.
  * Vratite JWT token u odgovoru.

* **5.2 Middleware** `authoriseUser` u `middleware.js`:

  * Provjerava JWT token iz `Authorization` headera.
  * Ako token nije validan, vrati odgovarajući statusni kod i poruku.
  * Ako je token validan, dodajte `req.user` s korisničkim imenom iz JWT-a.

---
