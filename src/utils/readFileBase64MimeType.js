import { readFileDataUrl } from "./readFileDataUrl";

/**
 * @param {string} dataUrl
 * @return {string}
 */
const extractBase64FromDataUrl = (dataUrl) => dataUrl.split(",")[1];

/**
 * @param {string} dataUrl
 * @return {string}
 */
const extractMimeTypeFromDataUrl = (dataUrl) => dataUrl.split(",")[0];

/**
 * Returns a promise that resolves to an object containing the base64 and
 * mimetype values of a passed in file.
 *
 * @param {File} file
 * @returns {Promise.<{base64: string, mimeType: string}>}
 */
export async function readFileBase64MimeType(file) {
  const dataUrl = await readFileDataUrl(file);
  const base64 = await extractBase64FromDataUrl(dataUrl);
  const mimeType = await extractMimeTypeFromDataUrl(dataUrl);

  return { base64, mimeType };
}
