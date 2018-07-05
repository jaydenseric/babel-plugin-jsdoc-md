/**
 * Decodes a JSDoc namepath.
 * @see [JSDoc namepaths](http://usejsdoc.org/about-namepaths.html)
 * @kind function
 * @name deconstructJsdocNamepath
 * @param {string} namepath A JSDoc namepath.
 * @returns {Object} Namepath parts.
 * @ignore
 */
function deconstructJsdocNamepath(namepath) {
  const [match, memberof, membership, name] =
    namepath.match(/^(?:([^.#~]+(?:[.#~][^.#~]+)*)([.#~]))?([^.#~]+)$/) || []
  if (!match) throw new Error(`Invalid JSDoc namepath “${namepath}”.`)
  return { memberof, membership, name }
}

module.exports = deconstructJsdocNamepath