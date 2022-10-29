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
      ✓ check num of wallet
      ✓ gets the myToken name
      ✓ gets the myToken symbol
      ✓ gets the myToken decimals
      ✓ gets the myToken totalSupply
    Factory test
      ✓ create wallet (120ms)
    varying limits && offset
      ✓ returns 10 results when limit requested is 10
      ✓ returns 20 results when limit requested is 20
      ✓ returns 30 results when limit requested is 30
      ✓ returns 30 results when limit requested is 30
      ✓ returns 30 results when limit requested is 30

  Contract: MultiSigWallet Contract tests!!
    initialization
      ✓ confirm owner address (60ms)
      ✓ confirm number of required
      ✓ confirm name of wallet
    receive test
Tx Hash: 0x9fb94c42a9686cf6bcbee90232f01bc01872c6514373422c2935bb200cfa2fec
txData: {
  hash: '0x9fb94c42a9686cf6bcbee90232f01bc01872c6514373422c2935bb200cfa2fec',
  nonce: 0,
  blockHash: '0x2d86389eded794a1553cbadef2335cf3ff44fc470d450c28722da85ee0f34d75',
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
      ✓ deposit (39ms)
    submit test
      ✓ submit transaction (89ms)
      ✓ should be revert from invalid address (209ms)
    approve test
      ✓ approve transaction (236ms)
      ✓ should be revert from invalid address (128ms)
      ✓ should be revert invalid txId (76ms)
    execute test
      ✓ execute (325ms)
      ✓ should be revert invalid txId (257ms)
      ✓ should be revert with insufficient approvement  (150ms)
      ✓ this tx is aleady executed (165ms)
    revoke test
      ✓ revoke (411ms)
      ✓ should be revert invalid txId (172ms)
      ✓ should be revert from invalid address (482ms)
      ✓ should be revert from invalid address (184ms)

  Contract: MyToken Contract test
    initialization
      ✓ gets the myToken name (91ms)
      ✓ gets the myToken symbol
      ✓ gets the myToken decimals
      ✓ gets the myToken totalSupply
    operate tokens!!
      ✓ mint (366ms)
      ✓ transfer (893ms)
      ✓ transfer2 (671ms)
      ✓ approve (48ms)
      ✓ burn (822ms)
      ✓ burn 2  (602ms)
      ✓ transferFrom (512ms)


  40 passing (27s)
```
