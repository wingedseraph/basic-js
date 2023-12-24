const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const numToString = n.toString();
  let deleteIndex = -1;

  for (let i = 0; i < numToString.length - 1; i++) {
    if (numToString[i] < numToString[i + 1]) {
      deleteIndex = i;
      break;
    }
  }

  if (deleteIndex !== -1) {
    const updatedNumToString =
      numToString.slice(0, deleteIndex) + numToString.slice(deleteIndex + 1);
    return parseInt(updatedNumToString);
  }

  return parseInt(numToString.slice(0, -1));
}

module.exports = {
  deleteDigit,
};
