<template>
  <div>
    <h2>Kolegiji</h2>

    <input
      v-model="naziv"
      placeholder="Naziv kolegija"
    />

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
      <option value="naziv">Naziv</option>
      <option value="ects">ECTS</option>
    </select>

    <button @click="getKolegiji">Traži</button>

    <ul>
      <li v-for="k in kolegiji" :key="k._id">
        <strong>{{ k.naziv }}</strong>
        – {{ k.ects }} ECTS  
        – {{ k.profesor }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KolegijiList',

  data() {
    return {
      kolegiji: [],
      naziv: '',
      ectsMin: '',
      ectsMax: '',
      sort: 'naziv'
    };
  },

  methods: {
    async getKolegiji() {
      const params = {};

      if (this.naziv) params.naziv = this.naziv;
      if (this.ectsMin !== '') params.ects_min = this.ectsMin;
      if (this.ectsMax !== '') params.ects_max = this.ectsMax;
      if (this.sort) params.sort = this.sort;

      const res = await axios.get(
        'http://localhost:3000/kolegiji',
        { params }
      );

      this.kolegiji = res.data;
    }
  },

  mounted() {
    this.getKolegiji();
  }
};
</script>
