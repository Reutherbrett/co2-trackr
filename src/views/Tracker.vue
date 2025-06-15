<template>
  <section>
    <h1>CO₂ Emissionen im Überblick</h1>
    <input v-model="search" placeholder="Suche nach Land oder Unternehmen" @input="sanitizeInput" />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('country')">
              Land
              <span class="sort-icon">
                {{ sortKey === 'country' ? (sortAsc ? '▲' : '▼') : '⇅' }}
              </span>
            </th>

            <th @click="sortBy('company')">
              Unternehmen
              <span class="sort-icon">
                {{ sortKey === 'company' ? (sortAsc ? '▲' : '▼') : '⇅' }}
              </span>
            </th>

            <th @click="sortBy('emissions')">
              CO₂ Emissionen (Mt)
              <span class="sort-icon">
                {{ sortKey === 'emissions' ? (sortAsc ? '▲' : '▼') : '⇅' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredData" :key="entry.country + entry.company">
            <td>{{ entry.country }}</td>
            <td>{{ entry.company }}</td>
            <td>{{ entry.emissions }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      sortKey: '',
      sortAsc: true,
      data: [
      { country: 'Kanada', company: 'NordÖl GmbH', emissions: 220 },
      { country: 'Australien', company: 'KohleSüd AG', emissions: 370 },
      { country: 'Italien', company: 'ItalGas S.p.A.', emissions: 190 },
      { country: 'Spanien', company: 'SolaraTech', emissions: 80 },
      { country: 'Norwegen', company: 'FjordEnergie AS', emissions: 60 },
      { country: 'Südafrika', company: 'CapeCoal Ltd', emissions: 310 },
      { country: 'Mexiko', company: 'PetroMex SA', emissions: 260 },
      { country: 'Saudi-Arabien', company: 'AramPetro Ltd', emissions: 480 },
      { country: 'Südkorea', company: 'HanCarbon Inc', emissions: 200 },
      { country: 'Vereinigtes Königreich', company: 'BritEnergy Plc', emissions: 170 }
      ]
    }
  },
  computed: {
    filteredData() {
      const safeSearch = this.search.toLowerCase();
      return this.sortedData.filter(e =>
        e.country.toLowerCase().includes(safeSearch) ||
        e.company.toLowerCase().includes(safeSearch)
      );
    },
    sortedData() {
      if (!this.sortKey) return this.data;
      return [...this.data].sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return this.sortAsc ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
      });
    }
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) this.sortAsc = !this.sortAsc;
      else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    sanitizeInput() {
      this.search = this.search.replace(/<.*?>/g, '');
    }
  }
}
</script>