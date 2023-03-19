## Product Name

IDQ Soul Wallet

## Category

- Security
- Wallet

## Member's Discord ID

1. QAQA#7612
2. mashharuki#9415

## demo video

[https://www.youtube.com/watch?v=yyLkcT2IkuA&t=4s](https://www.youtube.com/watch?v=yyLkcT2IkuA&t=4s)

## pitch

[ピッチ資料](https://github.com/mashharuki/IDQ/blob/main/assets/pitch/pitch.md)

## catchphrase

Web 3 Friendly / Web3 General Availability

## Summary

IDQ | Soul Wallet is a wallet product aimed at the general adoption of Web3.

We believe that the Web3 era is "a time when individuals can digitally manage their personal information with a Wallet and PHR health data DID".  
Web3 is not yet widely used. This will be the catalyst.  

Functionality and points are three:   
1.   it does not require a private key, yet it is a secure digital ID/transfer and very easy to use!
2. just scan the QR code with your phone to access your Wallet!
3. API first (You can use it by simply plugging in the PDI authentication system for this industry-academia collaboration at the API connection point. (You can also use the PDI authentication system for business-to-business collaboration and partnerships.)

Private/Secure/Earn  

By making the Web3 Wallet secure and self-earning, the way of touching information and the new way of communication of Web3 can be made into a communication protocol, accelerating social infrastructure, and making use of the DID linkage in the healthcare, IoT, and smart city areas.
Aim for omni-channel and super-application.  

Specificity: DID linkage, approval-based remittance system

## Product URL

[IDQ Soul Wallet](https://idq.vercel.app/)

## Github repo(open) URL

[https://github.com/mashharuki/IDQ](https://github.com/mashharuki/IDQ)

## List of functions

| Function Name                 |Description  |
| ------------------------ | --------------------------------------------------------------------------------- |
| Blocto login     | create ContractWallet                            |
| Mint   | Mint IDQ token                                                     |
| Send   | Send IDQ token                                                  |
| Buy   | Buy IDQ token                                                    |
| Register DID        | Ability to issue a DID and register it with SMACON upon new login  |
| Register a DID-related data | Function to register information (VC) associated with IDs to IPFS |
| DID Related Information Display Function    | Ability to display information tied to DID|
| Common Fund Pool Creation Function   |Ability to create a multisig contract, a common pool of funds |
| common fund pooling remittance function| Ability to transfer money from a multisig contract to a target address |
| common fund pooling remittance function   | Ability to approve for common fund pool remittance|
| deposit          | Ability to deposit native tokens in multisig contracts using IDQ tokens|

## Distributed infrastructure and APIs

| No. | Name   | used API    |
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

| No. | Contract Name  | Explorer URL                                                                                                                    |
| --- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | MyToken         | [0x93fdd51462FB20fB631F8CA38c3DeB87583311Ea](https://testnet.snowtrace.io/address/0x93fdd51462FB20fB631F8CA38c3DeB87583311Ea#code) |
| 2   | WalletFactoryV4 | [0xD731c110bc106Aa60f768a1fd2707684A650Cc02](https://testnet.snowtrace.io/address/0xD731c110bc106Aa60f768a1fd2707684A650Cc02#code) |

## application code and other file

### IDQ Soul Wallet's System Architecher

<img src="./assets/img/IDQ-システム構成図.drawio.png">

### IDQ Soul Wallet's flow

[![](https://mermaid.ink/img/pako:eNp9VMFu2zAM_RXCpxbpDs3RhwIDsgE5dNiwAbvkokh0IsSWPImKZxT991GS7cVx0pws8fGJ5HvhWyGtwqIsPP4JaCRutDg40ewM8I801QjbzQ_Avy1KQgVVbTt4qJxt4Bt2EDw6cHjQnpwgbQ2QBYWt9ZriJx0RmlCT9voAnahrpMfMLQJZE5o9uuEsybrEd3m2nUH3nG9a4UhL3QpD4J9BePjqrCE06kZ8HeOfv2-BCc8j5yWiSgTplR4k8zhJS1QXUa9jA79TA0sURdQve0KTmcRIlcuHTy8vUJVxLrXtFxG6G-GcRpwWE8y4KkG68jo6lQDSYdIk45NUMYVnV4Jh8Wa6uWgAP3D7_L5flyCZNMk4Q_NkB-R6QrJ9XN9SAmMjdA1CKYfez5DckzyiPIGuEvIo_BHOog4I2oOouWbVD4-hQzVLTj2UrKlRYA2SbpCF8L6zTi26jBUxxR1gNdXtkIIzUIna43Wpm-1mGiNow_0H-X-kkwQJghGdA90YaNFV1jWcqkmLejbE2VtsAu19yP82ilaaz5e7Udq3teivZfMsv78lsZCSh7-wRysOCHP8Kie0wUmWA295YRUrGdywD_2V_qtYf4o12tDDI8yDiX0Yc7ZSLBpsNacaHhpEzi6J8HGfeBIUfEyLtxdDmvf98fq5b_B9LO_a2NxXul9K0g0-NCzEeSqneCoadOx-xUv1LSbsCiZvcFeU_KmwElzPrtiZd4bGJfizN7Io2Vj4VIRWsY-GHVyUyZLj7ReleVdNl5iOr3l7pyX-_g_79OUO?type=png)](https://mermaid.live/edit#pako:eNp9VMFu2zAM_RXCpxbpDs3RhwIDsgE5dNiwAbvkokh0IsSWPImKZxT991GS7cVx0pws8fGJ5HvhWyGtwqIsPP4JaCRutDg40ewM8I801QjbzQ_Avy1KQgVVbTt4qJxt4Bt2EDw6cHjQnpwgbQ2QBYWt9ZriJx0RmlCT9voAnahrpMfMLQJZE5o9uuEsybrEd3m2nUH3nG9a4UhL3QpD4J9BePjqrCE06kZ8HeOfv2-BCc8j5yWiSgTplR4k8zhJS1QXUa9jA79TA0sURdQve0KTmcRIlcuHTy8vUJVxLrXtFxG6G-GcRpwWE8y4KkG68jo6lQDSYdIk45NUMYVnV4Jh8Wa6uWgAP3D7_L5flyCZNMk4Q_NkB-R6QrJ9XN9SAmMjdA1CKYfez5DckzyiPIGuEvIo_BHOog4I2oOouWbVD4-hQzVLTj2UrKlRYA2SbpCF8L6zTi26jBUxxR1gNdXtkIIzUIna43Wpm-1mGiNow_0H-X-kkwQJghGdA90YaNFV1jWcqkmLejbE2VtsAu19yP82ilaaz5e7Udq3teivZfMsv78lsZCSh7-wRysOCHP8Kie0wUmWA295YRUrGdywD_2V_qtYf4o12tDDI8yDiX0Yc7ZSLBpsNacaHhpEzi6J8HGfeBIUfEyLtxdDmvf98fq5b_B9LO_a2NxXul9K0g0-NCzEeSqneCoadOx-xUv1LSbsCiZvcFeU_KmwElzPrtiZd4bGJfizN7Io2Vj4VIRWsY-GHVyUyZLj7ReleVdNl5iOr3l7pyX-_g_79OUO)

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
