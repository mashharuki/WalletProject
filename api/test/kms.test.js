/**
 * KMSとの接続が問題なく行われているかチェックするためのテストコード
 */
require('dotenv/config');
const { ethers } = require('ethers');
const { KmsEthersSigner } = require('aws-kms-ethers-signer');
const { KEY_ID, REGION_ID, RPC_URL } = require('../utils/constants');

// get Mnemonic code
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
} = process.env

/**
 * 接続テストコード
 */
describe('KMS connect Test', () => {
      it('get wallet address ', async() => {
            // create provider
            var provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            // create singer object
            const signer = new KmsEthersSigner({
                  keyId: KEY_ID,
                  kmsClientConfig: {
                  region: REGION_ID,
                  credentials: {
                        accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY
                  }
                  },
            }).connect(provider);

            console.log("wallet address:", await signer.getAddress());
            console.log("wallet balanceOf:", await (await signer.getBalance())._hex);
      })
});