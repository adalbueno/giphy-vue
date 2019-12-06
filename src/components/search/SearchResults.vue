<template>
  <div class="search-results">
    <search-pagination :data="pagination"></search-pagination>

    <div class="loading" v-if="loading">Loading...</div>
    <ul class="search-results__list">
      <li class="search-results__list-item" v-for="(item, index) in list" :key="index">
        <img :src="item.images.original.url" />
      </li>
    </ul>
    <search-pagination :data="pagination"></search-pagination>
  </div>
</template>

<script>
export default {
  name: 'search-results',
  computed: {
    list() {
      return this.$store.state.giphy.results;
    },
    pagination() {
      return this.$store.state.giphy.pagination;
    },
    loading() {
      return this.$store.state.giphy.loading;
    },
  },
};
</script>

<style lang="scss">
img {
  width: 100%;
}

.search-results {
  &__list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 8px;

    &-item {
      padding: 16px;
      border: 1px solid orange;
      margin: 8px 8px;
      display: flex;
      align-items: center;

      @media only screen and (min-width: 600px) {
        width: calc(50% - 16px);
      }

      @media only screen and (min-width: 900px) {
        width: calc(25% - 16px);
      }
    }
  }
}
</style>
