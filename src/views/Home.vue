<template>
  <div class="home">
    <div class="home__search">
      <v-text-field
        label="Search"
        placeholder="Need to enter the name of the package and PRESS ENTER"
        hide-details="auto"
        v-model="searchValue"
        @keypress.enter="findPackage"
      ></v-text-field>
    </div>
    <div class="home__content">
      <template v-if="getFoundPackage.total !== 0 && searchValue">
        <v-card>
          <v-card-text>
            <p class="text-h4 text--primary">RANK: {{ getFoundPackage.rank }}</p>
            <p class="text-h4 text--primary">TOTAL: {{ getFoundPackage.total }}</p>
            <p class="text-h4 text--primary">
              VERSIONS:
              {{ Object.keys(getFoundPackage.versions) }}
            </p>
          </v-card-text>
        </v-card>
      </template>
      <template v-else>
        <template v-for="(item, index) in getFiltersPackage">
          <v-card :key="index">
            <v-card-text>
              <p class="text-h4 text--primary">NAME: {{ item.name }}</p>
            </v-card-text>
            <v-btn @click="showModal(item)">Learn More</v-btn>
          </v-card>
        </template>
        <div class="home__pagination">
          <div class="text-center">
            <v-pagination v-model="page" :length="getLengthOfPagination"></v-pagination>
          </div>
        </div>
      </template>
    </div>
    <modal :width="400" :height="200" class="home__modal" name="learnMore">
      <div class="home__content-modal">
        <p class="home__text">Name: {{ modalContent.name }}</p>
        <p class="home__text">Type: {{ modalContent.type }}</p>
        <p class="home__text">Hits: {{ modalContent.hits }}</p>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Home',
  components: {},
  data() {
    return {
      modalContent: {
        name: '',
        hits: 0,
        type: ''
      },
      searchValue: '',
      page: 1
    };
  },
  watch: {
    searchValue: async function () {
      this.findPackage();
      if (this.searchValue === '') {
        await this.getPopularPackages();
      }
    }
  },
  computed: {
    ...mapGetters(['getPackages', 'getFoundPackage']),
    getLengthOfPagination() {
      return this.getPackages.length / 10;
    },
    getFiltersPackage() {
      return this.getPackages.slice((this.page - 1) * 6, this.page * 6);
    }
  },
  async mounted() {
    await this.getPopularPackages();
  },
  methods: {
    showModal(item: any) {
      this.modalContent = { ...item };
      this.$modal.show('learnMore');
    },
    getPopularPackages() {
      return this.$store.dispatch('getPackagesFromAPI');
    },
    async findPackage() {
      await this.$store.dispatch('findPackageByName', this.searchValue);
    }
  }
});
</script>

<style lang="scss">
.vm--modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.home {
  &__search {
    margin-bottom: 25px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .v-card {
      width: 52%;
      margin: 10px 0;
      padding: 10px;
    }
  }

  &__content-modal {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
