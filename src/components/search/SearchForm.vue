<template>
  <div class="search">
    <form class="search__form" @submit.prevent="onSearchFormSubmit">
      <input type="text"
        class="form-input"
        name="search__form__input"
        v-model="term"
        placeholder="Search your GIF ;)"
      />
      <input type="submit" class="form-btn" value="Search">
    </form>
    <p class="search__warning" v-if="hasSwearWords">
      Ops! We don't like swear words at all. Please be a bit respectful!
    </p>
  </div>
</template>

<script>
import swearWords from '../../services/SwearWords';

export default {
  name: 'search-form',
  data() {
    return {
      term: '',
    };
  },
  methods: {
    onSearchFormSubmit() {
      if (!this.hasSwearWords) {
        this.$store.dispatch('GET_GIPHY_DATA', {
          term: this.term,
          size: 20,
        });
      }
    },
  },
  computed: {
    hasSwearWords() {
      return swearWords.check(this.term);
    },
  },
};
</script>

<style lang="scss">
.search {
  padding: 16px;
}

.search__form {
  display: flex;
  flex-direction: row;
}

.form-input, .form-btn {
  border: 1px solid transparent;
  padding: 8px;
  font-size: 16px;
}

.form-input {
  flex: 1;
  border: 1px solid #eee;
}

.form-btn {
  background: orange;
  color: #fff;
}
</style>
