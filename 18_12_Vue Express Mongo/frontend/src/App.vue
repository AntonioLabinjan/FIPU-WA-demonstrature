<template>
  <div>
    <h1>Kolegiji i Profesori Dashboard</h1>

    <!-- Forme za dodavanje -->
    <AddKolegij @update-list="loadKolegiji" />
    <hr />
    <AddProfesor @update-list="loadProfesore" />
    <hr />

    <!-- Filtriranje kolegija -->
    <div>
      <h2>Filtriraj kolegije</h2>

      <input v-model="nazivFilter" placeholder="Naziv kolegija" />

      <input
        v-model.number="ectsMin"
        type="number"
        placeholder="ECTS min"
      />

      <input
        v-model.number="ectsMax"
        type="number"
        placeholder="ECTS max"
      />

      <select v-model="sort">
        <option value="naziv:asc">Naziv ↑</option>
        <option value="naziv:desc">Naziv ↓</option>
        <option value="ects:asc">ECTS ↑</option>
        <option value="ects:desc">ECTS ↓</option>
      </select>

      <button @click="getKolegiji">Traži</button>
      <button @click="resetFilter">Reset</button>
    </div>

    <!-- Lista kolegija -->
    <div>
      <h2>Svi kolegiji</h2>
      <ul>
        <li v-for="k in kolegiji" :key="k._id">
          <strong>{{ k.naziv }}</strong> – {{ k.sifra }} – {{ k.profesor }} – {{ k.ects }} ECTS
        </li>
      </ul>
    </div>

    <!-- Lista profesora -->
    <div>
      <h2>Svi profesori</h2>
      <ul>
        <li v-for="p in profesori" :key="p._id">
          {{ p.ime }} {{ p.prezime }} – {{ p.email }} – Predmeti: {{ p.predmeti.join(', ') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddKolegij from './components/AddKolegij.vue';
import AddProfesor from './components/AddProfesor.vue';
import axios from 'axios';

export default {
  components: {
    AddKolegij,
    AddProfesor
  },

  data() {
    return {
      kolegiji: [],
      profesori: [],
      nazivFilter: '',
      ectsMin: '',
      ectsMax: '',
      sort: 'naziv:asc'
    };
  },

  methods: {
    async loadKolegiji() {
      try {
        const res = await axios.get('http://localhost:3000/kolegiji');
        this.kolegiji = res.data;
      } catch (err) {
        console.error('Greška pri dohvaćanju kolegija', err);
      }
    },

    async loadProfesore() {
      try {
        const res = await axios.get('http://localhost:3000/profesori');
        this.profesori = res.data;
      } catch (err) {
        console.error('Greška pri dohvaćanju profesora', err);
      }
    },

    async getKolegiji() {
      const params = {};

      if (this.nazivFilter) params.naziv = this.nazivFilter;
      if (this.ectsMin !== '') params.ects_min = this.ectsMin;
      if (this.ectsMax !== '') params.ects_max = this.ectsMax;
      if (this.sort) params.sort = this.sort;

      try {
        const res = await axios.get('http://localhost:3000/kolegiji', { params });
        this.kolegiji = res.data;
      } catch (err) {
        console.error('Greška pri dohvaćanju filtriranih kolegija', err);
      }
    },

    resetFilter() {
      this.nazivFilter = '';
      this.ectsMin = '';
      this.ectsMax = '';
      this.sort = 'naziv:asc';
      this.loadKolegiji();
    }
  },

  mounted() {
    this.loadKolegiji();
    this.loadProfesore();
  }
};
</script>
