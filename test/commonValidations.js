/* eslint-disable no-console */

const maxIdLength = 16;
const validIdPattern = /^[0-9a-z]+$/;
const indentErrMsg = ' '.repeat(9);

/**
 * Write an error messages to the console log. Validation routines are
 * expected to add a message to the errorMessages array defining the type
 * of JSON element (e.g. path, course, lesson, etc.) the error was detected in,
 * the unique identifier of that element, and a description of the exact
 * error enountered.
 *
 * @param {String[]} errorMessages - Array of element id's and error message
 * reporting a problem in it. This is expected to be formatted as:
 * [[element-id, error-message],...]
 * @returns {[]} - empty array
 */
const logErrors = (errorMessages) => {
  errorMessages.forEach((error) => {
    console.log(`${indentErrMsg}${error}`);
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
    invalidIds.push(`${itemId} id contains invalid characters`);
  }
  return invalidIds;
}, []);

/**
 * Verify that the key of JSON element matches the value of the 'id'
 * attribute inside the element block.
 *
 * @param {Object} jsonData - JSON object containing the data elements. This
 * must be formatted as {"<id>": {...id: "<id>"...}...}.
 * @returns {String[]} invalidIds - Array of invalid id's. Those that don't
 * match the key of the element block.
 */
const validateIdMatch = jsonData => Object.keys(jsonData).reduce((invalidIds, itemId) => {
  if (itemId !== jsonData[itemId].id) {
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
    invalidIds.push(`${itemId}: greater than ${maxIdLength} characters`);
  }
  return invalidIds;
}, []);

/**
 * Polyfill to insulate the app from the fact that Object.values is an
 * experimental feature not found in all browsers. This solution was
 * copied from https://stackoverflow.com/questions/35090153/babel-support-for-object-entries
 *
 * @param {Object} anObject - The object values are to be extracted from.
 * @returns {Array} - An array of object values
 */
Object.values = anObject =>
  Object.keys(anObject).map(key => anObject[key]);

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

/**
 * Validate that all required attributes have been specified
 *
 * @param {Object} jsonData - JSON object containing the data elements. This
 * must be formatted as {"<id>": {..."attr": "value"...}...}
 * @param {String[]} expectedAttributes - Array of attribute names and type
 * indicators (e.g. [['attr-name', 'type'], ...]). Type may be either 'required'
 * or 'optional'.
 * @returns {String[]} invalidIds - Array of invalid id's. Those containing
 * something other than lowercase letters and digits.
 */
const validateRequiredAttributes =
  (jsonData, expectedAttributes) => Object.keys(jsonData).reduce((invalidIds, itemId) => {
    expectedAttributes.forEach((attribute) => {
      if (attribute[1] === 'required' && !Object.keys(jsonData[itemId]).includes(attribute[0])) {
        invalidIds.push(`${itemId} missing required attribute:${attribute[0]}`);
      }
    });
    return invalidIds;
  }, []);

/**
 * Validate that there are no unknown attributes in the JSON object by comparing
 * its attribute keys against an array containing valid attribute names.
 *
 * @param {Object} jsonData - JSON object containing the data elements. This
 * must be formatted as {"<id>": {..."attr": "value"...}...}
 * @param {String[]} expectedAttributes - Array of attribute names and type
 * indicators (e.g. [['attr-name', 'type'], ...]). Type may be either 'required'
 * or 'optional'.
 * @returns {String[]} invalidIds - Array of invalid id's. Those containing
 * something other than lowercase letters and digits.
 */
const validateUnknownAttributes =
  (jsonData, expectedAttributes) => Object.keys(jsonData).reduce((invalidElements, itemId) => {
    Object.keys(jsonData[itemId]).forEach((itemAttribute) => {
      let matchingAttributeFound = false;
      expectedAttributes.forEach((expectedAttribute) => {
        if (expectedAttribute[0] === itemAttribute) {
          matchingAttributeFound = true;
        }
      });
      if (!matchingAttributeFound) {
        invalidElements.push(`${itemId} contains unknown attribute:${itemAttribute}`);
      }
    });
    return invalidElements;
  }, []);

export { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength, validateIdMatch, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes };
