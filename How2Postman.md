Ajmo to rastaviti korak po korak i napraviti to u Postmanu tako da bude jasno i praktično. Ovdje je cijeli postupak:

---

### 1️⃣ Kreiraj novo javno radno okruženje (Environment)

1. Otvori Postman.

2. U gornjem desnom kutu klikni na **Environment quick look** (ikona oka) ili izbornik **Environments**.

3. Klikni **+ New Environment**.

4. Daj mu ime po uputi:

   ```
   Rent-a-boat-vase_ime-vase_prezime
   ```

5. Dodaj **barem jednu varijablu** – npr. URL poslužitelja:

   | Variable | Initial Value                                  | Current Value                                  |
   | -------- | ---------------------------------------------- | ---------------------------------------------- |
   | base_url | [http://localhost:5000](http://localhost:5000) | [http://localhost:5000](http://localhost:5000) |

6. **Spremi** okruženje.

---

### 2️⃣ Kreiraj novu kolekciju i zahtjev

1. U Postmanu klikni **Collections** > **+ New Collection**.
2. Daj kolekciji naziv po želji, npr. `Rent-a-boat API`.
3. Dodaj **novi request** u kolekciju:

   * Klikni **Add Request**.
   * Daj mu naziv, npr. `Root Endpoint`.
   * Kao URL stavi varijablu okruženja:

     ```
     {{base_url}}/
     ```

     (dvostruke vitičaste zagrade koriste se za varijable okruženja)
   * Odaberi **GET** metodu.
4. **Spremi** request u kolekciju.

---

### 3️⃣ Testiraj zahtjev

1. Odaberi svoje okruženje (`Rent-a-boat-vase_ime-vase_prezime`) u gornjem desnom kutu Postmana.
2. Klikni **Send**.
3. Provjeri:

   * Statusni kod je **200 OK** (ili drugi koji očekuje tvoj endpoint)
   * Odgovor sadrži ono što backend vraća (npr. JSON s welcome message).

---

### 4️⃣ Napravi javno dostupni link radnog okruženja

1. Klikni na ime okruženja pored **globe** ikone u gornjem lijevom kutu.
2. Otvorit će se **Overview** stranica tvog okruženja.
3. Hoveraj mišem preko naziva okruženja i odaberi **Copy link to workspace**.
4. Zalijepi link u web preglednik.
5. Provjeri je li javno dostupno (ako se traži login, znači da je još privatno i trebaš u postavkama postaviti **public**).

---

Ako želiš, mogu ti odmah napraviti **primjer slike i screenshotove** gdje se sve vidi u Postmanu kako bi bilo 100% jasno. To bi ti odmah olakšalo praćenje.

Hoćeš da napravim te vizualne upute?
