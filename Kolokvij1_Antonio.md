---

# FIPU Web aplikacije: kolokvij — **“Skladište”** (Datum: ____)

**Ime i prezime:** ____________
**JMBAG:** ____________
**Potpis:** ____________

---

##  VAŽNA NAPOMENA

Predajete **ZIP datoteku** koja sadrži direktorij `app`.
Prije zippanja **obrišite `node_modules` direktorij**.
Naziv ZIP datoteke mora biti oblika:
`wa-skladiste-ime_prezime.zip`

Predaja se vrši putem Google Forms poveznice.

---

##  Zadatak 1 (5 bodova) — Osnovna konfiguracija

1. Kreirajte Express poslužitelj u datoteci `index.js`.
2. Poslužitelj sluša na portu **3000** i prilikom pokretanja ispisuje:
   `"Skladište server pokrenut na portu 3000"`.
3. Definirajte endpoint `/info` koji vraća JSON s podacima o studentu:

   ```json
   { "ime": "Vaše ime", "prezime": "Vaše prezime", "jmbag": "Vaš JMBAG" }
   ```
4. Dodajte ispod definicije endpointa `curl` naredbu koja ga poziva.
5. Pokrenite i testirajte poslužitelj.

---

##  Zadatak 2 (10 bodova) — Upravljanje artiklima

1. Definirajte `in-memory` listu od **5 artikala**, svaki s ključevima:
   `id`, `naziv`, `kolicina`, `lokacija`.
2. Endpoint `GET /artikli` vraća sve artikle.
3. Endpoint `GET /artikli/:id` vraća pojedini artikl po ID-u.

   * Ako artikl ne postoji → vratite poruku greške i statusni kod.
4. Endpoint `POST /artikli` dodaje novi artikl:

   * ID se automatski generira kao `zadnji_id + 1`.
   * Ako su podaci neispravni → vratite `"Neispravni podaci"`.
5. Sav kod prebacite u `app/routes/artikli.js`, definirajte Router i uvezite ga u `index.js`.

---

## Zadatak 3 (5 bodova) — Dodavanje vremenskih oznaka

1. Nadogradite `POST /artikli` da dodaje polje `"dodano_at"` s trenutnim vremenom (`new Date().toISOString()`).
2. Dodajte podršku za query parametar `lokacija` u `GET /artikli`:

   * Ako je parametar poslan → filtrirajte samo artikle s tom lokacijom.
   * Ako lokacija ne postoji ili nije string → vratite grešku.

---

## Zadatak 4 (8 bodova) — Pohrana u datoteku

1. Kreirajte datoteku `app/data/artikli.json` i u nju pohranite artikle.
2. Nadogradite sve `GET` endpointe da čitaju iz te datoteke koristeći `fs/promises`.
3. Nadogradite `POST /artikli` da novu stavku trajno dodaje u datoteku.

   * Učitati podatke → deserijalizirati → dodati novi artikl → zapisati natrag.
4. Ako dođe do greške pri čitanju/zapisu → vratite odgovarajući statusni kod i poruku greške.

---

## Zadatak 5 (12 bodova) — Upravljanje dostavama

1. Definirajte novi router `app/routes/dostave.js` s 2 endpointa:

   * `GET /dostave` → vraća listu dostava iz `app/data/dostave.json`
   * `GET /dostave/:id` → vraća dostavu po ID-u
2. Kreirajte endpoint `GET /dostave/:id/artikli` → vraća listu artikala u toj dostavi.

   * Ako dostava ne postoji → greška
   * Ako postoji → vratite artikle koji su dio te dostave (usporedite po ID-u)
3. Dodajte podršku za query parametar `sort`:

   * `asc` → sortiraj artikle po količini uzlazno
   * `desc` → po količini silazno
   * Ako vrijednost nije `asc` ni `desc` → greška
4. Ako dostava ima 1 artikl i sort parametar je poslan →
   vratite `"Nema dovoljno podataka za sortiranje"`.

---

### Ukupno: **40 bodova**

**Ostvareno: ____**

---

Želiš da ti ga napravim i u **PDF verziji s FIPU izgledom** (kao original “wa-mid”)?
Mogu ti generirati i naslovnicu + formu za upis imena i potpisa.
