# テスト手順書

IDQ のアプリを動かすためにスマートコントラクトのテストを行う手順になります。

1. モジュールのインストール

```zsh
 cd backend && npm i
```

2. 次のテストコマンドを実行

```zsh
npm run test
```

3. 下記のように表示されればスマートコントラクトのテストが正常に完了したことになります。

```zsh

   Contract: MultiSigWallet & MyToken Contract tests!!
    init test
      ✓ check myToken Owner
      ✓ check Factory Owner
      ✓ check num of wallet
      ✓ gets the myToken name
      ✓ gets the myToken symbol
      ✓ gets the myToken decimals
      ✓ gets the myToken totalSupply
    Factory test
      ✓ create wallet (126ms)
    varying limits && offset
      ✓ returns 10 results when limit requested is 10
      ✓ returns 20 results when limit requested is 20
      ✓ returns 30 results when limit requested is 30
      ✓ returns 30 results when limit requested is 30
      ✓ returns 30 results when limit requested is 30
    register test
      ✓ register (76ms)
      ✓ register 2 (221ms)
      ✓ register 3 (122ms)

  Contract: MultiSigWallet Contract tests!!
    initialization
      ✓ confirm owner address (63ms)
      ✓ confirm number of required
      ✓ confirm name of wallet
    receive test
Tx Hash: 0x9fb94c42a9686cf6bcbee90232f01bc01872c6514373422c2935bb200cfa2fec
txData: {
  hash: '0x9fb94c42a9686cf6bcbee90232f01bc01872c6514373422c2935bb200cfa2fec',
  nonce: 0,
  blockHash: '0x557f3290d56d22360986e32b52516a9d5a5e3047a48da9215baa3ba6a53a7103',
  blockNumber: 7,
  transactionIndex: 0,
  from: '0x821aEa9a577a9b44299B9c15c88cf3087F3b5544',
  to: '0x9FBDa871d559710256a2502A2517b794B482Db40',
  value: '50000000000000000',
  gas: 90000,
  gasPrice: '2000000000',
  input: '0x',
  v: '0xa96',
  r: '0x26998c8a9776fa15a2df52ec555032233bb5d0df5ff0424a1ed3e529a578a76e',
  s: '0x3f0f284cd93dec2101d9c86c201c888b0200a55da0873e08c47db54564753412'
}
      ✓ deposit (48ms)
    submit test
      ✓ submit transaction (117ms)
      ✓ should be revert from invalid address (57ms)
    approve test
      ✓ approve transaction (346ms)
      ✓ should be revert from invalid address (156ms)
      ✓ should be revert invalid txId (156ms)
    execute test
      ✓ execute (193ms)
      ✓ should be revert invalid txId (353ms)
      ✓ should be revert with insufficient approvement  (241ms)
      ✓ this tx is aleady executed (203ms)
    revoke test
      ✓ revoke (421ms)
      ✓ should be revert invalid txId (230ms)
      ✓ should be revert from invalid address (416ms)
      ✓ should be revert from invalid address (182ms)

  Contract: MyToken Contract test
    initialization
      ✓ gets the myToken name (78ms)
      ✓ gets the myToken symbol
      ✓ gets the myToken decimals
      ✓ gets the myToken totalSupply (112ms)
    operate tokens!!
      ✓ mint (303ms)
      ✓ transfer (828ms)
      ✓ transfer2 (694ms)
      ✓ approve (73ms)
      ✓ burn (848ms)
      ✓ burn 2  (935ms)
      ✓ transferFrom (876ms)


  44 passing (30s)
```
