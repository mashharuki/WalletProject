/**
 * Gets the file name from a provided file path.
 * @param {string} filePath the file path to extract a file name from
 * @return {string} returns the file name from a file path; otherwise an empty string
 */
const getFileName = (filePath) => (filePath && filePath.replace(/^.*[\\/]/, '')) || '';

/**
 * The possible Pinata file pin statuses
 */
const PinSatus = {
  ALL: 'all', // Records for both pinned and unpinned content will be returned
  PINNED: 'pinned', // Only records for pinned content will be returned
  UNPINNED: 'unpinned', // Only records for unpinned content will be returned
};

module.exports = {
  getFileName,
  PinSatus,
};