const Library = (state = {
  topic: 'All Topics',
  searchTerm: '',
}, action) => {
  switch (action.type) {
    case 'SET_LIBRARY_TOPIC': {
      return {
        ...state,
        topic: action.topic,
      };
    }
    case 'SET_LIBRARY_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default:
      return state;
  }
};

export default Library;
