'use strict';
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
