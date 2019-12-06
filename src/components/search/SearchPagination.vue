<template>
  <div class="pagination" v-if="totalPages">

    <div class="pagination__pages">
      <a class="pagination__page pagination__page--prev"
        v-if="currentPage > firstPage"
        @click="changePage(currentPage - 1)">
        &lt;
      </a>
      <a v-for="(page, index) in paginationPages" :key="index"
        class="pagination__page"
        :class="{ 'pagination__page--current': page.current }"
        @click="changePage(page.index)">
        {{ page.index }}
      </a>
      <a class="pagination__page pagination__page--next"
        v-if="currentPage < lastPage"
        @click="changePage(currentPage + 1)">
        &gt;
      </a>
    </div>
    <div class="pagination__description">Showing page {{ currentPage }} of {{ totalPages }}</div>
  </div>
</template>

<script>
export default {
  name: 'search-pagination',
  props: {
    data: Object,
    pageSize: Number,
  },
  methods: {
    changePage(index) {
      this.$store.dispatch('GET_GIPHY_DATA', {
        page: index,
      });
    },
  },
  computed: {
    currentPage() {
      return (this.data.offset / this.data.page_size) + 1;
    },
    totalPages() {
      return Math.ceil(this.data.total_count / this.data.page_size);
    },
    firstPage() {
      return 1;
    },
    lastPage() {
      const lastPage = this.paginationPages[this.paginationPages.length - 1];

      if (lastPage) {
        return lastPage.index;
      }

      return null;
    },
    paginationPages() {
      if (!this.totalPages) { return [1]; }

      const MAX_PAGES = 10;

      const SETTINGS = {
        length: this.totalPages,
      };

      const mapPages = (page, index) => ({
        index: index + 1,
        current: this.currentPage === index + 1,
      });

      const allPages = Array.from(SETTINGS, mapPages);

      const currentPageIndex = allPages.findIndex(page => page.current);

      let initialIndex;
      let endIndex;
      const min = MAX_PAGES / 2;
      const max = allPages.length - (MAX_PAGES / 2);

      if (currentPageIndex < min) {
        initialIndex = 0;
        endIndex = MAX_PAGES;
      } else if (currentPageIndex > max || currentPageIndex === -1) {
        endIndex = allPages.length;
        initialIndex = endIndex - MAX_PAGES;
      } else {
        initialIndex = currentPageIndex - Math.floor((MAX_PAGES / 2));
        endIndex = initialIndex + MAX_PAGES;
      }

      return allPages.slice(initialIndex, endIndex);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  text-align: center;

  &__page {
    padding: 8px;
    cursor: pointer;
    display: inline-block;

    &--prev,
    &--next,
    &--current {
      color: orange;
    }

    &--current {
      font-weight: bold;
    }

    &--prev,
    &--next {
      font-weight: 100;
    }

  }

  &__description {
    font-size: 10px;
    color: #666;
  }
}
</style>
