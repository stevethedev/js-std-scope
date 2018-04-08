/**
 * @author Steven Jimenez <steven@stevethedev.com>
 */
'use strict';

// Protected namespace shares variables across the prototype chain
const protectedMap = new WeakMap();

/**
 * Get an accessor for a given container
 *
 * @method getAccessor
 *
 * @param {Object} varContainer
 *
 * @return {Function}
 */
function getAccessor(varContainer) {
    /**
     * Read and write variables in the container
     *
     * @method
     *
     * @param {Object}     context
     * @param {Dictionary} [dictionary]
     *
     * @return {Dictionary}
     */
    function accessor(context, dictionary) {
        if (!varContainer.has(context)) {
            varContainer.set(context, {});
        }

        const scope = varContainer.get(context);

        if (dictionary && 'object' === typeof dictionary) {
            for (const [ key, value ] of Object.entries(dictionary)) {
                scope[key] = value;
            }
        }

        return scope;
    }

    return accessor;
}

/**
 * Create a new set of scope variables
 *
 * @method create
 *
 * @return {Dictionary}
 */
function create() {
    const $private   = getAccessor(new WeakMap());
    const $protected = getAccessor(protectedMap);

    return {
        $private,
        $protected,
    };
}

module.exports = { create };
