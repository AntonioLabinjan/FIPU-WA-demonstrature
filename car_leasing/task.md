---

# **WA: Primjer 1. kolokvija – Car-Leasing poslužitelj**

ak. god. 2025./2026.

---

## **Zadatak 1 (7 bodova)**

1. Razvija se Express.js backend poslužitelj za aplikaciju **“Car-Leasing”**.
   Potrebno je stvoriti novi Node.js projekt i instalirati potrebne pakete.

2. Potrebno je definirati osnovnu strukturu Express poslužitelja koji sluša na proizvoljnom portu.

3. Potrebno je definirati **root endpoint** koji vraća tekstualnu poruku:

   ```
   Welcome to Car-Leasing API! How can I assist you today?
   ```

4. Root endpoint je potrebno nadograditi tako da, umjesto tekstualne poruke, vraća **HTML datoteku** s istom porukom unutar `<h1>` taga.
   HTML datoteka mora se nalaziti na relativnoj putanji `./public/index.html`.

---

## **Zadatak 2 (10 bodova)**

1. Potrebno je stvoriti novi resurs **cars** koji pohranjuje podatke o automobilima *in-memory* (bez baze podataka).

2. Svaki automobil mora imati sljedeća svojstva:

   * `id`
   * `brand`
   * `model`
   * `year`
   * `dailyPrice`
   * `engine_hp`

3. U memoriju je potrebno pohraniti sljedeće početne podatke:

   * Audi A4, 2021., 90 €/dan, 150 KS
   * Tesla Model 3, 2023., 120 €/dan, 350 KS
   * BMW 320d, 2020., 110 €/dan, 190 KS

4. Potrebno je implementirati sljedeće funkcionalnosti:

   ### **2.1 Dohvat svih automobila**

   * Ako lista automobila ne postoji ili je prazna, potrebno je vratiti odgovarajuću poruku o pogrešci.

   ### **2.2 Dohvat automobila prema modelu**

   * Potrebno je normalizirati korisnički unos (različiti oblici velikih/malih slova moraju dati istu usporedbu).
   * Ako automobil ne postoji, potrebno je vratiti poruku o pogrešci.

   ### **2.3 Dodavanje novog automobila**

   * `id` se mora automatski generirati jednostavnom inkrement logikom.
   * Korisnik šalje sve atribute automobila osim `id`.
   * Ako već postoji automobil s istim modelom, potrebno je vratiti poruku o pogrešci.

---

## **Zadatak 3 (12 bodova)**

1. Potrebno je stvoriti novi Express router za resurs **cars** u direktoriju `./routes`.

2. Sve endpointove iz zadatka 2 potrebno je premjestiti u datoteku unutar tog direktorija i uključiti router u glavni modul Express aplikacije pod odgovarajućim prefiksom.

3. In-memory podatke o automobilima potrebno je premjestiti u zasebnu datoteku unutar direktorija `./data`.

4. Potrebno je stvoriti novi resurs **leases** koji pohranjuje podatke o najmovima automobila *in-memory*.

   Svaki najam ima sljedeća svojstva:

   * `id`
   * `carId`
   * `customerName`
   * `leaseStart` (YYYY-MM-DD)
   * `leaseEnd` (YYYY-MM-DD)
   * `totalPrice`

5. Potrebno je dodati funkcionalnost za stvaranje novog najma:

   * Korisnik šalje sve podatke osim `id` i `totalPrice`.
   * `totalPrice` se izračunava kao broj dana * cijena najma automobila po danu.
   * Za izračun broja dana potrebno je koristiti vlastitu pomoćnu funkciju unutar direktorija `./utils`.
   * Prije stvaranja najma potrebno je provjeriti postoji li automobil s odgovarajućim `carId`.

---

## **Zadatak 4 (11 bodova)**

1. Potrebno je implementirati dodatne validacije:

   ### **4.1 Validacija prilikom dodavanja automobila**

   * Ako se proslijeđeni ključevi ne podudaraju s obaveznim atributima automobila, potrebno je vratiti poruku o pogrešci.

   ### **4.2 Validacija prilikom stvaranja najma**

   * Ako je `leaseEnd` raniji od `leaseStart`, potrebno je vratiti poruku o pogrešci.

2. Potrebno je implementirati novi endpoint koji ažurira **samo datume** postojećeg najma:

   * Endpoint prima `id` najma.
   * Ažuriraju se samo `leaseStart` i `leaseEnd`.
   * Ista validacija datuma kao u zadatku 4.2 mora i dalje vrijediti.

---

