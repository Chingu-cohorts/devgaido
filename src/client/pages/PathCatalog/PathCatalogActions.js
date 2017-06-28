export function setCatalogTopic(topic) {
  return {
    type: 'SET_CATALOG_TOPIC',
    topic,
  };
}

export function setCatalogSearchTerm(searchTerm) {
  return {
    type: 'SET_CATALOG_SEARCH_TERM',
    searchTerm,
  };
}
