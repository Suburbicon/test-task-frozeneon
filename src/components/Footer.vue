<template>
  <v-footer color="secondary lighten-3" padless>
    <v-row justify="center" no-gutters>
      <v-col style="margin-bottom: 10px">
        <a href="https://github.com/Suburbicon" target="_blank">github</a>
      </v-col>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Khassenov Dmitriy</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss">
.v-footer {
  width: 100%;
  padding: 24px !important;
}
</style>
