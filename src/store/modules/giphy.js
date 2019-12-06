import axios from 'axios';

const API_URL = '//api.giphy.com/v1/gifs/search';
const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';
const SETTINGS = {
  PAGE_SIZE: 20,
};

export default {
  state: {
    term: '',
    results: [],
    pagination: {},
    pageSize: SETTINGS.PAGE_SIZE,
    loading: false,
  },
  getters: {},
  setters: {},
  mutations: {
    SET_GIPHY_TERM: (state, term) => {
      state.term = term;
    },
    SET_GIPHY_RESULTS: (state, data) => {
      if (!data) {
        state.results = [];
        return;
      }

      state.term = data.term || '';
      state.results = data.results || [];
      state.pagination = {
        ...data.pagination,
        page_size: state.pageSize,
      } || {};
    },
    SET_GIPHY_LOADING: (state, status) => {
      state.loading = status;
    },
    SET_GIPHY_PAGINATION: (state, data) => {
      state.pagination = data;
    },
  },
  actions: {
    GET_GIPHY_DATA: async (context, query) => {
      const page = query.page || 1;
      const term = query.term || context.state.term;
      const pageSize = query.size || SETTINGS.PAGE_SIZE;

      context.commit('SET_GIPHY_RESULTS', null);

      context.commit('SET_GIPHY_LOADING', true);

      axios.get(`${API_URL}?api_key=${API_KEY}&limit=${pageSize}&offset=${(page - 1) * pageSize}&q=${term}`)
        .then((response) => {
          const data = {
            term,
            results: response.data.data,
            pagination: response.data.pagination,
          };

          context.commit('SET_GIPHY_RESULTS', data);
        })
        .finally(() => context.commit('SET_GIPHY_LOADING', false));
    },
  },
};
