const PathCatalog = (state = {
  topic: 'All Topics',
  searchTerm: '',
}, action) => {
  switch (action.type) {
    case 'SET_CATALOG_TOPIC': {
      return {
        ...state,
        topic: action.topic,
      };
    }
    case 'SET_CATALOG_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default:
      return state;
  }
};

export default PathCatalog;
