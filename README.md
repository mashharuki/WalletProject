## プロダクト名

Wallet Project

## カテゴリ

## メンバー Discord ID

## デモ動画

[]()

## ピッチ資料

[ピッチ資料]()

## キャッチフレーズ

## 概要（500 文字）

## プロダクト URL

[]()

## Github repo(open) URL

[]()

## 開発した機能一覧表

| 機能名                   | 説明                                                                              |
| ------------------------ | --------------------------------------------------------------------------------- |
| Blocto ログイン 機能     | コントラクトウォレットを作成する機能                                              |
| トークン発行機能         | トークンを発行する機能                                                            |
| トークン送信機能         | トークンを送金する機能                                                            |
| トークン購入機能         | トークンを購入する機能                                                            |
| DID 登録機能             | 新規ログイン時に DID を発行し、スマコンに登録する機能                             |
| DID 関連データの登録機能 | DID と紐づく情報(VC)を IPFS に登録する機能                                        |
| DID 関連情報表示機能     | DID と紐づく情報を表示する機能                                                    |
| 共通資金プール作成機能   | 共通資金プールであるマルチシグコントラクトを作成する機能                          |
| 共通資金プール送金機能   | マルチシグコントラクトから目的のアドレスへ送金する機能                            |
| 共通資金プール送金機能   | 共通資金プール送金のために承認する機能                                            |
| deposit 機能             | IDQ トークンを使ってマルチシグコントラクトにネイティブトークンを deposit する機能 |
| 小口送金機能             | 他人に気軽に Token を送れる機能                                                   |

## 使用した分散型インフラと API

| No. | 名称   | 使用した API    |
| --- | ------ | --------------- |
| 1   | ION    | generateKeyPair |
| 2   | ION    | generateRequest |
| 3   | ION    | AnchorRequest   |
| 4   | Pinata | pinFileToIPFS   |
| 5   | Pinata | Gateway         |
| 6   | Pinata | pinList         |
| 7   |        |                 |

## 使用した tech stacks

| No. | 名称                  | 用途                                                                       |
| --- | --------------------- | -------------------------------------------------------------------------- |
| 1   | truffle               | スマートコントラクトの開発のため                                           |
| 2   | React.js              | フロントエンドの開発のため                                                 |
| 3   | express               | API サーバー開発のため                                                     |
| 4   | superAgent            | フロントエンドから API を呼び出すため                                      |
| 5   | MutliSig              | 承認制送金システム実装のため                                               |
| 6   | SmartContract         | 分散型アプリケーション開発のため                                           |
| 7   | ION(DID)              | DID の生成及び DID ドキュメントの生成のため                                |
| 8   | ethers.js             | API サーバー側でスマートコントラクトのメソッドを操作する処理を実装するため |
| 9   | Web3.js               | React.js とスマートコントラクトを接続するため                              |
| 10  | Blocto SDK            | ログイン機能の実装するため                                                 |
| 11  | RESTful API           | API 開発・設計・公開のため                                                 |
| 12  | Figma                 | 画面デザイン考案のため                                                     |
| 13  | ERC20 Token           | IDQ Token 開発のため                                                       |
| 14  | Verifiable Credential | DID と紐づくデータを検証可能な状態で公開するため                           |
| 15  | Pinata API            | IPFS へのファイルアップロードのため                                        |
| 16  | Ipfs                  | Verifiable Credentials と DID ドキュメントの登録・保管・参照のため         |
| 17  | Stripe API            | トークン購入機能実装のため                                                 |
| 18  | MUI Component         | フロントエンドの開発を効率化させるため                                     |
| 19  | Protocol              | Avalanche Fuji Chain(Testnet)                                              |
| 20  | AWS KMS               | 署名に必要な秘密鍵を管理するため(秘密鍵本体の流出リスクを抑える)           |

## これから使用する予定の tech stacks

| No. | 名称                 |
| --- | -------------------- |
| 1   | AWS S3               |
| 2   | AWS Lambda           |
| 3   | AWS Route53          |
| 4   | AWS API GateWay      |
| 5   | AWS Cloud Watch      |
| 6   | AWS Elastic IP       |
| 7   | AWS NAT ゲートウェイ |

## 使用した Blockchain

Avalanche Fuji Chain(Testnet)

## deploy した Contract の情報

| No. | コントラクト名  | Explorer の URL                                                                                                                    |
| --- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | MyToken         | [0x45f73bdac06c8ba7c41e47ed7eefe85ef74bae07](https://testnet.snowtrace.io/address/0x45f73bdac06c8ba7c41e47ed7eefe85ef74bae07#code) |
| 2   | WalletFactoryV4 | [0xf9d1A62058c6eE047a5f0FfC1797A19FEffe44b9](https://testnet.snowtrace.io/address/0xf9d1A62058c6eE047a5f0FfC1797A19FEffe44b9#code) |

## AWS KMS 上の鍵で生成したウォレットアドレス

| アドレス                                   | エクスプローラー URL                                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0xeDf54d22e96B3053722308951799162508973486 | [https://testnet.snowtrace.io/address/0xeDf54d22e96B3053722308951799162508973486](https://testnet.snowtrace.io/address/0xeDf54d22e96B3053722308951799162508973486) |

## application code やその他の file

### システム構成イメージ図

### 想定フロー

[![]()

### リポジトリのフォルダ構造

```bash
.
├── README.md     本ドキュメント
├── api           APIサーバー用ディレクトリ
├── assets        画像などの資材用ディレクトリ
├── backend       スマートコントラクト用ディレクトリ
├── book          honkit用のディレクトリ
├── docs          ビルドした成果物用ディレクトリ
├── frontend      フロントエンド用ディレクトリ
├── script        Ipfsへファイルをアップロードするためのスクリプトを格納したディレクトリ
└── intro-app     QRコード表示簡易アプリ用ディレクトリ
```

## テスト手順

[テスト手順書](https://github.com/mashharuki//blob/main/assets/spec/README2.md)

## 審査やテストのためにプロジェクトにアクセスする方法など

[プロジェクト起動手順書(ローカル環境)](https://github.com/mashharuki//blob/main/assets/spec/README3.md)

## その他ドキュメント

- [概要設計書](https://github.com/mashharuki//blob/main/assets/spec/design.md)
- [機能設計書](https://github.com/mashharuki//blob/main/assets/spec/functions.md)

#### その他本プロダクトを開発するにあたり参考にした文献

1. [Developer Portal](https://developers.flow.com/)
2. [Blocto Wallet ｜ウォレットの使い方と Flow のステーキング方法](https://dappsmarket.net/guide/blocto-howtouse/)
3. [Blocto Wallet](https://portto.com/)
4. [testnet faucet](https://testnet-faucet-v2.onflow.org/)
5. [Blocto Wallet 開発者向けドキュメント](https://docs.blocto.app/)
6. [敷居を下げる、充実したエコシステム：クロスブロックチェーンのスマートコントラクトウォレット「Blocto」を知る](https://coinpost.jp/?post_type=breaking&p=300918)
7. [Flow Playground](https://play.onflow.org/local-project)
8. [Emerald emerald academy logo Academy](https://academy.ecdao.org/)
9. [Testnet](https://testnet.flowscan.org/)
10. [Mainnet](https://flowscan.org/)
11. [EmeraldID](https://id.ecdao.org/me)
12. [beginner-cadence-course](https://github.com/mashharuki/beginner-cadence-course)
13. [beginner-dapp-course](https://github.com/emerald-dao/beginner-dapp-course)
14. [Install the Flow CLI](https://developers.flow.com/tools/flow-cli/install)
15. [DApps のユーザー認証に web3.eth.personal.sign を使おう！](https://tech.drecom.co.jp/dapps-use-web3-eth-personal-sign/)
16. [FCL Development Wallet](https://github.com/onflow/fcl-dev-wallet)
17. [Blocto Wallet zendesk](https://portto.zendesk.com/hc/en-us)
18. [How Blocto as a cross-chain smart contract wallet solve user & developer problems](https://portto.com/blocto-crypto-blog/ecosystem/cross-chain-smart-contract-wallet-solve-user-amp-developer-problems)
19. [Blocto Wallet Docs](https://docs.blocto.app/blocto-app/web3-provider/batch-transaction)
20. [Blocto for Developers](https://developers-testnet.blocto.app/)
21. [Blocto SDK JavaScript](https://docs.blocto.app/blocto-sdk/javascript-sdk/evm-sdk)
22. [Crypto Candy](https://github.com/amitkothari/crypto-candy)
23. [Blocto SDK in Flow dApps](https://docs.blocto.app/blocto-sdk/javascript-sdk/flow)
24. [Mermaid js Docs](https://mermaid-js.github.io/mermaid/#/)
25. [想定フロー (新規登録〜送金まで)](https://mermaid.live/edit#pako:eNqdVVtPGkEU_iubfdJoH_RxH0ya0CY-NGnTJn3hZYWlJcJilyXEGBN3RgUV4yVWo8UqVqnWFmuplyKVH3PcBf5Fz8zAdldQm_JAdma-853v3GYm5FAirMmKnNTepTQ9pAWi6htDjQd1CX9m1Ixp0nDghUPLdmkL6Hug34BWpR5n_XujuFTfvGrmfoC1AGTOnjl18nOv1VhMM-2Zg2ZmBaxrsD6DVXLOLCC5XsGppsyEnoqPaEZrHTIThgS0iLxAzvHfu59I65oxIHbGVMOMhqJjqm5KyQFJTUptQWWgWSCH_GOuC3iQgR8_HwZyxrzQZdeLFxZhqKfc7ziQcouWHgE5wY9OfJrhvWF3QkwGeZUY1XTpLkYRofRoaEiKKBhRBugGC4rsd5ybD5yjvZADpAjkCOhXoBQd3fzOO9llJ5ep71eEUYTj04pPfqdCYShMvBXi1lgCRfL2wc31dnO3ldekUJQcVCRxyLO_aq9UwSrbmQpYmy3goAsEWuDVOQayh3Vk8skvNHK2NuylCzu37rPgyVpiAZILoAf21D5YOeHLucyCVeO9R4AsYH_W9yqNL4voFJc-Fl9UjPGEpYDUML1Ad4GuMAlss8oUkdXmlHVTK9yZkX9gwNmw5z94pUTcDETUWFJDTKO2djtBGG5gOHBPJd1TsZ92K5zddvI7rUlF6kIOrFkfNbYVjjive5XXvVzfrCDOX6CBdiXrZ8vOx3yjcOhq6N4aXVsRbwOgWxx9CRavNHokV5gkqTtZn2BrlKuYuUbRck6Jt8X6mEBFGkmNsw6zSp4O2_AG0MfCjEd1s6fXLu1gdJL_lDtxWVox1tbsxZ9-bx0N8zdrzDu_-Orz504Zr7xV0Xb_kaRjQdTDx32b5Yof9HYMlz29gxIfGC7zlk4UNl1Fsy7zkGbQRd67s0A-AV2_ZYkDwK92YSn3y3HNiKvRMD4hE4wpKJtvtbgWlBX8DKvGaFAO6pOIY_f-y3E9JCumkdL65dRYWDXbz42s8NZv7z4JR_ESdjc1vnwmHir-Xk3-AYKqR-E)
26. [Mermaid js Tutorial](https://mermaid-js.github.io/mermaid/#/Tutorials)
27. [dapper-contracts](https://github.com/dapperlabs/dapper-contracts)
28. [FanTop のフロントエンド開発 − Web3 におけるユーザ認証](https://techdo.mediado.jp/entry/2022/09/21/090000)
29. [Web3-React](https://github.com/Uniswap/web3-react#readme)
30. [MetaMask Docs](https://docs.metamask.io/guide/ethereum-provider.html#methods)
31. [JPYCv2 のメタトランザクション機能の紹介](https://zenn.dev/jpyc/articles/ff5922abf2046c)
32. [「Dapper」はガス代がかからない仮想通貨ウォレット！インストール方法と特徴を解説（追記あり）](https://news.blockchaingame.jp/494#:~:text=%E6%96%B9%E3%81%AB%E3%82%AA%E3%82%B9%E3%82%B9%E3%83%A1-,1.Dapper%E3%81%A8%E3%81%AF%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3%E3%82%B2%E3%83%BC%E3%83%A0%E3%81%AE%E8%AA%B2%E9%A1%8C%E7%82%B9,%E9%80%9A%E8%B2%A8%E3%82%A6%E3%82%A9%E3%83%AC%E3%83%83%E3%83%88%E3%81%AE%E3%81%93%E3%81%A8%E3%81%A7%E3%81%99%E3%80%82)
33. [Dapper コントラクトのコードを理解する](https://qiita.com/avcdsld/items/2e97a553159e6d278b43)
34. [【Azure】クイック スタート:SMS メッセージを送信する](https://learn.microsoft.com/ja-jp/azure/communication-services/quickstarts/sms/send?tabs=windows&pivots=programming-language-javascript)
35. [Dapper Contract 解説/Dapper Contract](https://speakerdeck.com/avcdsld/dapper-contract?slide=35)
36. [IAP とは？VPN と比較しつつ、メリットを解説](https://solution.kamome-e.com/blog-security-20220706/)
37. [Cloud Run で Identity-Aware Proxy (IAP) を使う](https://zenn.dev/ww24/articles/19099c85febe0d)
38. [電話番号で本人確認を行う「SMS 認証」とは？仕組みを解説](https://ekyc.nexway.co.jp/blog/26)
39. [Node.js を使用したユーザーの認証](https://cloud.google.com/nodejs/getting-started/authenticate-users?hl=ja)
40. [GCP + Node.js を使用したユーザーの認証のサンプルコード](https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/HEAD/authenticating-users/app.js)
41. [Solidity by Example](https://solidity-by-example.org/)
42. [Twilio(トゥイリオ) の Quick Start (SMS)](https://www.twilio.com/ja/docs/verify/quickstarts/node-express#)
43. [Iroha React App](https://github.com/mashharuki/iroha)
44. [Ethers Docs](https://docs.ethers.io/v5/api/)
45. [ethers.js とは(ethers.js の基本概念や特徴の解説)](https://zenn.dev/nft/books/410be300912936/viewer/00c605)
46. [JavaScript の Import Assertions について](https://sosukesuzuki.dev/posts/import-assertions/)
47. [tutorials(send-token-etherjs)](https://ethereum.org/en/developers/tutorials/send-token-etherjs/)
48. [Simple Code(send Tx)](https://ethereum.stackexchange.com/questions/80867/sample-code-in-ethers-js-to-send-raw-transaction-and-to-sign-transaction)
49. [How to Mint an NFT from Code](https://docs.alchemy.com/docs/how-to-mint-an-nft-from-code)
50. [0x2CcfA2AcF6FF744575cCf306B44A59B11C32e44B のコントラクト](https://etherscan.io/bytecode-decompiler?a=0x2ccfa2acf6ff744575ccf306b44a59b11c32e44b)
51. [Avalanche Docs](https://docs.avax.network/)
52. [hardhat Docs](https://hardhat.org/hardhat-runner/docs/guides/project-setup)
53. [Web3js 公式サイト](https://web3js.org/)
54. [Signing Raw Transactions](https://docs.etherscan.io/tutorials/signing-raw-transactions)
55. [ethers.js を使って MetaMask で署名して Node.js で検証する方法](https://zenn.dev/tatsuyasusukida/articles/how-to-sign-and-verify-ethersjs)
56. [Twilio(トゥイリオ) Verify API](https://www.twilio.com/docs/verify/api)
57. [Web3.0 と DID とは](https://lastrust.io/2020/06/05/whatis-did-web3/)
58. [uPort: DID(Decentralized Identity)におけるユーザ認証について](https://qiita.com/tomohata/items/e720ec4408d1db24cee2)
59. [ceramic.network](https://ceramic.network/)
60. [Ceramic Network とは？](https://mirror.xyz/kantaro.eth/v3z1YU1eNSCxwNfsynxRF_ef1RTBvQWFc9KCZaiWCsk)
61. [「ION」Microsoft が主導する分散型デジタル ID システム](https://gaiax-blockchain.com/microsoft-ion)
62. [ION tools](https://github.com/decentralized-identity/ion-tools)
63. [Tutorial: How to create a DID on the ION network](https://medium.com/@a.a.lechner/tutorial-how-to-create-a-did-on-the-ion-network-d4b8ebca280a)
64. [DIF Universal Resolver](https://dev.uniresolver.io/)
65. [ION Explorer](https://identity.foundation/ion/explorer/)
66. [React で QR コード表示機能を実装](https://qiita.com/hujuu/items/b12ff32f189f5ab620ca)
67. [IDQ Sample UI/UX](https://www.figma.com/file/DRxycjw75Ei4jK7TYYQUXk/IDQ-Sample-UI%2FUX?node-id=0%3A1)
68. [IDQ UI | Sample](https://docs.google.com/presentation/d/12-VecOnDpVtiWjOL90aRxCguQ6vk2uhpWSa7zYZMO-c/edit#slide=id.p)
69. [entra-verifier](https://github.com/did-developer-community/entra-verifier)
70. [Verify your DID Developer Community Credential](https://diddc-verify.azurewebsites.net/verifier)
71. [Microsoft Entra Verified ID documentation](https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/)
72. [Microsoft Entra Verified ID の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/verifiable-credentials/decentralized-identifier-overview)
73. [Verifiable Credentials Code Samples](https://github.com/Azure-Samples/active-directory-verifiable-credentials)
74. [【W3C】DID Specification Registries](https://w3c.github.io/did-spec-registries/#did-methods)
75. [Verifiable Credentials × ゼロ知識証明](https://zenn.dev/kyosuke/articles/a8a92e399e83f490e207)
76. [BBS 署名 + Signature Scheme](https://qiita.com/kazuhideYS/items/1bac1c277e5e45385f08)
77. [DID Specifications 読み進めガイド](https://qiita.com/kazuhideYS/items/2f533bf14e8587c7c131)
78. [【動画で学ぶブロックチェーン】BLS 署名 - 安土 茂亨氏](https://goblockchain.network/2022/09/bls/)
79. [Blockcerts について調べる](https://zenn.dev/tatsuyasusukida/scraps/67bc1139e5410e#comment-6616e80c13f0b4)
80. [Node.js でも綺麗なコードで WebAPI を作る（routing-controllers）](https://qiita.com/tonio0720/items/4694d33b20d05c25c2bf)
81. [express 実践入門](https://gist.github.com/mitsuruog/fc48397a8e80f051a145)
82. [async/await で処理を順番通りに出したい時の書き方](https://zenn.dev/minami_hiroto/articles/532d4a393feecb)
83. [初めての npm パッケージ公開](https://qiita.com/TsutomuNakamura/items/f943e0490d509f128ae2)
84. [初めて npm パッケージを一般公開する時の手順](https://nodachisoft.com/common/jp/article/jp000110/)
85. [terraform](https://www.terraform.io/)
86. [Blockcerts を使って Ethereum ブロックチェーン証明書を発行する方法](https://zenn.dev/tatsuyasusukida/articles/issuing-ethereum-certificates-using-blockcerts#comment-766d57f9c479f4)
87. [Context でデータ管理(createContext, useContext)](https://www.wakuwakubank.com/posts/758-react-context/)
88. [React Context](https://ja.reactjs.org/docs/context.html)
89. [【Qita】Stripe と React で、銀行振込やコンビニ決済などの複数の決済手段を表示する方法と見た目のカスタマイズ方法](https://qiita.com/hideokamoto/items/e487b5dc48355a7976bf)
90. [【Stripe Docs】Elements Appearance API](https://stripe.com/docs/elements/appearance-api?platform=web#variables)
91. [GitHub の新機能「GitHub Actions」で試す CI/CD](https://knowledge.sakura.ad.jp/23478/)
92. [リポジトリへのライセンスの追加](https://docs.github.com/ja/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)
93. [想定フロー (メンバーシップとしての VC を発行・連携・検証するまで)](https://mermaid.live/edit#pako:eNqNVctO21AQ_RXLK1BhAd1lgVRBkZBaiZaWbrJxEqe1yKu2IxUhpPia8CighJSCQml5CAKEkvJoKkp5fMxgO1n1Fzp3nIS8Sssi2PeemTlz5lzfCdEfDciiR9Tkt3E54pcHFOm1KoW9EQH_dEUPycLQwDPbPLMKa2B-BPMIzEuhw145LuVSTvZXeeEUjHlgc1byxF6feyWFQrJuJXfLM0tgXIOxB0bBLhrAFjoFMLK0cIgZ8cGNts9nwbihdQZsHowPYOwDy7glXR5SXI9G4mGfrFbe_XpUFaQeQdIEMHPICNiP7oa9Xr5n76yX9i9LiaS7FZNUXfErMSmiCxoFE5FCta8zMGeB7dPDXJsQymkd5ZybDLAzgk3T75SdSt9efwJWBLaDSVpjfTzUF4r6x_yyqmtcFOJ2T4gUU-4oPhoe4lBs1Ezjbys6yLGD1Px4ldwsmAfAvrUnxLm4-q1Q8yYhcVB7VOWsNUSJBTViNDw40kYdvjXyEIw8GAdcVPaTGHyl6ZxXhtMjdPf1PcD_nvZCojms1Aqw905xCliiMUrrxai7XTTKJpcQ7WKsgpEb7ceyTvaitLWA_inlDPuEccuhqRLMzYQjdOvHFI8w2u-CrZmck5528ZWCKH09jjziMlzlHbHM7dW6PZtuQpOmzXldjCt3PQrYNk_IDsHM08NxC5Kqt-KcIru9mC4n1pyN3SYGfEQeGhAKSbxtM2ltniBjymNSA0c04bmm2KDLnJ_JVkWCf8FYhQ3stAFT0_YOdQ9jreffYK3ONdgUyzjbF6X8YgeYM-gsYDdgHtK5MPkrtwP6aNq62v59udHZZDy0UCl_WiaLkOPzXBjun43ap-f28jMY-CWYr8T2NpVvsEpdYvdIO8tIoPDy-RNElhNGSxpfFVifxte0V68r7TWby86itwsv3vE2KqeWTjD5vdVzNXLFtP1lnfdws2wtfq8vgMYZVqNBJSSjN4ChSXbB3Kp-FacGhgbarWesFHOSe5VB_Xe1BsHaoepFt1I4niW8VPAWwe4Eb8QbEbvEsKyGJSWAl9cEj_GK-hs5LHtFDz4GJHXMK3ojk4jjt8fIeMQvenQ1LneJ8VhA0qsXnegJSiGttvo4oOAXtLYo0-tT94qkm3LyD3fzeFI)
94. [初心者が５分で出来る簡単サーバレス API を構築してみる【Lambda】](https://recipe.kc-cloud.jp/archives/16877/)
95. [パブリック API の構築](https://aws.amazon.com/jp/startups/start-building/how-to-build-a-public-facing-API/)
96. [【MUI】Low-code admin builder](https://mui.com/toolpad/)
97. [Zxing でバーコードリーダーを作ってみた](https://stak.tech/news/14668)
98. [【UNCHAIN】進捗 to earn 資料](https://unchain-shiftbase.notion.site/IDQ-Soul-Wallet-65ff1af4271d43468d78e40190c0d710)
99. [【GitHub】cert-verifier-js](https://github.com/blockchain-certificates/cert-verifier-js)
100. [【GitHub】blockcerts-verifier](https://github.com/blockchain-certificates/blockcerts-verifier)
101. [MUI file input](https://viclafouch.github.io/mui-file-input/docs/getting-started/)
102. [【GitHub】react-blockcerts](https://github.com/mashharuki/react-blockcerts)
103. [React-blockcerts example](https://guix77.github.io/react-blockcerts/)
104. [React でファイルをダウンロードする](https://www.delftstack.com/ja/howto/react/react-download-file/)
105. [GitHub API](https://docs.github.com/ja/rest/commits/commits?apiVersion=2022-11-28)
106. [過去のデモ動画](https://www.youtube.com/watch?v=yyLkcT2IkuA&t=4s)
107. [Neumorphism UI](https://demo.themesberg.com/neumorphism-ui/html/components/toasts.html)
108. [ui-neumorphism](https://akaspanion.github.io/ui-neumorphism/)
109. [React.js UI コンポーネント「ui-neumorphism」を使用する](https://mebee.info/2021/07/06/post-35062/)
110. [React でウィンドウサイズが小さいときだけスライドショー表示をする方法](https://gotohayato.com/content/529/)
111. [【Qita】react-qr-reader を利用した QR コードリーダーの作成](https://qiita.com/KenNagami/items/1493b498ff197f8f7689)
112. [バーコードリーダーをブラウザから使えるようにしたい！JS のバーコードリーダーライブラリを調査しました](https://blog.ecbeing.tech/entry/2020/06/30/114023)
