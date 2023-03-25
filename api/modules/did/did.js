/**
 * DID関連のメソッドを実装したモジュールファイル
 */

// did用のモジュールを読み込む
const ION = require('@decentralized-identity/ion-tools');

/**
 * generateDID function
 */
const generateDID = async() => {
      // create key pair
      let authnKeys = await ION.generateKeyPair();
      // new DID
      let did = new ION.DID({
            content: {
                  publicKeys: [
                        {
                              id: 'key-1',
                              type: 'EcdsaSecp256k1VerificationKey2019',
                              publicKeyJwk: authnKeys.publicJwk,
                              purposes: [ 'authentication' ]
                        }
                  ],
                  services: [
                        {
                              id: 'idq',
                              type: 'LinkedDomains',
                              serviceEndpoint: 'http://example/'
                        }
                  ]
            }
      });

      // anchor DID
      const requestBody = await did.generateRequest();
      const request = new ION.AnchorRequest(requestBody);
      let response = await request.submit();

      return {
            response,
            did
      };
};

module.exports = {
      generateDID
}