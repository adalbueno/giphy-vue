<template>
  <div class="home">
    <search-form></search-form>
    <search-results></search-results>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
