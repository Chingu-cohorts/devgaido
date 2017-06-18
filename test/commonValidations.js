/* eslint-disable no-console */

const maxIdLength = 16;
const validIdPattern = /^[0-9a-z]+$/;
const indentErrMsg = ' '.repeat(9);

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
    console.log(`${indentErrMsg}${errMessage} for ${id}`);
  });
  return [];
};

/**
 * Write curriculum ids in paths, course, and lessons which have invalid
 * relationship connections to the console.log.
 *
 * @param {String} fromElementNm - Name of the curriculum element containing the reference to the id
 * @param {String} toElementNm - Name of the curriculum element that defines the id
 * @param {String[]} invalidIds - Array of erroneous ids
 * @returns {[]} - empty array
 */
const logInvalidRelations = (fromElementNm, toElementNm, invalidIds) => {
  invalidIds.forEach((id) => {
    console.log(`${indentErrMsg}${fromElementNm} id ${id[0]} contains unknown ${toElementNm} id ${id[1]}`);
  });
  return [];
};

/**
 * Validate the composition of a path, course, lesson identifier
 *
 * @param {Object} jsonData - JSON object containing the data elements. This
 * must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of invalid id's. Those containing
 * something other than lowercase letters and digits.
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
 * @param {Object} jsonData - JSON object containing the data elements. This
 * must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of id's exceeding 16 characters
 */
const validateIdLength = jsonData => Object.keys(jsonData).reduce((invalidIds, itemId) => {
  if (itemId.length > maxIdLength) {
    invalidIds.push(itemId);
  }
  return invalidIds;
}, []);

/**
 * Polyfill to insulate the app from the fact that Object.values is an
 * experimental feature not found in all browsers.
 *
 * @param {Object} x - The object values are to be extracted from.
 * @returns {Array} - An array of object values
 */
Object.values = x =>
  Object.keys(x).reduce((y, z) => y.push(x[z]) && y, []);

/**
 * Validate a relationship between two data elements.
 *
 * @param {String} childAttrNm - Attribute name in the child JSON object
 * @param {Object} childJSON - JSON object containing the child data elements.
 * This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @param {String} parentAttrNm - Attribute name in the child JSON object
 * @param {Object} parentJSON - JSON object containing the parent data elements.
 * This must be formatted as {"<id>": {...id: "<id>"...}...}
 * @returns {String[]} invalidIds - Array of id's exceeding 16 characters
 */
const validateRelationship = (childAttrNm, childJSON, parentAttrNm, parentJSON) =>
    Object.values(childJSON).reduce((invalidIds, childElement) => {
      childElement[childAttrNm].forEach((itemId) => {
        if (parentJSON[itemId] === undefined) {
          invalidIds.push([childElement.id, itemId]);
        }
      });
      return invalidIds;
    }, []);

export { logInvalidIds, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship };
