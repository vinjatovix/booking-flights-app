'use strict';
/**
 *
 * @param {number} ms
 */
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = { wait };
