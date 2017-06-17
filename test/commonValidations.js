const maxIdLength = 16;
const validIdPattern = /^[0-9a-z]+$/;

/**
 * Write incorrectly formatted curriculum ids in paths, course, and lessons 
 * to the console.log.
 * 
 * @param {String[]} invalidIds - Array of erroneous ids
 * @param {string} errMessage - Custom error message describing the situation
 * @returns {[]} - empty array
 */
const logInvalidIds = (invalidIds, errMessage) => {
  invalidIds.forEach((id) => {
    console.log(`${' '.repeat(9)}${errMessage} for ${id}`);
  });
  return [];
};

/**
 * Validate the composition of a path, course, lesson identifier
 *
 * @param {Object} jsonData - JSON object containing the data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of invalid id's. Those containing something other than lowercase letters and digits.
 */
const validateIdComposition = jsonData => Object.keys(jsonData).reduce((invalidIds, itemId) => {
  if (!itemId.match(validIdPattern)) {
    invalidIds.push(itemId);
  }
  return invalidIds;
}, []);

/**
 * Validate the length of a path, course, lesson identifier
 *
 * @param {Object} jsonData - JSON object containing the data elements. This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of id's exceeding 16 characters
 */
const validateIdLength = jsonData => Object.keys(jsonData).reduce((invalidIds, itemId) => {
  if (itemId.length > maxIdLength) {
    invalidIds.push(itemId);
  }
  return invalidIds;
}, []);

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
  return Object.values(childJSON).reduce((invalidIds, childElement) => {
    childElement[childAttrNm].forEach((itemId) => {
      if (parentJSON[itemId] === undefined) {
        invalidIds.push([childElement[parentAttrNm], itemId]);
      }
    });
    return invalidIds;
  }, []);
};

export { logInvalidIds, validateIdComposition, validateIdLength, validateRelationship };
