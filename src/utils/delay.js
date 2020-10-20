/**
 * @param {Number} milliseconds
 * @return {Promise<undefined>}
 */
function delay(milliseconds) {
  return new Promise(resolve => setTimeout(() => resolve(), milliseconds))
}

export { delay }
