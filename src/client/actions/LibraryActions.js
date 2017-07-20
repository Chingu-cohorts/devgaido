export function setLibraryTopic(topic) {
  return {
    type: 'SET_LIBRARY_TOPIC',
    topic,
  };
}

export function setLibrarySearchTerm(searchTerm) {
  return {
    type: 'SET_LIBRARY_SEARCH_TERM',
    searchTerm,
  };
}
