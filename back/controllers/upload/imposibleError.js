'use strict';

/**
 * This is a callback needed for deleting files.
 * this should never happen.
 *
 * @return {Error} 
 */
function imposibleError() {
  return (error) => {
    if (error) {
      error.code = 500;
      error.details = 'THIS SHOULD NEVER HAPPEN';
      throw error;
    }
  };
}
module.exports = { imposibleError };
