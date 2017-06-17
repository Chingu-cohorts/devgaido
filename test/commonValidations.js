/**
 * Validate the composition of a path, course, lesson identifier
 *
 * @param {Object} jsonData - JSON object containing the data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of invalid id's. Those containing something other than lowercase letters and digits.
 */
const validateIdComposition = (jsonData) => {
  const invalidIds = [];
  Object.keys(jsonData).forEach((itemId) => {
    if (!itemId.match(/^[0-9a-z]+$/)) {
      invalidIds.push(itemId);
    }
  });
  return invalidIds;
};

/**
 * Validate the length of a path, course, lesson identifier
 *
 * @param {Object} jsonData - JSON object containing the data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of id's exceeding 16 characters
 */
const validateIdLength = (jsonData) => {
  const invalidIds = [];
  Object.keys(jsonData).forEach((itemId) => {
    if (itemId.length > 16) {
      invalidIds.push(itemId);
    }
  });
  return invalidIds;
};

/**
 * Validate a relationship between two data elements.
 *
 * @param {String} childAttrNm - Attribute name in the child JSON object
 * @param {Object} childJSON - JSON object containing the child data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @param {String} parentAttrNm - Attribute name in the child JSON object
 * @param {Object} parentJSON - JSON object containing the parent data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of id's exceeding 16 characters
 */
const validateRelationship = (childAttrNm, childJSON, parentAttrNm, parentJSON) => {
  const invalidIds = [];

  Object.values(childJSON).forEach((childElement) => {
    childElement[childAttrNm].forEach((itemId) => {
      if (parentJSON[itemId] === undefined) {
        invalidIds.push([childElement[parentAttrNm], itemId]);
      }
    });
  });
  return invalidIds;
};

export { validateIdComposition, validateIdLength, validateRelationship };
