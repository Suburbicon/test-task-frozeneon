<template>
  <div id="app">
    <v-container>
      <router-view />
    </v-container>

    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/Footer.vue';
export default Vue.extend({
  name: 'App',
  components: {
    Footer
  }
});
</script>

// Пишу стили в scoped для каждого компонента, но так как я использую Vuetify, то не получится

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
