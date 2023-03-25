## Product Name

## Member's Discord ID

## demo video

## pitch

## catchphrase

## Summary

## Product URL

[Wallet]()

## Github repo(open) URL

[]()

## List of functions

| Function Name                            | Description                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| Blocto login                             | create ContractWallet                                                  |
| Mint                                     | Mint IDQ token                                                         |
| Send                                     | Send IDQ token                                                         |
| Buy                                      | Buy IDQ token                                                          |
| Register DID                             | Ability to issue a DID and register it with SMACON upon new login      |
| Register a DID-related data              | Function to register information (VC) associated with IDs to IPFS      |
| DID Related Information Display Function | Ability to display information tied to DID                             |
| Common Fund Pool Creation Function       | Ability to create a multisig contract, a common pool of funds          |
| common fund pooling remittance function  | Ability to transfer money from a multisig contract to a target address |
| common fund pooling remittance function  | Ability to approve for common fund pool remittance                     |
| deposit                                  | Ability to deposit native tokens in multisig contracts using tokens    |

## Distributed infrastructure and APIs

| No. | Name   | used API        |
| --- | ------ | --------------- |
| 1   | ION    | generateKeyPair |
| 2   | ION    | generateRequest |
| 3   | ION    | AnchorRequest   |
| 4   | Pinata | pinFileToIPFS   |
| 5   | Pinata | Gateway         |
| 6   | Pinata | pinList         |
| 7   |        |                 |

## tech stacks

| No. | 名称                  |
| --- | --------------------- |
| 1   | truffle               |
| 2   | React.js              |
| 3   | express               |
| 4   | superAgent            |
| 5   | MutliSig              |
| 6   | SmartContract         |
| 7   | ION(DID)              |
| 8   | ethers.js             |
| 9   | Web3.js               |
| 10  | Blocto SDK            |
| 11  | RESTful API           |
| 12  | Figma                 |
| 13  | ERC20 Token           |
| 14  | Verifiable Credential |
| 15  | Pinata API            |
| 16  | Ipfs                  |
| 17  | Stripe API            |
| 18  | MUI Component         |

## tech stacks that will be used in the future

| No. | 名称            |
| --- | --------------- |
| 1   | AWS S3          |
| 2   | AWS EC2         |
| 3   | AWS Route53     |
| 4   | AWS API GateWay |
| 5   | AWS Cloud Watch |
| 6   | AWS Elastic IP  |

## Blockchain

Avalanche Fuji Chain(Testnet)

## deploy した Contract の情報

| No. | Contract Name   | Explorer URL                                                                                                                       |
| --- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | MyToken         | [0x93fdd51462FB20fB631F8CA38c3DeB87583311Ea](https://testnet.snowtrace.io/address/0x93fdd51462FB20fB631F8CA38c3DeB87583311Ea#code) |
| 2   | WalletFactoryV4 | [0xD731c110bc106Aa60f768a1fd2707684A650Cc02](https://testnet.snowtrace.io/address/0xD731c110bc106Aa60f768a1fd2707684A650Cc02#code) |

## application code and other file

### System Architecher

### flow

[![]()

### folder tree

```bash
.
├── README.md     this document
├── api           API Server
├── assets        asesets(img, etc)
├── backend       smartcontract
├── book          honkit
├── docs          built app
├── frontend      frontend(React.js)
├── script        ipfs
└── intro-app     qr code app
```
