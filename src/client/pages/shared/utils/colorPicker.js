/**
 * pick a color given a string value
 * used for coloring cards header
 * @param {string} value at the moment can only be 'primary (for orange)
 * or undefined/null (the same for react since 15.4) for blue
 * @return {string} color picked
 */
export const setColor = value => (value === 'primary' ? '#db684e' : '#007399');
