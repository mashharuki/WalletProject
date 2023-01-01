# IDQ Soul Wallet ローカル起動方法

ローカルで動かす手順は下記の通りです。

1. API サーバーの起動
2. intro-app の起動
3. IDQ Soul Wallet の起動

## API サーバーの起動

1. `api`ディレクトリに移動する。
2. モジュールのインストールのため下記コマンドを実行

```zsh
npm i
```

3. `.env`ファイルを作成し、MetaMask のニーモニックコードを貼り付ける。

```txt:
MNEMONIC=<YOUR_DATA>
```

4. 起動コマンドを入力する。

```zsh
npm run start
```

下記のように出力されれば、API サーバーの起動は完了

```zsh
> api server@0.1.0 start
> node server.js

起動しました https://192.168.0.3:3001
```

## intro-app の起動

1. `intro-app`ディレクトリに移動する。
2. モジュールのインストールのため下記コマンドを実行

```zsh
npm i
```

3. `App.js`6 行目の変数`URL`に API サーバー起動時に出力されたエンドポイントの情報を入力する。

```diff
      import QRCode from "qrcode.react";
      import './App.css';

      function App() {
      // URL
+      const URL = 'http://192.168.0.14:3000' // please change

      return (
      <div className="App">
            <header className="App-header">
            <p>
            <strong>Welcome to IDQ Soul Wallet!!</strong>
            </p>
            <QRCode value={URL} />
            <a href={URL}>{URL}</a>
            </header>
      </div>
      );
      }
```

4. 起動コマンドを実行する。

```zsh
npm run start
```

[http://localhost:3002/](http://localhost:3002/)にアクセスして QR コードが表示されていることを確認する。

<img src="./assets/img/qrcode_local.png">

## IDQ Soul Wallet の起動

1. `fronted`ディレクトリに移動する。
2. モジュールのインストールのため下記コマンドを実行

```zsh
npm i
```

3. `App.js`の 29 行目のの変数`baseURL`に API サーバー起動時に出力されたエンドポイントの情報を入力する。

```diff
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from 'web3';
import './../assets/css/App.css';
import NoPage from './common/NoPage';
import Web3Menu from "./common/Web3Menu";
import Create from './pages/Create';
import Home from './pages/Home';
import Txs from './pages/Txs';
import Wallets from './pages/Wallets';

// contract Address (WalletFactory)
const CONTRACT_ADDRESS = "0x177acf501eF7d2b090d94fd3bd2BE773736598E1";
// contract Address (MyToken)
const MYTOKEN_ADDRESS = "0x505869E3B5Ef52a5Db123387fe2d188c44b27b25";
// chain ID
const chainId = '43113';
// rpc URL
const RPC_URL = `https://api.avax-test.network/ext/bc/C/rpc`;
// API Base URL
+ const baseURL = 'http://192.168.0.3:3001' // please change
```

4. 起動コマンドを実行する。

```zsh
npm run start
```
