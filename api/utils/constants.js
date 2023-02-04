// chain ID
const CHAIN_ID = 43113;
// RPC URL
const RPC_URL = `https://ava-testnet.public.blastapi.io/ext/bc/C/rpc`;

const ISSUER_DID = 'https://blockcerts-20230113.storage.googleapis.com/profile.json';
const CONTROLLER = 'did:web:blockcerts-20230113.storage.googleapis.com';

/**
 * VCのテンプレ
 */
const TEMPLATE_VC = {
      '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://w3id.org/blockcerts/v3',
      ],
      type: ['VerifiableCredential', 'BlockcertsCredential'],
      credentialSubject: {
            id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      },
};

/**
 * Profileドキュメントのテンプレ
 * その他必要な要素： id, name, url, email, publickey
 */
const TEMPLATE_PROFILE = {
      '@context': [
            'https://w3id.org/openbadges/v2',
            'https://w3id.org/blockcerts/v3'
      ],
      type: 'Profile',
}

/**
 * DIDドキュメントのテンプレ
 * その他必要な要素、id, service, verificationMethod
 */
const TEMPLATE_DID = {
      '@context': ['https://www.w3.org/ns/did/v1'],
}

module.exports = {
      RPC_URL,
      CHAIN_ID,
      ISSUER_DID,
      CONTROLLER,
      TEMPLATE_VC,
      TEMPLATE_PROFILE,
      TEMPLATE_DID
};