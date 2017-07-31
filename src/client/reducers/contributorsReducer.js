const Contributors = (state = {
  topic: 'All Topics',
  searchTerm: '',
}, action) => {
  switch (action.type) {
    case 'INIT_CONTRIBUTORS': {
      return {
        ...state,
        topic: action.topic,
      };
    }
    default:
      return state;
  }
};

export default Contributors;
