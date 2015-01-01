var createWrapper = require('../internal/createWrapper'),
    isIterateeCall = require('../internal/isIterateeCall');

/** Used to compose bitmasks for wrapper metadata. */
var ARY_FLAG = 256;

/**
 * Creates a function that accepts up to `n` arguments ignoring any
 * additional arguments.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Function} Returns the new function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  if (guard && isIterateeCall(func, n, guard)) {
    n = null;
  }
  n = n == null ? func.length : (+n || 0);
  return createWrapper(func, ARY_FLAG, null, null, null, null, n);
}

module.exports = ary;
