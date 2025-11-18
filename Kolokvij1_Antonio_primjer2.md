# 📘 Kolokvij – Express.js (tema: Blog platforma)

## 1. Postavljanje osnovnog Express poslužitelja

* Napravite novi projekt i instalirajte Express.
* U `index.js`:

  * Uvezite Express
  * Kreirajte aplikaciju
  * Postavite port 3000
  * Napravite GET `/` endpoint koji vraća:
    **"Dobrodošli na Blog API!"**
* Testirajte endpoint u Postmanu/Thunder Clientu.

---

## 2. Mock baze podataka (bez fs modula)

Napravite dva niza objekata:

### **Korisnici**

Sadrži objekte:
`id`, `username`, `email`, `uloga`

Dodajte barem 3 korisnika.

### **Članci**

Sadrži objekte:
`id`, `naslov`, `sadržaj`, `autorId`

Dodajte barem 3 članka.

### Napravite GET `/korisnici`

* Vraća sve korisnike kao JSON.
* Ako je polje prazno → vratite poruku + status kod (204 ili 404).

### Napravite GET `/clanci`

* Vraća sve članke.
* Ako nema članaka → vratite poruku + status.

---

## 3. Dodavanje novog korisnika – validacija (1/2)

Napravite POST `/korisnici` endpoint.

Validirajte:

* `username` postoji
* `email` postoji
* `uloga` postoji

Ako nedostaje atribut:
→ vratite `"Greška! Nedostaje atribut: [ime_atributa]"` + status **400**.

Za sada **nemojte** još spremati korisnika.

---

## 4. Dodavanje novog korisnika – spremanje (2/2)

Nadogradite POST `/korisnici`:

* Auto-increment ID (max ID + 1)
* Provjera je li email već zauzet
  Ako je → vratite status **409** + poruku o grešci.

Ako je sve ok:

* Dodajte korisnika u mock listu
* Vratite status **201** + objekt novog korisnika

---

## 5. Novi endpointovi (korisnici)

### ✔ GET `/korisnici/:id`

* Ako korisnik postoji → vratite ga + status 200
* Ako ne postoji → vratite status 404 + poruku

---

### ✔ PUT `/korisnici/:id`

* Potpuno ažuriranje korisnika (sva polja obavezna)
* Validirajte sve atribute
* Ako ID ne postoji → status 404
* Ako postoji → zamijenite korisnika novim podacima

---

### ✔ PATCH `/korisnici/:id/uloga`

* Ažuriranje samo korisničke uloge (npr. korisnik → admin)
* Ako ID ne postoji → 404
* Ako `uloga` nedostaje → 400
* Ako sve ok → status 200 + novi podatak

---

### ✔ DELETE `/korisnici/:id`

* Ako postoji → obrišite ga i vratite status 200 + poruku
* Ako ne → status 404

---

## 6. Endpointovi za članke

### ✔ POST `/clanci`

Validirajte:
`naslov`, `sadržaj`, `autorId`

Dodatna provjera:

* Ako `autorId` ne postoji među korisnicima → status 400

Ako sve ok:

* auto-increment ID
* dodajte članak
* vratite status 201

---

### ✔ GET `/clanci/:id`

* Vratite članak + status 200
* Ako ne postoji → status 404

---

### ✔ PUT `/clanci/:id`

* Ažuriranje kompletnog članka
* Svi atributi su obavezni
* Ako autorId ne postoji → status 400
* Ako članak ne postoji → status 404

---

### ✔ PATCH `/clanci/:id/naslov`

* Ažurira samo naslov članka
* Ako nedostaje `naslov` → status 400
* Ako ID ne postoji → status 404

---

### ✔ DELETE `/clanci/:id`

* Ako postoji → obrišite + status 200
* Ako ne postoji → status 404

---

## 7. Završni zadatak (kombinacija svega)

Napravite endpoint:

### ✔ GET `/korisnici/:id/clanci`

* Vraća sve članke određenog korisnika
* Ako korisnik ne postoji → status 404
* Ako postoji, ali nema članaka → vratite prazno polje + status 200

---

Ako želiš, mogu ti odmah napisati **kompletan Express kod** za ovaj kolokvij.
