const { readFileSync, outputJsonSync } = require('fs-extra');
const Bottleneck = require('bottleneck');
const { createHash } = require('crypto');
const { read } = require('recursive-fs');
const { getFileName } = require('./utils');

const { log, error } = console;

(async () => {
  const rateLimiter = new Bottleneck({
    maxConcurrent: 5, // arbitrary value - don't overdue file access
  });

  try {
    const OUTPUT_PATH = './output/file-hashes.json';
    const FINAL_OUTPUT_PATH = './output/file-hashOfHashes.json';
    const FOLDER_PATH = 'data';
    const hashMapping = {};
    const { files } = await read(FOLDER_PATH);
    if ((files && files.length) <= 0) {
      log(`No files were found in folder '${FOLDER_PATH}'`);
      return;
    }
    await Promise.all(
      files.map((filePath) => rateLimiter.schedule(() => {
        const fileName = getFileName(filePath);
        log(`${fileName} hashing started`);
        const fileData = readFileSync(filePath);
        const fileHash = createHash('sha256').update(fileData).digest('hex');
        log(`${fileName} SHA-256: ${fileHash}`);
        hashMapping[fileName] = fileHash;
      })),
    );

    // Sorting for the resultant object
    const sortObject = (obj) => Object.keys(obj)
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
      .reduce((accumulator, key) => {
        accumulator[key] = obj[key];

        return accumulator;
      }, {});

    outputJsonSync(OUTPUT_PATH, sortObject(hashMapping));

    // Outputs Hash of hashes
    const hashes = require('../output/file-hashes.json');
    const concatenatedStr = Object.values(hashes).join('');
    log('Concatenated String ->', concatenatedStr);
    const fileHash = createHash('sha256').update(concatenatedStr).digest('hex');
    log('Final Hash ->', fileHash);
    outputJsonSync(FINAL_OUTPUT_PATH, fileHash)

  } catch (err) {
    error(err);
    process.exit(1);
  }
})();