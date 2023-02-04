require('dotenv').config();

const { PINATA_API_KEY, PINATA_API_SECRET } = process.env;
const fs = require('fs-extra');
const pinataSDK = require('@pinata/sdk');
const { PinSatus } = require('./utils');

const { log, table: logTable, error } = console;

(async () => {
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
  /**
   * Get a page of results from Pinata of all pinned files mapped with IPFS CIDs.
   *
   * @param {number} pageOffset the page index of the results to return. Defaults to 0.
   * @param {number} pageLimit the limit to number of results to return. Max of 1000. Default of 5.
   * @return {object} returns an object containing file name mapped to its IPFS hash.
   *
   */
  const getFileCIDMappings = async (status, pageOffset, pageLimit) => {
    const filter = {
      status,
      pageLimit,
      pageOffset,
    };
    const { count: totalCount, rows } = (await pinata.pinList(filter)) || {};
    const count = (rows && rows.length) || 0;
    if (totalCount === 0 || count <= 0) {
      if (totalCount === 0) {
        log(`No '${status}' files or folders were found`);
      }
      return { mapping: {}, count };
    }
    // Convert array to '[fileName]: CID' property mappings
    const mapping = rows.reduce((mappings, row) => {
      const {
        ipfs_pin_hash: cid,
        metadata: { name: fileName },
      } = row;
      return {
        ...mappings,
        ...{ [fileName]: cid },
      };
    }, {});
    return { mapping, count };
  };

  try {
    /**
     * The maximum number of Pinata search results supported per page.
     */
    const MAX_PAGE_LIMIT = 1000;
    /**
     * The file pinning status to search for in Pinata.
     */
    const PIN_STATUS = PinSatus.ALL;
    const OUTPUT_PATH = './output/downloaded-cids.json';
    let totalCount = 0;
    let pageOffset = 0;
    let cidMappings = {};
    let hasMoreResults = true;
    log('Requesting Pinata CID data...');
    while (hasMoreResults) {
      // eslint-disable-next-line no-await-in-loop
      const { mapping, count } = await getFileCIDMappings(PIN_STATUS, pageOffset, MAX_PAGE_LIMIT);
      if (count === 0) {
        break;
      }
      cidMappings = { ...cidMappings, ...mapping };
      hasMoreResults = count >= MAX_PAGE_LIMIT;
      pageOffset += 1;
      totalCount += count;
    }
    if (totalCount <= 0) {
      return;
    }
    log('Pinata file and folder CIDs:');
    logTable(cidMappings);
    fs.outputJsonSync(OUTPUT_PATH, cidMappings);
  } catch (err) {
    error(err);
    process.exit(1);
  }
})();