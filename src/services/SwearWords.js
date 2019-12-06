import swearWords from '../db/SwearWordsList';

export default {
  check(term) {
    return !!swearWords.filter(word => word === term).length;
  },
};
