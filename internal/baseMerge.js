define(['./arrayEach', './baseForOwn', './baseMergeDeep', '../lang/isArray', './isLength', './isObjectLike', '../lang/isTypedArray'], function(arrayEach, baseForOwn, baseMergeDeep, isArray, isLength, isObjectLike, isTypedArray) {

  /** Used as a safe reference for `undefined` in pre ES5 environments. */
  var undefined;

  /**
   * The base implementation of `_.merge` without support for argument juggling,
   * multiple sources, and `this` binding `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [customizer] The function to customize merging properties.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates values with source counterparts.
   * @returns {Object} Returns the destination object.
   */
  function baseMerge(object, source, customizer, stackA, stackB) {
    var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));

    (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
      if (isObjectLike(srcValue)) {
        stackA || (stackA = []);
        stackB || (stackB = []);
        return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = typeof result == 'undefined';

      if (isCommon) {
        result = srcValue;
      }
      if ((isSrcArr || typeof result != 'undefined') &&
          (isCommon || (result === result ? result !== value : value === value))) {
        object[key] = result;
      }
    });
    return object;
  }

  return baseMerge;
});
