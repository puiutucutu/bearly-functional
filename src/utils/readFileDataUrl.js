/**
 * Returns a promise that reads a binary file as a dataUrl (containing a
 * mimetype and a base64 string).
 *
 * @param {File} file
 * @returns {Promise}
 */
export function readFileDataUrl(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.onerror = (e) => reject(fileReader.error);
    fileReader.readAsDataURL(file);
  });
}
