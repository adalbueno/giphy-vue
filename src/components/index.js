import Vue from 'vue';

import SearchForm from './search/SearchForm.vue';
import SearchResults from './search/SearchResults.vue';
import SearchPagination from './search/SearchPagination.vue';

Vue.component('search-form', SearchForm);
Vue.component('search-results', SearchResults);
Vue.component('search-pagination', SearchPagination);
