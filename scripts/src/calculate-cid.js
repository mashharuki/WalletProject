const { readFileSync, outputJsonSync } = require('fs-extra');
const Bottleneck = require('bottleneck');
const { of } = require('ipfs-only-hash');
const { read } = require('recursive-fs');
const { getFileName } = require('./utils');

const { log, error } = console;

(async () => {
  const rateLimiter = new Bottleneck({
    maxConcurrent: 5,
  });

  try {
    const OUTPUT_PATH = './output/file-cids.json';
    const FOLDER_PATH = 'data';
    const cidMapping = {};
    const { files } = await read(FOLDER_PATH);
    if ((files && files.length) <= 0) {
      log(`No files were found in folder '${FOLDER_PATH}'`);
      return;
    }
    await Promise.all(
      files.map((filePath) => rateLimiter.schedule(async () => {
        const fileName = getFileName(filePath);
        log(`${fileName} hashing started`);
        const fileData = readFileSync(filePath);
        const fileHash = await of(fileData);
        log(`${fileName} CID: ${fileHash}`);
        cidMapping[fileName] = fileHash;
      })),
    );

    // Sorting for the resultant object
    const sortObject = (obj) => Object.keys(obj)
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
      .reduce((accumulator, key) => {
        accumulator[key] = obj[key];

        return accumulator;
      }, {});

    outputJsonSync(OUTPUT_PATH, sortObject(cidMapping));
  } catch (err) {
    error(err);
    process.exit(1);
  }
})();